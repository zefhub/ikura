import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <main>
      <a
        href="/api/auth/login?returnTo=/dashboard"
        className="w-32 flex items-center justify-center rounded-md bg-black text-white"
      >
        Login
      </a>
    </main>
  );
};

export default Home;
