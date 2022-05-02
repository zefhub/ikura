import type { NextPage } from "next";
import { useIntl } from "react-intl";
import Link from "next/link";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { signOut } from "next-auth/react";
import { ArrowBack } from "@mui/icons-material";
import { GET_USER } from "constants/queries";
import AccountDetailsForm, {
  AccountDetailsFormValues,
} from "forms/AccountDetails";
import Protected from "components/Protected";
import Button from "components/Button";
import Loading from "components/Loading";

const UPDATE_USER_MUTATION = gql`
  mutation updateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      user {
        id
      }
    }
  }
`;

const Settings: NextPage = () => {
  const intl = useIntl();
  const { data: session } = useSession();
  const [updateUser] = useMutation(UPDATE_USER_MUTATION);
  const { data, loading } = useQuery(GET_USER, {
    variables: {
      // @ts-ignore
      id: session?.user?.id,
    },
  });

  const onAccountDetailsSubmit = async (values: AccountDetailsFormValues) => {
    try {
      await updateUser({
        mutation: UPDATE_USER_MUTATION,
        variables: {
          input: {
            filter: {
              // @ts-ignore
              id: session?.user?.id,
            },
            set: { ...values },
          },
        },
      });
    } catch (err: any) {
      console.error(err);
      toast.error(err.message);
    }
  };

  const onLogout = async () => {
    try {
      signOut({ callbackUrl: "/signin" });
      toast.success(intl.formatMessage({ defaultMessage: "Signed out" }));
    } catch (err: any) {
      console.error(err);
      toast.error(err.message);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Protected>
      <div className="flex flex-col">
        <div className="flex flex-row justify-start items-center mt-4 mx-4">
          <Link href="/account">
            <a className="mr-2">
              <ArrowBack />
            </a>
          </Link>
          <h1 className="text-2xl font-semibold">
            {intl.formatMessage({ defaultMessage: "Settings" })}
          </h1>
        </div>
        <AccountDetailsForm
          onSubmit={onAccountDetailsSubmit}
          initialValues={{
            givenName: data?.getUser?.givenName,
            familyName: data?.getUser?.familyName,
          }}
        />
        <Button type="button" onClick={onLogout} className="mt-8">
          {intl.formatMessage({ defaultMessage: "Sign out" })}
        </Button>
      </div>
    </Protected>
  );
};

export default Settings;
