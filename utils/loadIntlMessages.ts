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

import fs from "fs/promises";
import path from "path";

type LoadI18nMessagesProps = {
  locale: string;
  defaultLocale: string;
};

type MessageConfig = { [key: string]: string };

export default async function loadI18nMessages({
  locale,
  defaultLocale,
}: LoadI18nMessagesProps): Promise<MessageConfig> {
  // If the default locale is being used we can skip it
  if (locale === defaultLocale) {
    return {};
  }

  if (locale !== defaultLocale) {
    const languagePath = path.join(
      process.cwd(),
      `compiled-lang/${locale}.json`
    );
    try {
      const contents = await fs.readFile(languagePath, "utf-8");
      return JSON.parse(contents);
    } catch (error) {
      console.info(
        'Could not load compiled language files. Please run "npm run i18n:compile" first"'
      );
      console.error(error);
    }
  }
  return {};
}
