import React from "react";
import { Img } from "../Img"
import { Text } from "../Text"

const ChatOneChatbubble = (props) => {
  return (
    <>
      <div className={props.className}>
        <div className="flex flex-col items-start justify-start sm:pl-5 pl-[24.47px] w-auto">
          {!!props?.yourname ? (
            <Text
              className="text-[18.35px] text-blue_gray-400 tracking-[0.92px] w-auto"
              size="txtMontserratRegular1835"
            >
              {props?.yourname}
            </Text>
          ) : null}
        </div>
        <div className="flex sm:flex-col flex-row sm:gap-5 items-center justify-center w-full">
          <Img
            className="h-full max-h-[76px] sm:w-[]"
            alt="settings_Three"
            src={props?.settingsthree}
          />
          <div className="bg-blue-500 flex flex-1 flex-col items-start justify-start outline outline-[0.5px] outline-blue-500 py-[18.35px] w-full">
            <Text
              className="leading-[110.66%] max-w-[418px] md:max-w-full text-[16.31px] text-white-A700"
              size="txtMontserratRomanMedium1631"
            >
              {props?.descriptionone}
            </Text>
          </div>
          <Img
            className="h-full max-h-[76px] sm:w-[]"
            alt="user_One"
            src={props?.userone}
          />
        </div>
      </div>
    </>
  );
};

ChatOneChatbubble.defaultProps = {
  settingsthree: "images/img_settings_blue_500_76x24.svg",
  descriptionone: (
    <>
      How far that motor wey you talk say you wan dash your babe that day, your
      don sell am abi hin still dey house ?<br />
      Be like say i don get buyer
    </>
  ),
  userone: "images/img_user_blue_500.svg",
};

export default ChatOneChatbubble;
