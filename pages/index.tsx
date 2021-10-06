import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <main>
      <Link href="/api/auth/login">
        <a className="w-32 flex items-center justify-center rounded-md bg-black text-white">
          Login
        </a>
      </Link>
    </main>
  );
};

export default Home;
