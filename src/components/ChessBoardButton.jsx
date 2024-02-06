import React from "react";

const ChessBoardButton = ({ children, onClick = null, style = null }) => {
  const buttonStyle = {
    ...style,
    cursor: "pointer",
    padding: "10px 20px",
    margin: "10px 10px 0px 0px",
    borderRadius: "6px",
    backgroundColor: "rgb(240, 217, 181)",
    border: "none",
    boxShadow: "rgba(0, 0, 0, 0.5) 0px 2px 5px",
  };

  return (
    <button style={buttonStyle} onClick={onClick}>
      {children}
    </button>
  );
};

export default ChessBoardButton;
