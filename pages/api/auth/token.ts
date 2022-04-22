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
  console.log("cookies", cookies);

  if (cookies["__Secure-next-auth.session-token"]) {
    return res.status(200).json({
      valid: true,
      accessToken: cookies["Secure-next-auth.session-token"],
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
