import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { signOut, useSession } from "next-auth/react"

const SignInButton = () => {
  return(
    <Link className="p-3 border rounded bg-[#5865F2] border-[#454FBF] shadow text-slate-100 hover:scale-110 transition-all" href="https://discord.com/api/oauth2/authorize?client_id=1077023280759836782&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fcallback%2Fdiscord&response_type=code&scope=identify%20email">Sign in with Discord</Link>
  );
};

const SignOutButton = () => {
  return(
    <Link className="p-3 border rounded bg-[#5865F2] border-[#454FBF] shadow text-slate-100 hover:scale-110 transition-all" href="#" onClick={() => signOut()}>Sign out</Link>
  );
};

const Home: NextPage = () => {
  const {data: session, status: auth} = useSession();

  return (
    <>
      <Head>
        <title>EMotional</title>
        <meta name="description" content="EMotional - Online emotion tracker" />
        <link rel="icon" href="/favicon.gif" type="image/gif" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#4d6dffff]">
        <img className="min-w-[327px] min-h-[189px] max-w-[700px] max-h-[300px] w-1/3 h-1/3 object-cover" src="EMotional_Banner.svg" alt="EMotional banner" />
        {auth != "authenticated" ? SignInButton() : SignOutButton()}
        
      </main>
    </>
  );
};

export default Home;
