import React from "react";
import "./styles/ChatEngine.css";
import { ChatEngineWrapper, Socket, ChatFeed } from "react-chat-engine";

const ChatEngine = (props) => {
  return (
    <div
      className="transition-5"
      style={{
        height: props.visible ? "100%" : "0",
        zIndex: props.visible ? "100%" : "0",
        width: "100%",
        backgroundColor: "white",
      }}
    >
      {props.visible && (
        <ChatEngineWrapper>
          <Socket
            projectID={"5d0a1bb4-a1ad-44a7-ba87-42c439c93e9c"}
            userName={props.user.email}
            userSecret={props.user.email}
          />

          <ChatFeed activeChat={props.chat.id} />
        </ChatEngineWrapper>
      )}
    </div>
  );
};

export default ChatEngine;
