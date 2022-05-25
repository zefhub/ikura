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

import dynamic from "next/dynamic";
import React from "react";
import { useField } from "formik";
import { IEmojiData } from "emoji-picker-react";

const DynamicPicker = dynamic(() => import("emoji-picker-react"), {
  ssr: false,
});

export interface EmojiPickerProps {
  name: string;
}

const EmojiPicker: React.FC<EmojiPickerProps> = (props) => {
  const [field, meta, helpers] = useField(props.name);

  const onSelect = (
    event: React.MouseEvent<Element, MouseEvent>,
    data: IEmojiData
  ) => {
    helpers.setValue(data.emoji);
  };

  return (
    <div className="w-full flex flex-row justify-center mb-2">
      {/* @ts-ignore */}
      <DynamicPicker onEmojiClick={onSelect} disableSkinTonePicker />
    </div>
  );
};

export default EmojiPicker;
