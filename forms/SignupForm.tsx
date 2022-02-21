import { Formik, Field } from "formik";
import * as Yup from "yup";
import Input from "components/Input";

export interface SignupFormProps {
  onSubmit: (values: SignupFormValues) => Promise<void>;
  initialValues?: any;
}

export type SignupFormValues = {
  email: string;
  password: string;
};

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  password: Yup.string()
    .min(6, "Must be at least 6 characters.")
    .required("Password is required"),
});

const SignupForm: React.FC<SignupFormProps> = (props) => {
  return (
    <Formik
      initialValues={props.initialValues}
      onSubmit={props.onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, errors, touched, isSubmitting }) => (
        <form className="user">
          <Field
            as={Input}
            touched={touched}
            errors={errors}
            name="email"
            type="email"
            placeholder="Enter Email Address..."
            className="form-control-user"
          />
          <Field
            as={Input}
            touched={touched}
            errors={errors}
            name="password"
            type="password"
            placeholder="Password"
            className="form-control-user"
          />
          <button type="submit" className="btn btn-primary btn-user btn-block">
            Login
          </button>
        </form>
      )}
    </Formik>
  );
};

export default SignupForm;
