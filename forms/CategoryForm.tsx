import { Formik, Field } from "formik";
import * as Yup from "yup";
import Input from "../components/Input";
import Textarea from "../components/Textarea";

export interface CategoryFormProps {
  onSubmit: any;
  onCancel: any;
  initialValues?: any;
}

export type CategoryFormValues = {
  title: string;
  description: string;
};

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Required."),
  description: Yup.string(),
});

const CategoryForm: React.FC<CategoryFormProps> = (props) => {
  return (
    <Formik
      initialValues={props.initialValues}
      onSubmit={props.onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, errors, touched, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <Field
            as={Input}
            touched={touched}
            errors={errors}
            name="title"
            type="text"
            label="Title"
            tabIndex={0}
          />
          <Field
            as={Textarea}
            touched={touched}
            errors={errors}
            name="description"
            label="Description"
            tabIndex={1}
          />
          <div className="d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-light"
              onClick={props.onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>
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
              Create category
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default CategoryForm;
