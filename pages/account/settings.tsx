import type { NextPage } from "next";
import { useIntl } from "react-intl";
import Link from "next/link";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";
import { ArrowBack } from "@mui/icons-material";
import Protected from "components/Protected";
import Button from "components/Button";

const Settings: NextPage = () => {
  const intl = useIntl();

  const onLogout = async () => {
    try {
      signOut({ callbackUrl: "/signin" });
      toast.success(intl.formatMessage({ defaultMessage: "Signed out" }));
    } catch (err: any) {
      console.error(err);
      toast.error(err.message);
    }
  };

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
        <Button type="button" onClick={onLogout}>
          {intl.formatMessage({ defaultMessage: "Sign out" })}
        </Button>
      </div>
    </Protected>
  );
};

export default Settings;
