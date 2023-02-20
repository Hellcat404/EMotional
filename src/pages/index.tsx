/* eslint-disable @next/next/no-img-element */
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { useSession } from "next-auth/react"

import EMotionalNavbar from "./navigation";

const UnauthenticatedFragment = () => {
  return(
    <>
      <Link className="m-3 p-3 border rounded bg-[#5865F2] border-[#454FBF] shadow text-slate-100 hover:scale-110 transition-all" href="https://discord.com/api/oauth2/authorize?client_id=1077023280759836782&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fcallback%2Fdiscord&response_type=code&scope=identify%20email">Sign in with Discord</Link>
      <Link className="m-3 p-3 border rounded bg-[#58f258] border-[#45bf45] shadow text-slate-900 hover:scale-110 transition-all" href="#">Take a Tour!</Link>
    </>
  );
};

const AuthenticatedFragment = () => {
  return(
    <>
      <Link className="m-3 p-3 border rounded bg-[#58f258] border-[#45bf45] shadow text-slate-900 hover:scale-110 transition-all" href="emotional">Continue to App</Link>
    </>
  );
};

const Home: NextPage = () => {
  const {status: auth} = useSession();

  return (
    <>
      <Head>
        <title>EMotional</title>
        <meta name="description" content="EMotional - Online emotion tracker" />
        <link rel="icon" href="/favicon.gif" type="image/gif" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#4d6dffff]">
        <EMotionalNavbar />
        <img className="min-w-[327px] min-h-[189px] max-w-[700px] max-h-[300px] w-1/3 h-1/3 object-cover" src="EMotional_Banner.svg" alt="EMotional banner" />
        {auth != "authenticated" ? UnauthenticatedFragment() : AuthenticatedFragment()}
        
      </main>
    </>
  );
};

export default Home;
