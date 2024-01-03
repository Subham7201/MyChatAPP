import SimplePeer from 'simple-peer';
import global from 'global/window';
import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

// Make the global object available
if (typeof window !== 'undefined') {
    window.SimplePeer = SimplePeer;
}

const VideoCallComponent = () => {
    const videoRef = useRef();
    const remoteVideoRef = useRef();
    const socket = io('http://localhost:4040'); // Update with your server URL
    const [callStatus, setCallStatus] = useState('idle');

    let peer;

    useEffect(() => {
        // Set up WebRTC when component mounts
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((stream) => {
                videoRef.current.srcObject = stream;

                // Listen for incoming video call
                socket.on('incomingVideoCall', ({ sender, callRequestId }) => {
                    setCallStatus('incoming');

                    // Answer the call
                    peer = new global.SimplePeer({ initiator: false, stream });

                    // Handle WebRTC events
                    peer.on('signal', (data) => {
                        socket.emit('answerVideoCall', { recipient: sender, callRequestId, answer: data });
                    });

                    peer.on('stream', (remoteStream) => {
                        // Display the remote stream in your UI
                        remoteVideoRef.current.srcObject = remoteStream;
                    });

                    // Handle WebRTC data channel events if needed
                });
            })
            .catch((error) => {
                console.error('Error accessing media devices:', error);
            });

        // Clean up when the component unmounts
        return () => {
            if (peer) {
                peer.destroy();
            }
        };
    }, []);

    const handleStartCall = () => {
        // Emit socket event to initiate a video call
        const recipient = 'recipientUserId'; // Replace with the actual recipient's user ID
        socket.emit('initiateVideoCall', { recipient });
        setCallStatus('calling');
    };

    const handleEndCall = () => {
        // Clean up resources and end the call
        if (peer) {
            peer.destroy();
        }
        setCallStatus('idle');
    };

    return (
        <div>
            <div>
                <video ref={videoRef} autoPlay muted playsInline></video>
                {callStatus === 'calling' && (
                    <div>
                        Calling...
                        <button onClick={handleEndCall}>End Call</button>
                    </div>
                )}
                {callStatus === 'incoming' && (
                    <div>
                        Incoming Call
                        <button onClick={handleEndCall}>Reject</button>
                        <button onClick={handleStartCall}>Accept</button>
                    </div>
                )}
            </div>
            {callStatus === 'calling' || callStatus === 'connected' ? (
                <div>
                    <video ref={remoteVideoRef} autoPlay playsInline></video>
                    <button onClick={handleEndCall}>End Call</button>
                </div>
            ) : null}
        </div>
    );
};

export default VideoCallComponent;
