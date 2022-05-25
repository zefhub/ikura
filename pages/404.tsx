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

import type { NextPage } from "next";
import { useIntl } from "react-intl";
import Link from "next/link";
import loadIntlMessages from "utils/loadIntlMessages";

const Err404: NextPage = () => {
  const intl = useIntl();

  return (
    <div className="flex flex-col items-center mt-8">
      <h6 className="text-4xl mb-5">
        {intl.formatMessage({ defaultMessage: "404" })}
      </h6>
      <h1>There’s no page here 😭</h1>
      <p className="mb-6">Looks like you ended up here by accident?</p>
      <Link href="/">
        <a className="px-6 py-3 rounded-full drop-shadow-lg bg-ikura-dark text-white">
          {intl.formatMessage({ defaultMessage: "Return to your dashboard" })}
        </a>
      </Link>
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

export default Err404;
