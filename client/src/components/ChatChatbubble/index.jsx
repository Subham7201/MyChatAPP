import React from "react";
import { Img } from "../Img"
import { Text } from "../Text"

const ChatChatbubble = (props) => {
  return (
    <>
      <div className={props.className}>
        <div className="flex flex-col items-start justify-start sm:pl-5 pl-[24.47px] w-auto">
          <Text
            className="text-[16.31px] text-gray-900 tracking-[0.82px] w-auto"
            size="txtMontserratRegular1631Gray900"
          >
            {props?.yournameOne}
          </Text>
        </div>
        <div className="flex sm:flex-col flex-row sm:gap-5 items-start justify-start w-full">
          <Img
            className="h-full max-h-[72px] sm:w-[]"
            src="images/img_contrast.svg"
            alt="contrast"
          />
          <div className="bg-gray-200_01 flex flex-1 flex-col items-start justify-start outline outline-[0.5px] outline-gray-200_01 py-[18.35px] w-full">
            <Text
              className="leading-[110.66%] max-w-[545px] md:max-w-full text-[16.31px] text-black-900"
              size="txtMontserratRegular1631Black900"
            >
              {props?.textmessage}
            </Text>
          </div>
          <Img
            className="h-full max-h-[72px] sm:w-[]"
            src="images/img_user.svg"
            alt="user_One"
          />
        </div>
      </div>
    </>
  );
};

ChatChatbubble.defaultProps = {
  yournameOne: "Kimaya",
  textmessage: (
    <>
      Naaaa bro
      <br />
      Hin still dey house jare , I no sure say i wan sell am tho
    </>
  ),
};

export default ChatChatbubble;
