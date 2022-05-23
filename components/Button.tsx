import React, { MouseEventHandler } from "react";

export interface ButtonProps {
  type: "button" | "submit" | "reset";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  style?: any;
}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
      type={props.type}
      onClick={props.onClick}
      className={[
        "h-12 px-6 rounded-full drop-shadow-lg",
        props.className,
      ].join(" ")}
      style={props.style}
    >
      {props.children}
    </button>
  );
};

export default Button;
