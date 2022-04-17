import type { NextPage } from "next";
import { Fragment, useState, useContext } from "react";
import { useIntl } from "react-intl";
import { Dialog } from "@headlessui/react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { gql, useQuery, useMutation } from "@apollo/client";
import { ArrowBack, Add } from "@mui/icons-material";
import UserContext from "contexts/User";
import { GET_CATEGORIES } from "constants/queries";
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
  const user = useContext(UserContext);
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
                id: user?.id,
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
          <div className="grid grid-cols-3 place-items-center">
            {data.queryCategory.map((category: any) => (
              <Category
                key={category.id}
                id={category.id}
                name={category.name}
                icon={category.icon}
                className="mb-5"
              />
            ))}
            <button type="button" onClick={() => setOpen(true)}>
              <Category id="" name="New" icon={<Add />} className="mb-5" />
            </button>
          </div>
        )}
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
