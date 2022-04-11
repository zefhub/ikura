import { Formik, Form, Field } from "formik";
import { useIntl } from "react-intl";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import * as Yup from "yup";
import Input from "components/Input";
import Button from "components/Button";
import Loading from "components/Loading";

const GET_CATEGORIES = gql`
  query GetCategories {
    queryCategory {
      id
      name
      icon
    }
  }
`;

const validationSchema = Yup.object().shape({
  amount: Yup.number().required("Required"),
  date: Yup.date().required("Required"),
});

export interface TransactionFormProps {
  onSubmit: (values: TransactionFormValues) => Promise<void>;
  initialValues?: any;
}

export type TransactionFormValues = {};

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
      <Form className="w-full flex flex-col items-start">
        <Field
          as={Input}
          name="amount"
          type="number"
          placeholder="1,000"
          label="Amount"
          className="mb-4"
        />
        <Field as={Input} name="date" type="date" label="Date" />
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
                  value="One"
                  className="mr-2"
                />
                Test
              </label>
            ))}
          </div>
        )}
        <Button
          type="submit"
          className="bg-gradient-to-br from-ikura-light to-ikura-dark text-white mt-2"
        >
          {intl.formatMessage({ defaultMessage: "Save" })}
        </Button>
      </Form>
    </Formik>
  );
};

export default TransactionForm;
