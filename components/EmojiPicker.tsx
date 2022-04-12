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
    console.log(data);
    helpers.setValue(data.emoji);
  };

  return (
    <div className="w-full flex flex-row justify-center mb-2">
      <DynamicPicker onEmojiClick={onSelect} disableSkinTonePicker />
    </div>
  );
};

export default EmojiPicker;
