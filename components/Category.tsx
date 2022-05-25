/**
 * Copyright 2022 Synchronous Technologies Pte Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
