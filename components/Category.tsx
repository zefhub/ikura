import React, { memo } from "react";

export interface CategoryProps {
  id: string;
  name: string;
  icon: string | React.ReactElement;
}

const Category: React.FC<CategoryProps> = (props) => {
  return (
    <div className="flex flex-col justify-center items-center w-24 h-24 bg-blue-100 rounded-lg">
      <span className="text-3xl">{props.icon}</span>
      <h1>{props.name}</h1>
    </div>
  );
};

export default memo(Category);
