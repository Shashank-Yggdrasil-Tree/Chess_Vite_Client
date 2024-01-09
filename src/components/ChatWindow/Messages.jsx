import React from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";

const Messages = ({ senderUsername }) => {
  const message = useSelector((state) => state.chat.message);

  return (
    <>
      {message &&
        message.map(({ id, text, username }) => (
          <div
            key={id}
            className={classNames({
              "text-white": username === senderUsername,
              "text-black": username !== senderUsername,
            })}
          >
            <h1>{username}</h1>
            <hr />
            <p>{text}</p>
          </div>
        ))}
    </>
  );
};

export default Messages;
