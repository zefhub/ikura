import type { NextPage, GetServerSidePropsContext } from "next";
import Image from "next/image";
import { signIn, getSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useIntl } from "react-intl";
import Button from "components/Button";

const Signup: NextPage = () => {
  const intl = useIntl();

  const onGoogleLogin = async () => {
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const onFacebookLogin = async () => {
    try {
      await signIn("facebook", { callbackUrl: "/" });
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center">
      <div className="mt-12">
        <Image src="/img/logo.png" alt="logo" width={50} height={50} />
      </div>
      <h1 className="mt-4 text-xl">
        {intl.formatMessage({
          defaultMessage: "Personal Finance",
          description: "signin tag-line",
        })}
      </h1>
      <div className="mt-32 flex flex-col">
        <Button type="submit" onClick={onGoogleLogin} className="bg-white">
          <div className="flex flex-row items-center">
            <Image
              src="/img/google-logo.png"
              alt="google logo"
              width={32}
              height={32}
            />
            <span className="ml-3">
              {intl.formatMessage({ defaultMessage: "Sign in with Google" })}
            </span>
          </div>
        </Button>
        <Button
          type="submit"
          onClick={onFacebookLogin}
          className="bg-white mt-6"
        >
          <div className="flex flex-row items-center">
            <Image
              src="/img/facebook-logo.png"
              alt="facebook logo"
              width={32}
              height={32}
            />
            <span className="ml-3">
              {intl.formatMessage({ defaultMessage: "Sign in with Facebook" })}
            </span>
          </div>
        </Button>
      </div>
    </div>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getSession(ctx);

  if (session?.user) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

export default Signup;
