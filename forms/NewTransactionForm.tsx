import { Formik, Field } from "formik";
import * as Yup from "yup";
import Input from "../components/Input";
import { fieldHasError } from "../utils";

export interface NewTransactionFormProps {
  onSubmit: any;
  onCancel?: any;
  categories?: {
    id: string;
    title: string;
  }[];
  loading: boolean;
  initialValues: any;
}

export type NewTransactionFormValues = {
  amount: number;
  when: string;
  category: string;
};

const validationSchema = Yup.object().shape({
  amount: Yup.number().required("Please provide a valid numeric amount."),
  when: Yup.date().required("Please provide a valid date."),
  category: Yup.string().required("Please provide a valid category."),
});

const NewTransactionForm: React.FC<NewTransactionFormProps> = (props) => {
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
            name="amount"
            type="text"
            label="Amount"
            placeholder="10,000"
            tabIndex={0}
            autoFocus
          />
          <Field
            as={Input}
            touched={touched}
            errors={errors}
            name="when"
            type="date"
            label="Date"
            placeholder="dd/mm/yyyy"
            tabIndex={1}
          />
          <div className="btn-group-toggle mb-4">
            <label className="form-label">Category</label>
            {props.categories?.map((category) => (
              <Field
                key={`radio-group-${category.id}`}
                name="category"
                type="radio"
                value={category.id}
              >
                {({ field }: any) => (
                  <div className="mb-2">
                    <input
                      {...field}
                      type="radio"
                      className="btn-check"
                      id={`radio-${category.id}`}
                      autoComplete="off"
                    />
                    <label
                      className="btn btn-white w-100"
                      htmlFor={`radio-${category.id}`}
                    >
                      {category.title}
                    </label>
                  </div>
                )}
              </Field>
            ))}
            {fieldHasError({ name: "category", errors, touched }) && (
              <div className="invalid-feedback" style={{ display: "block" }}>
                Please provide a valid category.
              </div>
            )}
          </div>
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
              Save Transaction
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default NewTransactionForm;
