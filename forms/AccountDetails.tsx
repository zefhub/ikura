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
import Button from "components/Button";
import Input from "components/Input";

const validationSchema = Yup.object().shape({
  givenName: Yup.string().required("Required").nullable(),
  familyName: Yup.string().required("Required").nullable(),
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
      {({ errors, touched }) => (
        <Form className="w-full flex flex-col items-start p-5">
          <Field as={Input} name="givenName" type="text" label="First name" />
          <FormError name="givenName" errors={errors} touched={touched} />
          <Field as={Input} name="familyName" type="text" label="Last name" />
          <FormError name="familyName" errors={errors} touched={touched} />
          <div className="flex flex-row justify-center w-full">
            <Button
              type="submit"
              className="bg-gradient-to-br from-ikura-light to-ikura-dark text-white mt-6"
            >
              {intl.formatMessage({ defaultMessage: "Save" })}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AccountDetails;
