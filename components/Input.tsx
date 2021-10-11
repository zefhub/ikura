import { classNames } from "../utils";

export interface InputProps {
  name: string;
  touched: { [key: string]: boolean };
  errors: { [key: string]: string };
  type: "text" | "number" | "date";
  label?: string;
}

const Input: React.FC<InputProps> = (props) => {
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
        {...props}
        id={`input-${props.name}`}
        type={props.type}
      />
      {hasError() && (
        <div className="invalid-feedback">{props.errors[props.name]}</div>
      )}
    </div>
  );
};

export default Input;
