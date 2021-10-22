import { Formik, Field } from "formik";
import { DateTime } from "luxon";
import * as Yup from "yup";
import Input from "../components/Input";

export interface GeneralSettingsFormProps {
  onSubmit: any;
  initialValues?: any;
}

export type GeneralSettingsFormValues = {
  givenName: string;
  familyName: string;
};

const validationSchema = Yup.object().shape({
  givenName: Yup.string().required("Required."),
  familyName: Yup.string().required("Required."),
});

const GeneralSettingsForm: React.FC<GeneralSettingsFormProps> = (props) => {
  const getBirthday = () => {
    if (props.initialValues && props.initialValues.birthday) {
      return DateTime.fromISO(props.initialValues.birthday).toFormat(
        "yyyy-MM-dd"
      );
    }
    return "";
  };

  return (
    <Formik
      initialValues={{ ...props.initialValues, birthday: getBirthday() }}
      onSubmit={props.onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, errors, touched, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-12 col-md-6">
              <Field
                as={Input}
                touched={touched}
                errors={errors}
                name="givenName"
                type="text"
                label="First Name"
                tabIndex={0}
              />
            </div>
            <div className="col-12 col-md-6">
              <Field
                as={Input}
                touched={touched}
                errors={errors}
                name="familyName"
                type="text"
                label="Last Name"
                tabIndex={1}
              />
            </div>
            <div className="col-12">
              <Field
                as={Input}
                touched={touched}
                errors={errors}
                name="email"
                type="email"
                label="Email"
                disabled
                readOnly
              />
            </div>
            <div className="col-12 col-md-6">
              <Field
                as={Input}
                touched={touched}
                errors={errors}
                name="phone"
                type="phone"
                label="Phone"
                placeholder="___-___-___"
                tabIndex={2}
              />
            </div>
            <div className="col-12 col-md-6">
              <Field
                as={Input}
                touched={touched}
                errors={errors}
                name="birthday"
                type="date"
                label="Birthday"
                placeholder="dd/mm/yyyy"
                tabIndex={3}
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting && (
              <span
                className="spinner-border spinner-border-sm"
                style={{ marginRight: 7 }}
                role="status"
                aria-hidden="true"
              />
            )}
            Save changes
          </button>
        </form>
      )}
    </Formik>
  );
};

export default GeneralSettingsForm;
