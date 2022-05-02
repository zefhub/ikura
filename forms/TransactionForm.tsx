import { Formik, Form, Field } from "formik";
import { useIntl } from "react-intl";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import * as Yup from "yup";
import { GET_CATEGORIES } from "constants/queries";
import Input from "components/Input";
import Button from "components/Button";
import Loading from "components/Loading";

const validationSchema = Yup.object().shape({
  amount: Yup.number().required("Required"),
  date: Yup.date().required("Required"),
  category: Yup.string().required("Required"),
});

export interface TransactionFormProps {
  onSubmit: (values: TransactionFormValues) => Promise<void>;
  initialValues?: any;
}

export type TransactionFormValues = {
  amount: number;
  date: Date;
  category: string;
  type: "expense" | "income";
};

const TransactionForm: React.FC<TransactionFormProps> = (props) => {
  const intl = useIntl();
  const { data, loading, error } = useQuery(GET_CATEGORIES);
  if (error) {
    toast.error(error.message);
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <Formik
      initialValues={props.initialValues}
      onSubmit={props.onSubmit}
      validationSchema={validationSchema}
    >
      {(form) => (
        <Form className="w-full flex flex-col items-start">
          <Field
            as={Input}
            name="amount"
            type="number"
            placeholder="1,000"
            label="Amount"
            className="mb-4"
          />
          <Field
            as={Input}
            name="date"
            type="date"
            label="Date"
            className="mb-4"
          />
          {!data.queryCategory.length ? (
            <Link href="/account/categories">
              <a className="self-center px-6 py-6 mt-12 mb-12 rounded-full drop-shadow-lg bg-gradient-to-br from-ikura-light to-ikura-dark text-white">
                Add category
              </a>
            </Link>
          ) : (
            <div className="mb-4 w-full flex flex-col items-start">
              <h3 className="font-semibold">Select category</h3>
              {data.queryCategory.map((category: any) => (
                <label
                  key={category.id}
                  className="flex flex-row justify-center items-center"
                >
                  <Field
                    type="radio"
                    name="category"
                    value={category.id}
                    className="mr-2"
                  />
                  {category.name}
                </label>
              ))}
            </div>
          )}
          <div className="flex flex-row justify-between w-full">
            <Button
              type="button"
              className="bg-gradient-to-br from-ikura-light to-ikura-dark text-white mt-2"
              onClick={() => {
                form.setValues({ ...form.values, type: "income" });
                form.handleSubmit();
              }}
            >
              {intl.formatMessage({ defaultMessage: "Income" })}
            </Button>
            <Button
              type="button"
              className="bg-gradient-to-br from-ikura-light to-ikura-dark text-white mt-2"
              onClick={() => {
                form.setValues({ ...form.values, type: "expense" });
                form.handleSubmit();
              }}
            >
              {intl.formatMessage({ defaultMessage: "Expense" })}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default TransactionForm;
