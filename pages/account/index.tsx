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

/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useIntl } from "react-intl";
import Protected from "components/Protected";

const Account: NextPage = () => {
  const intl = useIntl();
  const { data: session } = useSession();

  return (
    <Protected>
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
            src={session?.user?.image || "/img/avatar.jpeg"}
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
    </Protected>
  );
};

export default Account;
