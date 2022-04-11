import type { NextPage } from "next";
import { Fragment, useState } from "react";
import { useIntl } from "react-intl";
import { Dialog } from "@headlessui/react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { gql, useQuery } from "@apollo/client";
import { ArrowBack, Add } from "@mui/icons-material";
import Category from "components/Category";
import Loading from "components/Loading";
import CategoryForm from "forms/CategoryForm";

const GET_CATEGORIES = gql`
  query GetCategories {
    queryCategory {
      id
      name
      icon
    }
  }
`;

const Categories: NextPage = () => {
  const intl = useIntl();
  const [open, setOpen] = useState<boolean>(false);

  const { data, loading, error } = useQuery(GET_CATEGORIES);
  if (error) {
    toast.error(error.message);
  }

  const onCategorySubmit = async (values: any) => {
    console.log(values);
  };

  return (
    <Fragment>
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
          <div className="grid grid-cols-3">
            {data.queryCategory.map((category: any) => (
              <Category
                key={category.id}
                id={category.id}
                name={category.name}
                icon={category.icon}
              />
            ))}
          </div>
        )}
        <button type="button" onClick={() => setOpen(true)}>
          <Category id="" name="New" icon={<Add />} />
        </button>
      </div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Dialog.Overlay className="z-40 fixed inset-0 bg-black opacity-30" />
        <div className="flex flex-col items-start z-50 w-11/12 absolute top-0 m-4 p-4 bg-white rounded-md shadow-xl">
          <CategoryForm onSubmit={onCategorySubmit} initialValues={{}} />
        </div>
      </Dialog>
    </Fragment>
  );
};

export default Categories;
