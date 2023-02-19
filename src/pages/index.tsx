import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>EMotional</title>
        <meta name="description" content="EMotional - Online emotion tracker" />
        <link rel="icon" href="/favicon.gif" type="image/gif" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#4d6dffff]">
        <img className="min-w-[327px] min-h-[189px] max-w-[700px] max-h-[300px] w-1/3 h-1/3 object-cover" src="EMotional_Banner.svg" alt="EMotional banner" />
      </main>
    </>
  );
};

export default Home;
