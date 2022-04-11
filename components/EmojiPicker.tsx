import React from "react";
import { useField } from "formik";
import Picker, { IEmojiData } from "emoji-picker-react";

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
      <Picker onEmojiClick={onSelect} disableSkinTonePicker />
    </div>
  );
};

export default EmojiPicker;
