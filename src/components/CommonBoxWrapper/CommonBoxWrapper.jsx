import React from "react";

const CommonBoxWrapper = ({
  children,
  additional_class,
  border_color = null,
}) => {
  return (
    <div
      className={`text-white ${
        border_color
          ? border_color
          : "border-2 border-zinc-800 hover:border-red-400"
      } ${additional_class}`}
    >
      {children}
    </div>
  );
};

export default CommonBoxWrapper;
