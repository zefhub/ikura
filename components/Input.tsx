import { FieldInputProps } from "formik";
import { classNames, fieldHasError } from "../utils";

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
  return (
    <div className={classNames("form-group")}>
      {props.label && (
        <label className="form-label" htmlFor={`input-${props.name}`}>
          {props.label}
        </label>
      )}
      <input
        className={classNames(
          "form-control",
          fieldHasError(props) ? "is-invalid" : ""
        )}
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
      {fieldHasError(props) && (
        <div className="invalid-feedback">{props.errors[props.name]}</div>
      )}
    </div>
  );
};

export default Input;
