import type { NextPage } from "next";
import Link from "next/link";
import { useIntl } from "react-intl";
import Image from "next/image";
import { FormikHelpers } from "formik";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useAuthUser, withAuthUser, AuthAction } from "next-firebase-auth";
import loadIntlMessages from "../../helpers/loadIntlMessages";
import avatar from "../../public/img/avatars/default.png";
import GeneralSettingsForm, {
  GeneralSettingsFormValues,
} from "../../forms/GeneralSettingsForm";

const GET_USER_QUERY = gql`
  query getUser($id: String!) {
    getUser(id: $id) {
      id
      email
      givenName
      familyName
      phone
      birthday
    }
  }
`;

const UPDATE_USER_MUTATION = gql`
  mutation updateUser(
    $id: String!
    $email: String
    $givenName: String
    $familyName: String
    $phone: String
    $birthday: DateTime
  ) {
    updateUser(
      input: {
        filter: { id: { eq: $id } }
        set: {
          birthday: $birthday
          email: $email
          givenName: $givenName
          familyName: $familyName
          phone: $phone
        }
      }
    ) {
      user {
        id
      }
    }
  }
`;

const Settings: NextPage = () => {
  const intl = useIntl();
  const user = useAuthUser();

  const [updateUser] = useMutation(UPDATE_USER_MUTATION);
  const { loading, error, data } = useQuery(GET_USER_QUERY, {
    variables: { id: user.id || "" },
  });
  if (error) {
    console.error(error);
  }

  const onPersonalInfoSubmit = async (
    values: GeneralSettingsFormValues,
    { setSubmitting }: FormikHelpers<GeneralSettingsFormValues>
  ) => {
    try {
      await updateUser({
        variables: {
          ...values,
          id: user.id,
        },
      });
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
                        <a className="nav-link active">
                          {intl.formatMessage({
                            defaultMessage: "General",
                            description: "settings menu general",
                          })}
                        </a>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link href="/settings/categories">
                        <a className="nav-link">
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
          <div className="row justify-content-between align-items-center">
            <div className="col">
              <div className="row align-items-center">
                <div className="col-auto">
                  <div className="avatar">
                    <Image
                      src={avatar}
                      alt="profile avatar"
                      className="avatar-img rounded-circle"
                    />
                  </div>
                </div>
                <div className="col ms-n2">
                  <h4 className="mb-1">Your avatar</h4>
                  <small className="text-muted">
                    PNG or JPG no bigger than 1000px wide and tall.
                  </small>
                </div>
              </div>
            </div>
            <div className="col-auto">
              <button type="button" className="btn btn-sm btn-primary">
                Upload
              </button>
            </div>
          </div>
          <hr className="my-5" />
          {loading ? (
            <div className="text-center mt-4">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            user?.id && (
              <GeneralSettingsForm
                onSubmit={onPersonalInfoSubmit}
                initialValues={{
                  ...data.getUser,
                  email: user?.email,
                }}
              />
            )
          )}
        </div>
      </div>
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

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Settings);
