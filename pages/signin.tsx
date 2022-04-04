import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import {
  getAuth,
  signInWithPopup,
  linkWithPopup,
  setPersistence,
  browserLocalPersistence,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { useIntl } from "react-intl";
import firebaseApp from "lib/firebase";
import Button from "components/Button";

const Signup: NextPage = () => {
  const intl = useIntl();
  const router = useRouter();
  const auth = getAuth(firebaseApp);

  const authPersistence = async () => {
    try {
      await setPersistence(auth, browserLocalPersistence);
    } catch (error) {
      console.error(error);
    }
  };

  const onGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await authPersistence();
      await signInWithPopup(auth, provider);
      router.push("/");
    } catch (error: any) {
      toast.error(error.message);
      if (error.code === "auth/account-exists-with-different-credential") {
        console.error(error.code);
      } else {
        console.error(error);
      }
    }
  };

  const onFacebookLogin = async () => {
    const provider = new FacebookAuthProvider();
    try {
      await authPersistence();
      const user = await signInWithPopup(auth, provider);
      router.push("/");
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

export default Signup;
