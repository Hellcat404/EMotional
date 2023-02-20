import { type NextPage } from "next";
import { useSession } from "next-auth/react";

import Head from "next/head";

import EMotionalNavbar from "./navigation";

const EMotional: NextPage = () => {
    const {data: session, status: auth} = useSession();

    return(
        <>
            <Head>
                <title>EMotional</title>
                <meta name="description" content="EMotional - Online emotion tracker" />
                <link rel="icon" href="/favicon.gif" type="image/gif" />
            </Head>
            <main className="flex min-h-screen flex-col items-center justify-center bg-[#4d6dffff]">
                <EMotionalNavbar />
            </main>
        </>
    );
};

export default EMotional;