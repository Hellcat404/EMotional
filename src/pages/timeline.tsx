import { type NextPage } from "next";
import { type Session } from "next-auth";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import EMotionalNavbar from "./navigation";
import { api } from "~/utils/api";


const TimelineDisplay = (session: Session) => {
    const getEntries = api.entry.getEntries.useQuery({userID: session.user.id}, {enabled: false});

    return(
        <>
        {
            getEntries.data?.map((value) => {
                
                return(
                    <>

                    </>
                );
            })
        }
        </>
    );
};

const Timeline: NextPage = () => {
    const router = useRouter();
    const {data: session} = useSession();

    useEffect(()=>{
        if(!session)
        void router.push("/");
    });

    if(!session)
        return(<></>);

    return(
        <>
            <Head>
                <title>EMotional</title>
                <meta name="description" content="EMotional - Online emotion tracker" />
                <link rel="icon" href="/favicon.gif" type="image/gif" />
            </Head>
            <main className="flex min-h-screen flex-col items-center justify-center bg-[#4d6dffff]">
                <EMotionalNavbar />
                {TimelineDisplay(session)}
            </main>
        </>
    );
};

export default Timeline;