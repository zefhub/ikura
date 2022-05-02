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
