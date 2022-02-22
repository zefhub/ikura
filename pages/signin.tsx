import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  linkWithPopup,
  setPersistence,
  browserLocalPersistence,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { useIntl } from "react-intl";
import firebaseApp from "lib/firebase";
import SigninForm, { SigninFormValues } from "forms/SigninForm";

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

  const onLogin = async (values: SigninFormValues) => {
    try {
      await authPersistence();
      await await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      router.push("/");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const onGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await authPersistence();
      await signInWithPopup(auth, provider);
      router.push("/");
    } catch (error: any) {
      console.log(error.message);
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
    }
  };

  return (
    <div className="container" style={{ height: "100vh" }}>
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              <div className="row">
                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                <div className="col-lg-6">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">
                        {intl.formatMessage({
                          defaultMessage: "Welcome Back!",
                          description: "signup page title",
                        })}
                      </h1>
                    </div>
                    <SigninForm onSubmit={onLogin} />
                    <hr />
                    <button
                      type="button"
                      className="btn btn-google btn-user btn-block"
                      onClick={onGoogleLogin}
                    >
                      <i className="fab fa-google fa-fw mr-1"></i>
                      {intl.formatMessage({
                        defaultMessage: "Login with Google",
                        description: "login with google button",
                      })}
                    </button>
                    <button
                      type="button"
                      className="btn btn-facebook btn-user btn-block"
                      onClick={onFacebookLogin}
                    >
                      <i className="fab fa-facebook-f fa-fw mr-1"></i>
                      {intl.formatMessage({
                        defaultMessage: "Login with Facebook",
                        description: "login with facebook button",
                      })}
                    </button>
                    <hr />
                    <div className="text-center">
                      <Link href="/forgot-password">
                        <a className="small">
                          {intl.formatMessage({
                            defaultMessage: "Forgot Password?",
                            description: "forgot password link",
                          })}
                        </a>
                      </Link>
                    </div>
                    <div className="text-center">
                      <Link href="/signup">
                        <a className="small">Create an Account!</a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
