import { Fragment } from "react";
import { FieldInputProps } from "formik";
import { classNames, fieldHasError } from "utils";

export interface InputProps {
  name: string;
  touched: { [key: string]: boolean };
  errors: { [key: string]: string };
  type: "text" | "number" | "date" | "email" | "password";
  pattern?: string;
  className?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  tabIndex?: number;
}

const Input: React.FC<InputProps & FieldInputProps<any>> = (props) => {
  return (
    <Fragment>
      {props.label && (
        <label className="" htmlFor={`input-${props.name}`}>
          {props.label}
        </label>
      )}
      <input
        className={classNames(
          `mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
            props.className || ""
          }`,
          fieldHasError(props) ? "is-invalid" : ""
        )}
        id={`input-${props.name}`}
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        placeholder={props.placeholder}
        pattern={props.pattern}
        disabled={props.disabled}
        tabIndex={props.tabIndex}
        readOnly={props.readOnly}
      />
      {fieldHasError(props) && (
        <div className="invalid-feedback">{props.errors[props.name]}</div>
      )}
    </Fragment>
  );
};

export default Input;
