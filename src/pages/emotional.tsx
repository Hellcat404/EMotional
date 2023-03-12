import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { api } from "~/utils/api";

import Head from "next/head";
import { useEffect, useState } from "react";
import EMotionalNavbar from "./navigation";
import type { Session } from "next-auth";
import type {StaticImageData} from "next/image";
import Image from "next/image";

import vhappyImg from '../../public/VeryHappy.png';
import happyImg from '../../public/Happy.png';
import neutralImg from '../../public/Neutral.png';
import sadImg from '../../public/Sad.png';
import vsadImg from '../../public/VerySad.png';
import Link from "next/link";

const emotionImgs: StaticImageData[] = [vsadImg, sadImg, neutralImg, happyImg, vhappyImg];

const EmotionSelector = (session: Session) => {
    const createEntry = api.entry.createEntry.useMutation();  

    const addEntry = (session: Session, emotion: number) => {
        changeSubmitted(true);
        createEntry.mutate({emotion: emotion, userID: session.user.id});
    };

    const resetSubmission = () => {
        changeSelection(2);
        changeSubmitted(false);
    };

    const [selection, changeSelection] = useState(2);
    const [submitted, changeSubmitted] = useState(false);

    if(submitted){
        return(
            <>
                <div className="flex flex-col content-center justify-center items-center">
                    <span className="font-mono font-semibold text-xl text-slate-900">Submitted emotion</span>
                    <Image src={emotionImgs[selection]} width={88} height={88} alt="Selected emotion"/>
                    <button className={"m-3 p-3 border rounded bg-[#58f258] border-[#45bf45] shadow text-slate-900 hover:scale-110 transition-all"} onClick={()=>{resetSubmission()}}>Submit new Emotion</button>
                    <Link className={"m-3 p-3 border rounded bg-[#ffcc4dff] border-[#c49d3a] shadow text-slate-900 hover:scale-110 transition-all"} href="/timeline">View Your Timeline</Link>
                </div>
            </>
        );
    }else{
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
                    <button className={"m-3 p-3 border rounded bg-[#58f258] border-[#45bf45] shadow text-slate-900 hover:scale-110 transition-all"} onClick={()=>{void addEntry(session, selection)}}>Submit</button>
                    <Link className={"m-3 p-3 border rounded bg-[#ffcc4dff] border-[#c49d3a] shadow text-slate-900 hover:scale-110 transition-all"} href="/timeline">View Your Timeline</Link>
                </div>
            </>
        );
    }
};

const EMotional: NextPage = () => {
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
                {EmotionSelector(session)}
            </main>
        </>
    );
};

export default EMotional;