import React, { memo } from "react";

export interface CategoryProps {
  id: string;
  name: string;
  icon: string | React.ReactElement;
  className?: string;
}

const Category: React.FC<CategoryProps> = (props) => {
  return (
    <div
      className={`flex flex-col justify-center items-center w-24 h-24 bg-blue-100 rounded-lg ${props.className}`}
    >
      <span className="text-3xl">{props.icon}</span>
      <h1 className="w-full truncate px-1 text-center">{props.name}</h1>
    </div>
  );
};

export default memo(Category);
