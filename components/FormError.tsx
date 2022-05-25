import React from "react";
import { FormikErrors, FormikTouched } from "formik";

export interface FormErrorProps {
  errors: FormikErrors<any>;
  touched: FormikTouched<any>;
  name: string;
  className?: string;
}

const FormError: React.FC<FormErrorProps> = (props) => {
  if (props.errors[props.name]) {
    return (
      <span
        className={`invalid-feedback text-sm text-red-500 ${props.className}`}
      >
        {props.errors[props.name]}
      </span>
    );
  }

  return null;
};

export default FormError;
