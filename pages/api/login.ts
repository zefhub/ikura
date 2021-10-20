import type { NextApiRequest, NextApiResponse } from "next";
import { setAuthCookies, getFirebaseAdmin } from "next-firebase-auth";
import initAuth from "../../lib/initAuth";

initAuth();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { AuthUser } = await setAuthCookies(req, res);
    if (AuthUser.id) {
      await getFirebaseAdmin()
        .auth()
        .setCustomUserClaims(AuthUser.id, {
          "https://dgraph.io/jwt/claims": {
            USER_ID: AuthUser.id,
            isAuthenticated: "true",
          },
        });
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return res.status(500).json({ error: "Unexpected error." });
  }
  return res.status(200).json({ status: true });
};

export default handler;
