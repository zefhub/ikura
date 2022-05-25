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
