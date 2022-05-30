import type { NextPage } from "next";
import { useIntl } from "react-intl";
import { useRouter } from "next/router";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { gql, useQuery, useMutation } from "@apollo/client";
import { ArrowBack } from "@mui/icons-material";
import { GET_CATEGORY, GET_CATEGORIES } from "constants/queries";
import CategoryForm, { CategoryFormValues } from "forms/CategoryForm";
import Protected from "components/Protected";
import Button from "components/Button";
import Loading from "components/Loading";

const DELETE_CATEGORY = gql`
  mutation deleteCategory($id: [ID!]) {
    deleteCategory(filter: { id: $id }) {
      count
    }
  }
`;

const Category: NextPage = () => {
  const intl = useIntl();
  const router = useRouter();

  const [deleteCategory] = useMutation(DELETE_CATEGORY, {
    refetchQueries: [GET_CATEGORIES],
  });

  const { data, loading, error } = useQuery(GET_CATEGORY, {
    variables: { id: router.query.id },
  });
  if (error) {
    console.error(error);
    toast.error(error.message);
  }

  const onUpdate = async (values: CategoryFormValues) => {
    try {
      console.log("valeus", values);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message);
    }
  };

  const onDelete = async () => {
    try {
      await deleteCategory({
        variables: {
          id: [router.query.id],
        },
      });
      toast.success(intl.formatMessage({ defaultMessage: "Category deleted" }));
      router.back();
    } catch (err: any) {
      console.error(err);
      toast.error(err.message);
    }
  };

  const getInitialValues = () => {
    if (!data?.getCategory) {
      return {};
    }

    const { name, icon } = data.getCategory;
    return {
      name: name,
      icon: icon,
    };
  };

  if (loading) {
    return <Loading />;
  }

  console.log("data", data);

  return (
    <Protected>
      <div className="flex flex-col px-4">
        <div className="flex flex-row justify-start items-center mt-4 mb-6">
          <Link href="/account/categories">
            <a className="mr-2">
              <ArrowBack />
            </a>
          </Link>
          <h1 className="text-2xl font-semibold">{data.getCategory?.name}</h1>
        </div>
        <div className="mx-6">
          {data.getCategory && (
            <CategoryForm
              onSubmit={onUpdate}
              onDelete={onDelete}
              initialValues={getInitialValues()}
            />
          )}
        </div>
      </div>
    </Protected>
  );
};

export default Category;
