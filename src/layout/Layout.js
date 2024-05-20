import Head from "next/head";
import Header from "./Header";
import { useAuth } from "@/contexts";
import { useEffect } from "react";
import { ROUTER } from "@/constants";

const AppsLayout = ({ children, isPrivate = true }) => {
  const { isLogged } = useAuth();

  useEffect(() => {
    if (isPrivate) {
      const email = localStorage.getItem("email");
      if (!email && !isLogged) window.location = ROUTER.LOGIN;
    }
  }, [isPrivate, isLogged]);

  return (
    <div>
      <Head>
        <title>Arrange Seat</title>
        <meta name="description" content="Arrange Seat" />
      </Head>
      <Header />
      <main className="pb-20">{children}</main>
    </div>
  );
};

export default AppsLayout;
