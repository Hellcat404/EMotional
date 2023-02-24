import { type NextPage } from "next";
import { useSession } from "next-auth/react";

import { api } from "~/utils/api";

import Head from "next/head";
import { useState } from "react";
import EMotionalNavbar from "./navigation";
import type { Session } from "next-auth";
import Image from "next/image";

import vhappyImg from '../../public/VeryHappy.png';
import happyImg from '../../public/Happy.png';
import neutralImg from '../../public/Neutral.png';
import sadImg from '../../public/Sad.png';
import vsadImg from '../../public/VerySad.png';

const EmotionSelector = (session: Session) => {
    const createEntry = api.entry.createEntry.useMutation();

    const addEntry = (session: Session, emotion: number) => {
        createEntry.mutate({emotion: emotion, userID: session.user.id});
    };

    const [selection, changeSelection] = useState(2);

    return(
        <>
            <div className="flex flex-col content-center justify-center items-center">
                <span className="font-mono font-semibold text-xl text-slate-900">Select your emotion</span>
                <div className="flex flex-row">
                    <Image className={"m-2 cursor-pointer" + (selection != 0 ? " saturate-0" : "")} src={vsadImg} width={64} height={64} alt="Very Sad" onClick={()=>{changeSelection(0)}} />
                    <Image className={"m-2 cursor-pointer" + (selection != 1 ? " saturate-0" : "")} src={sadImg} width={64} height={64} alt="Sad" onClick={()=>{changeSelection(1)}} />
                    <Image className={"m-2 cursor-pointer" + (selection != 2 ? " saturate-0" : "")} src={neutralImg} width={64} height={64} alt="Neutral" onClick={()=>{changeSelection(2)}} />
                    <Image className={"m-2 cursor-pointer" + (selection != 3 ? " saturate-0" : "")} src={happyImg} width={64} height={64} alt="Happy" onClick={()=>{changeSelection(3)}} />
                    <Image className={"m-2 cursor-pointer" + (selection != 4 ? " saturate-0" : "")} src={vhappyImg} width={64} height={64} alt="Very Happy" onClick={()=>{changeSelection(4)}} />
                </div>
                <button className="m-3 p-3 border rounded bg-[#58f258] border-[#45bf45] shadow text-slate-900 hover:scale-110 transition-all" onClick={()=>{addEntry(session, selection)}}>Submit</button>
            </div>
        </>
    );
};

const EMotional: NextPage = () => {
    const {data: session} = useSession();

    if(!session)
        throw "No session!";

    return(
        <>
            <Head>
                <title>EMotional</title>
                <meta name="description" content="EMotional - Online emotion tracker" />
                <link rel="icon" href="/favicon.gif" type="image/gif" />
            </Head>
            <main className="flex min-h-screen flex-col items-center justify-center bg-[#4d6dffff]">
                <EMotionalNavbar />
                {EmotionSelector(session)}
            </main>
        </>
    );
};

export default EMotional;