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

import { FieldInputProps } from "formik";
import { classNames } from "../utils";

export interface TextareaProps {
  name: string;
  touched: { [key: string]: boolean };
  errors: { [key: string]: string };
  rows?: number;
  label?: string;
  disabled?: boolean;
  readOnly?: boolean;
  tabIndex?: number;
}

const Textarea: React.FC<TextareaProps & FieldInputProps<any>> = (props) => {
  const hasError = (): boolean => {
    if (props.touched && props.touched[props.name] === true) {
      if (props.errors && props.errors[props.name]) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className="form-group">
      {props.label && (
        <label className="form-label" htmlFor={`input-${props.name}`}>
          {props.label}
        </label>
      )}
      <textarea
        className={classNames("form-control", hasError() ? "is-invalid" : "")}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        rows={props.rows}
        disabled={props.disabled}
        tabIndex={props.tabIndex}
        readOnly={props.readOnly}
      />
      {hasError() && (
        <div className="invalid-feedback">{props.errors[props.name]}</div>
      )}
    </div>
  );
};

export default Textarea;
