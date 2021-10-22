import type { NextPage } from "next";
import { Fragment } from "react";
import { withAuthUser, AuthAction } from "next-firebase-auth";
import loadIntlMessages from "../../helpers/loadIntlMessages";

const Transactions: NextPage = () => {
  return <Fragment></Fragment>;
};

export async function getStaticProps(ctx: any) {
  return {
    props: {
      intlMessages: await loadIntlMessages(ctx),
    },
  };
}

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Transactions);
