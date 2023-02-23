import { type NextPage } from "next";
import { useSession } from "next-auth/react";

import { api } from "~/utils/api";

import Head from "next/head";
import EMotionalNavbar from "./navigation";
import { Session } from "next-auth";

const EMotional: NextPage = () => {
    const {data: session, status: auth} = useSession();
    const createEntry = api.entry.createEntry.useMutation();

    if(!session)
        throw "No session!";

    const addEntry = (session: Session, emotion: number) => {
        createEntry.mutate({emotion: emotion, userID: session.user.id});
    };

    return(
        <>
            <Head>
                <title>EMotional</title>
                <meta name="description" content="EMotional - Online emotion tracker" />
                <link rel="icon" href="/favicon.gif" type="image/gif" />
            </Head>
            <main className="flex min-h-screen flex-col items-center justify-center bg-[#4d6dffff]">
                <EMotionalNavbar />
                <button onClick={()=>{addEntry(session, 2)}}>CLICK</button>
            </main>
        </>
    );
};

export default EMotional;