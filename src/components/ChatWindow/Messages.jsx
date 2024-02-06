import React from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';

const Messages = () => {
  const message = useSelector((state) => state.chat.message);
  const { username: senderUsername } = useSelector((state) => state.game);

  return (
    <>
      <Box>
        {message &&
          message.map(({ id, text, username }) => (
            <div
              key={id}
              className={classNames({
                'text-white': username === senderUsername,
                'text-black': username !== senderUsername,
              })}
            >
              <h1>{username}</h1>
              <hr />
              <p>{text}</p>
            </div>
          ))}
      </Box>
    </>
  );
};

export default Messages;
