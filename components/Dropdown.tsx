import { FieldInputProps } from "formik";
import { classNames } from "../utils";

export interface InputProps {
  name: string;
  touched: { [key: string]: boolean };
  errors: { [key: string]: string };
  label?: string;
  disabled?: boolean;
  readOnly?: boolean;
}

const Dropdown: React.FC<InputProps & FieldInputProps<any>> = (props) => {
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
      <select
        className={classNames("form-select", hasError() ? "is-invalid" : "")}
      ></select>
      {hasError() && (
        <div className="invalid-feedback">{props.errors[props.name]}</div>
      )}
    </div>
  );
};

export default Dropdown;
