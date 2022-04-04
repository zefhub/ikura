import React, { MouseEventHandler } from "react";

export interface ButtonProps {
  type: "button" | "submit" | "reset";
  onClick: MouseEventHandler<HTMLButtonElement>;
  className?: string;
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
    >
      {props.children}
    </button>
  );
};

export default Button;
