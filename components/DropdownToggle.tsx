import React from "react";

// eslint-disable-next-line react/display-name
const DropdownToggle = React.forwardRef(
  ({ children, onClick, className }: any, ref: any) => (
    <a
      className={
        className
          ? `${className.split("dropdown-toggle")[0]}`
          : "dropdown-toggle"
      }
      href="#"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </a>
  )
);

export default DropdownToggle;
