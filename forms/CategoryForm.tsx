/**
 * Copyright 2022 Synchronous Technologies Pte Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Formik, Form, Field } from "formik";
import { useIntl } from "react-intl";
import * as Yup from "yup";
import FormError from "components/FormError";
import Input from "components/Input";
import EmojiPicker from "components/EmojiPicker";
import Button from "components/Button";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required").nullable(),
  icon: Yup.string().required("Required").nullable(),
});

export interface CategoryFormProps {
  onSubmit: (values: CategoryFormValues) => Promise<void>;
  onDelete?: () => void;
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
      {({ errors, touched }) => (
        <Form className="w-full flex flex-col items-start">
          <Field as={Input} name="name" type="text" label="Name" />
          <FormError name="name" errors={errors} touched={touched} />
          <div className="w-full mt-4 flex flex-col items-center">
            <Field as={EmojiPicker} name="icon" />
            <FormError name="icon" errors={errors} touched={touched} />
          </div>
          <div className="flex flex-row justify-between w-full">
            {props.onDelete && (
              <Button
                type="button"
                className="bg-gradient-to-br from-red-500 to-ikura-dark text-white mt-2"
                onClick={() => props.onDelete}
              >
                {intl.formatMessage({ defaultMessage: "Delete" })}
              </Button>
            )}
            <Button
              type="submit"
              className="bg-gradient-to-br from-ikura-light to-ikura-dark text-white mt-2"
            >
              {intl.formatMessage({ defaultMessage: "Save" })}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CategoryForm;
