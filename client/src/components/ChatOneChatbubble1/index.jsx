import React from "react";
import { Img } from "../Img"
import { Text } from "../Text"

const ChatOneChatbubble1 = (props) => {
  return (
    <>
      <div className={props.className}>
        <div className="flex sm:flex-col flex-row sm:gap-5 items-start justify-start w-full">
          <Img
            className="h-full max-h-[72px] sm:w-[]"
            src="images/img_settings_gray_200_01.svg"
            alt="settings_Two"
          />
          <div className="bg-gray-200_01 flex flex-1 flex-col items-start justify-start outline outline-[0.5px] outline-gray-200_01 py-[18.35px] w-full">
            <Text
              className="leading-[110.66%] max-w-[477px] md:max-w-full text-[16.31px] text-black-900"
              size="txtMontserratRegular1631Black900"
            >
              {props?.text}
            </Text>
          </div>
          <Img
            className="h-full max-h-[72px] sm:w-[]"
            src="images/img_user.svg"
            alt="user"
          />
        </div>
      </div>
    </>
  );
};

ChatOneChatbubble1.defaultProps = {
  text: "Baba sell that car wey you win from that our competition that year na, you suppose don buy maserrati by now na",
};

export default ChatOneChatbubble1;
