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

import type { NextApiRequest, NextApiResponse } from "next";
import { parseCookie } from "lib/cookie";

type Data = {
  valid: boolean;
  accessToken: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Get cookies
  if (!req.headers.cookie) {
    return res.status(401).json({ valid: false, accessToken: "" });
  }
  const cookies = parseCookie(req.headers.cookie);

  if (cookies["__Secure-next-auth.session-token"]) {
    return res.status(200).json({
      valid: true,
      accessToken: cookies["__Secure-next-auth.session-token"],
    });
  }

  if (cookies["next-auth.session-token"]) {
    return res.status(200).json({
      valid: true,
      accessToken: cookies["next-auth.session-token"],
    });
  }

  // TODO: Validate JWT/renew

  console.warn("no session token");
  res.status(401).json({ valid: false, accessToken: "" });
}
