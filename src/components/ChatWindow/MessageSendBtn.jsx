import { Button } from '@mui/material';
import React from 'react';

const MessageSendBtn = ({ isDirty, isValid }) => {
  return (
    <Button
      type="submit"
      sx={{
        position: 'absolute',
        top: '50%',
        right: 0,
        transform: 'translate(-50%, -50%)',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'translate(-50%, -50%) scale(1.25)',
          backgroundColor: 'transparent',
        },
      }}
      disabled={!isDirty || !isValid}
      className={!isDirty || !isValid ? 'hidden' : ''}
    >
      <img src="/svg_icons/paper_plane1.svg" className="w-12" />
    </Button>
  );
};

export default MessageSendBtn;
