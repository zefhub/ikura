import "tailwindcss/tailwind.css";
import { UserProvider } from "@auth0/nextjs-auth0";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </UserProvider>
  );
}
export default MyApp;
