import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Input from "components/Input";

export interface SigninFormProps {
  onSubmit: (values: SigninFormValues) => Promise<void>;
  initialValues?: any;
}

export type SigninFormValues = {
  email: string;
  password: string;
};

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  password: Yup.string()
    .min(6, "Must be at least 6 characters.")
    .required("Password is required"),
});

const SigninForm: React.FC<SigninFormProps> = (props) => {
  return (
    <Formik
      // initialValues={props.initialValues}
      initialValues={{ email: "", password: "" }}
      onSubmit={props.onSubmit}
      validationSchema={validationSchema}
    >
      <Form>
        <Field
          as={Input}
          name="email"
          type="email"
          placeholder="Enter Email Address..."
          className="form-control-user"
        />
        <Field
          as={Input}
          name="password"
          type="password"
          placeholder="Password"
          className="form-control-user"
        />
        <button type="submit" className="btn btn-primary btn-user btn-block">
          Login
        </button>
      </Form>
    </Formik>
  );
};

export default SigninForm;