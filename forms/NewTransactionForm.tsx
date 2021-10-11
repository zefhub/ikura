import { Formik, Field } from "formik";
import * as Yup from "yup";
import Input from "../components/Input";

export interface NewTransactionFormProps {
  onSubmit: any;
  onCancel?: any;
  initialValues?: any;
}

export type NewTransactionFormValues = {
  amount: number;
  when: string;
};

const validationSchema = Yup.object().shape({
  amount: Yup.number().required("Please provide a valid numeric amount."),
  when: Yup.date(),
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
