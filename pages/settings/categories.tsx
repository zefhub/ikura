import type { NextPage } from "next";
import { useState } from "react";
import Link from "next/link";
import { FormikHelpers } from "formik";
import { useAuthUser, withAuthUser, AuthAction } from "next-firebase-auth";
import { gql, useMutation, useQuery } from "@apollo/client";
import { DateTime } from "luxon";
import { Modal } from "react-bootstrap";
import CategoryForm, { CategoryFormValues } from "../../forms/CategoryForm";

const ADD_CATEGORY_MUTATION = gql`
  mutation addCategory(
    $user: UserRef!
    $type: CategoryType!
    $title: String!
    $createdAt: DateTime!
    $description: String
    $color: String
    $icon: String
  ) {
    addCategory(
      input: {
        user: $user
        type: $type
        title: $title
        createdAt: $createdAt
        description: $description
        color: $color
        icon: $icon
      }
    ) {
      category {
        id
      }
    }
  }
`;

const GET_CATEGORIES_QUERY = gql`
  query allCategories {
    queryCategory(order: { desc: createdAt }) {
      id
      title
      description
      icon
      color
    }
  }
`;

const SettingsCategories: NextPage = () => {
  const [newCategoryShow, setNewCategoryShow] = useState<boolean>(false);

  const user = useAuthUser();
  const [addCategory] = useMutation(ADD_CATEGORY_MUTATION);
  const { loading, error, data, refetch } = useQuery(GET_CATEGORIES_QUERY);

  // TODO: Error handeling
  if (error) {
    console.error(error);
  }

  const onNewCategory = async (
    values: CategoryFormValues,
    { setSubmitting }: FormikHelpers<CategoryFormValues>
  ) => {
    try {
      await addCategory({
        variables: {
          user: {
            id: user?.id,
          },
          type: "PRIVATE",
          title: values.title,
          description: values.description,
          createdAt: DateTime.now(),
        },
        // update: (cache, { data: { addCategory } }) => {
        //   cache.modify({
        //     fields: {
        //       queryCategory(existing = []) {
        //         const newRef = cache.writeFragment({
        //           data: addCategory,
        //           fragment: gql`
        //             fragment NewCategory on queryCategory {
        //               id
        //             }
        //           `,
        //         });
        //         return [newRef, ...existing];
        //       },
        //     },
        //   });
        // },
      });
      setSubmitting(false);
      setNewCategoryShow(false);
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10 col-xl-8">
          <div className="header">
            <div className="header-body">
              <div className="row align-items-center">
                <div className="col">
                  <h6 className="header-pretitle">Overview</h6>
                  <h1 className="header-title">Settings</h1>
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col">
                  <ul className="nav nav-tabs nav-overflow header-tabs">
                    <li className="nav-item">
                      <Link href="/settings">
                        <a className="nav-link">General</a>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link href="/settings/categories">
                        <a className="nav-link active">Categories</a>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link href="/settings/notifications">
                        <a className="nav-link">Notifications</a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <h4 className="card-header-title">Registered categories</h4>
              <button
                type="button"
                className="btn btn-sm btn-primary"
                onClick={() => setNewCategoryShow(true)}
              >
                New Category
              </button>
            </div>
            <div className="card-body">
              {!loading ? (
                data.queryCategory.length > 0 ? (
                  <div className="list-group list-group-flush my-n3">
                    {data.queryCategory.map((category: any) => (
                      <div key={category.id} className="list-group-item">
                        <div className="row align-items-center">
                          <div className="col-auto">
                            <div className="avatar">
                              <img
                                src="/img/avatars/profiles/avatar-1.jpg"
                                alt="..."
                                className="avatar-img rounded-circle"
                              />
                            </div>
                          </div>
                          <div className="col-5 ms-n2">
                            <h4 className="mb-1">{category.title}</h4>
                            {category.description && (
                              <p className="small text-muted mb-0">
                                <span className="d-block text-reset text-truncate">
                                  {category.description}
                                </span>
                              </p>
                            )}
                          </div>
                          <div className="col-auto"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center mt-3 mb-3">No data</div>
                )
              ) : (
                <div className="text-center mt-3 mb-3">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={newCategoryShow}
        onHide={() => setNewCategoryShow(false)}
        backdrop="static"
      >
        <div className="modal-card card">
          <div className="card-header">
            <h4 className="card-header-title">Create New Category</h4>
          </div>
          <div className="card-body">
            <CategoryForm
              onSubmit={onNewCategory}
              onCancel={() => setNewCategoryShow(false)}
              initialValues={{}}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(SettingsCategories);
