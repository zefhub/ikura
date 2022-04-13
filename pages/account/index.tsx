/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import { useContext } from "react";
import Link from "next/link";
import { useIntl } from "react-intl";
import UserContext from "contexts/User";

const Account: NextPage = () => {
  const intl = useIntl();
  const user = useContext(UserContext);

  return (
    <div className="h-full">
      <div className="flex flex-col">
        <div className="flex flex-row justify-start items-center mt-4 mx-4">
          <h1 className="text-2xl font-semibold">
            {intl.formatMessage({ defaultMessage: "My account" })}
          </h1>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <img
          src={user?.photoURL || "/img/avatar.jpeg"}
          alt="profile photo"
          className="w-32 h-32 rounded-xl mt-8"
        />
        <Link href="/account/settings">
          <a className="flex flex-row justify-center items-center mt-14 h-12 px-12 w-2/3 rounded-full drop-shadow-lg bg-ikura-dark text-white">
            Settings
          </a>
        </Link>
        <Link href="/account/categories">
          <a className="flex flex-row justify-center items-center mt-6 h-12 px-12 w-2/3 rounded-full drop-shadow-lg bg-ikura-dark text-white">
            Categories
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Account;
