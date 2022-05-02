import { Formik, Form, Field } from "formik";
import { useIntl } from "react-intl";
import * as Yup from "yup";
import Button from "components/Button";
import Input from "components/Input";

const validationSchema = Yup.object().shape({
  givenName: Yup.string().required("Required"),
  familyName: Yup.string().required("Required"),
});

export interface AccountDetailsFormProps {
  onSubmit: (values: AccountDetailsFormValues) => Promise<void>;
  initialValues?: any;
}

export type AccountDetailsFormValues = {
  givenName?: string;
  familyName?: string;
};

const AccountDetails: React.FC<AccountDetailsFormProps> = (props) => {
  const intl = useIntl();

  return (
    <Formik
      initialValues={props.initialValues}
      onSubmit={props.onSubmit}
      validationSchema={validationSchema}
    >
      <Form className="w-full flex flex-col items-start p-5">
        <Field
          as={Input}
          name="givenName"
          type="text"
          label="First name"
          className="mb-4"
        />
        <Field
          as={Input}
          name="familyName"
          type="text"
          label="Last name"
          className="mb-4"
        />
        <div className="flex flex-row justify-center w-full">
          <Button
            type="submit"
            className="bg-gradient-to-br from-ikura-light to-ikura-dark text-white mt-2"
          >
            {intl.formatMessage({ defaultMessage: "Save" })}
          </Button>
        </div>
      </Form>
    </Formik>
  );
};

export default AccountDetails;
