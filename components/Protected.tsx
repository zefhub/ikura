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

import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useIntl } from "react-intl";
import toast from "react-hot-toast";
import { UserContext } from "contexts/User";
import Loading from "components/Loading";
import MobileNavbar from "components/MobileNavbar";

const Protected: React.FC = (props) => {
  const intl = useIntl();
  const router = useRouter();

  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      toast.error(
        intl.formatMessage({
          defaultMessage: "You must be logged in to view this page",
        })
      );
      router.replace("/signin");
    },
  });

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <UserContext.Provider value={null}>
      <div className="h-screen md:h-full">
        <div className="pb-12">{props.children}</div>
        {session?.user && <MobileNavbar />}
      </div>
    </UserContext.Provider>
  );
};

export default Protected;
