import React from "react";
import Friends from "../Components/Friends";
import Chatting from "../Components/Chatting";
import { Helmet } from "react-helmet-async";
const Messages = () => {
  return (
    <>
      <Helmet>
        <title>Message</title>
      </Helmet>
      <div className="grid grid-cols-[2fr,4fr]">
        <div className="w-full">
          <Friends />
        </div>
        <div className="mx-3">
          <Chatting />
        </div>
      </div>
    </>
  );
};

export default Messages;
