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

import type { NextPage } from "next";
import { useState } from "react";
import { useIntl } from "react-intl";
import { Dialog } from "@headlessui/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { gql, useQuery, useMutation } from "@apollo/client";
import { ArrowBack, Add } from "@mui/icons-material";
import { GET_CATEGORIES } from "constants/queries";
import Protected from "components/Protected";
import Category from "components/Category";
import Loading from "components/Loading";
import CategoryForm, { CategoryFormValues } from "forms/CategoryForm";

const ADD_CATEGORY = gql`
  mutation addCategory($input: [AddCategoryInput!]!) {
    addCategory(input: $input) {
      count
    }
  }
`;

const Categories: NextPage = () => {
  const intl = useIntl();
  const { data: session } = useSession();
  const [open, setOpen] = useState<boolean>(false);
  const [addCategory] = useMutation(ADD_CATEGORY, {
    refetchQueries: [GET_CATEGORIES],
  });

  const { data, loading, error } = useQuery(GET_CATEGORIES);
  if (error) {
    toast.error(error.message);
  }

  const onCategorySubmit = async (values: CategoryFormValues) => {
    try {
      await addCategory({
        variables: {
          input: [
            {
              name: values.name,
              icon: values.icon,
              created: new Date(),
              user: {
                // @ts-ignore
                id: session.user?.id,
              },
            },
          ],
        },
      });
      toast.success(intl.formatMessage({ defaultMessage: "Category added" }));
      setOpen(false);
    } catch (err: any) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <Protected>
      <div className="flex flex-col px-4">
        <div className="flex flex-row justify-start items-center mt-4 mb-6">
          <Link href="/account">
            <a className="mr-2">
              <ArrowBack />
            </a>
          </Link>
          <h1 className="text-2xl font-semibold">
            {intl.formatMessage({ defaultMessage: "Categories" })}
          </h1>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-3 place-items-center">
            {data.queryCategory.map((category: any) => (
              <Link href={`/account/category/${category.id}`} key={category.id}>
                <a>
                  <Category
                    id={category.id}
                    name={category.name}
                    icon={category.icon}
                    className="mb-5"
                  />
                </a>
              </Link>
            ))}
            <button type="button" onClick={() => setOpen(true)}>
              <Category id="" name="New" icon={<Add />} className="mb-5" />
            </button>
          </div>
        )}
      </div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Dialog.Overlay className="z-40 fixed inset-0 bg-black opacity-30" />
        <div
          className="flex flex-col items-start z-50 w-11/12 absolute top-0 m-4 p-4 bg-white rounded-md shadow-xl"
          style={{ maxWidth: "400" }}
        >
          <CategoryForm onSubmit={onCategorySubmit} initialValues={{}} />
        </div>
      </Dialog>
    </Protected>
  );
};

export default Categories;
