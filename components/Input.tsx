import { FieldInputProps } from "formik";
import { classNames } from "../utils";

export interface InputProps {
  name: string;
  touched: { [key: string]: boolean };
  errors: { [key: string]: string };
  type: "text" | "number" | "date";
  label?: string;
  disabled?: boolean;
  readOnly?: boolean;
  tabIndex?: number;
}

const Input: React.FC<InputProps & FieldInputProps<any>> = (props) => {
  const hasError = (): boolean => {
    if (props.touched && props.touched[props.name] === true) {
      if (props.errors && props.errors[props.name]) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className={classNames("form-group")}>
      {props.label && (
        <label className="form-label" htmlFor={`input-${props.name}`}>
          {props.label}
        </label>
      )}
      <input
        className={classNames("form-control", hasError() ? "is-invalid" : "")}
        id={`input-${props.name}`}
        type={props.type}
        name={props.name}
        value={props.value || ""}
        onChange={props.onChange}
        onBlur={props.onBlur}
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

export default Input;
