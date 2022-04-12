import { Formik, Form, Field } from "formik";
import { useIntl } from "react-intl";
import * as Yup from "yup";
import Input from "components/Input";
import EmojiPicker from "components/EmojiPicker";
import Button from "components/Button";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  icon: Yup.string().required("Required"),
});

export interface CategoryFormProps {
  onSubmit: (values: CategoryFormValues) => Promise<void>;
  initialValues?: any;
}

export type CategoryFormValues = {
  name?: string;
  icon?: string;
};

const CategoryForm: React.FC<CategoryFormProps> = (props) => {
  const intl = useIntl();

  return (
    <Formik
      initialValues={props.initialValues}
      onSubmit={props.onSubmit}
      validationSchema={validationSchema}
    >
      <Form className="w-full flex flex-col items-start">
        <Field
          as={Input}
          name="name"
          type="text"
          label="Name"
          className="mb-4"
        />
        <Field as={EmojiPicker} name="icon" />
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

export default CategoryForm;
