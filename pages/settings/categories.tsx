import type { NextPage } from "next";
import { useState, useContext } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useIntl } from "react-intl";
import Link from "next/link";
import { FormikHelpers } from "formik";
import { gql, useMutation, useQuery } from "@apollo/client";
import { DateTime } from "luxon";
import { Modal } from "react-bootstrap";
import UserContext from "contexts/User";
import loadIntlMessages from "utils/loadIntlMessages";
import CategoryForm, { CategoryFormValues } from "forms/CategoryForm";
import logo from "../../public/img/logo.png";
import { getTitleLang } from "utils";

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
      type
      title
      titleLangEn
      titleLangJa
      description
      descriptionLangEn
      descriptionLangJa
      icon
      color
    }
  }
`;

const SettingsCategories: NextPage = () => {
  const [newCategoryShow, setNewCategoryShow] = useState<boolean>(false);

  const { locale } = useRouter();
  const intl = useIntl();
  const user = useContext(UserContext);

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
            id: user?.uid,
          },
          type: "PRIVATE",
          title: values.title,
          description: values.description,
          createdAt: DateTime.now(),
        },
      });
      setSubmitting(false);
      setNewCategoryShow(false);
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const getDefaultCategories = () => {
    if (data && data.queryCategory) {
      return data.queryCategory.filter((o: any) => o.type === "DEFAULT");
    }
    return [];
  };

  const getPrivateCategories = () => {
    if (data && data.queryCategory) {
      return data.queryCategory.filter((o: any) => o.type === "PRIVATE");
    }
    return [];
  };

  const getDescription = (category: any): string => {
    switch (locale) {
      case "en":
        return category?.descriptionLangEn;
      case "ja":
        return category?.descriptionLangJa;
      default:
        return category?.descriptionLangEn;
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
                  <h1 className="header-title">
                    {intl.formatMessage({
                      defaultMessage: "Settings",
                      description: "settings page-header settings",
                    })}
                  </h1>
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col">
                  <ul className="nav nav-tabs nav-overflow header-tabs">
                    <li className="nav-item">
                      <Link href="/settings">
                        <a className="nav-link">
                          {intl.formatMessage({
                            defaultMessage: "General",
                            description: "settings menu general",
                          })}
                        </a>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link href="/settings/categories">
                        <a className="nav-link active">
                          {intl.formatMessage({
                            defaultMessage: "Categories",
                            description: "settings menu categories",
                          })}
                        </a>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link href="/settings/notifications">
                        <a className="nav-link">
                          {intl.formatMessage({
                            defaultMessage: "Notifications",
                            description: "settings menu notifications",
                          })}
                        </a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <h4 className="card-header-title">Default categories</h4>
            </div>
            <div className="card-body">
              {loading ? (
                <div className="text-center mt-3 mb-3">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">
                      {intl.formatMessage({
                        defaultMessage: "Loading...",
                        description: "default loading",
                      })}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="list-group list-group-flush my-n3">
                  {getDefaultCategories().map((category: any) => (
                    <div key={category.id} className="list-group-item">
                      <div className="row align-items-center">
                        <div className="col-auto">
                          <i className={`h1 ${category.icon}`} />
                        </div>
                        <div className="col-5 ms-n2">
                          <h4 className="mb-1">
                            {getTitleLang(locale, category)}
                          </h4>
                          {getDescription(category.description) && (
                            <p className="small text-muted mb-0">
                              <span className="d-block text-reset text-truncate">
                                {getDescription(category.description)}
                              </span>
                            </p>
                          )}
                        </div>
                        <div className="col-auto"></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
                getPrivateCategories().length > 0 ? (
                  <div className="list-group list-group-flush my-n3">
                    {getPrivateCategories().map((category: any) => (
                      <div key={category.id} className="list-group-item">
                        <div className="row align-items-center">
                          <div className="col-auto">
                            <div className="avatar">
                              <Image
                                src={logo}
                                alt="icon"
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
                    <span className="visually-hidden">
                      {intl.formatMessage({
                        defaultMessage: "Loading...",
                        description: "default loading",
                      })}
                    </span>
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

export async function getStaticProps(ctx: any) {
  return {
    props: {
      intlMessages: await loadIntlMessages(ctx),
    },
  };
}

export default SettingsCategories;
