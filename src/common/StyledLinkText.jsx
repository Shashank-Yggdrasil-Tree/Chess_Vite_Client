import React from 'react';

const StyledLinkText = ({ children, onClick }) => {
  return (
    <a
      onClick={onClick}
      className="text-lg p-1 cursor-pointer font-semibold bg-violet-500 inline-block text-transparent bg-clip-text hover:text-white transition ease-in-out hover:scale-110 duration-150"
    >
      {children}
    </a>
  );
};

export default StyledLinkText;
