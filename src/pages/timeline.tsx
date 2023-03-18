import { type NextPage } from "next";
import { type Session } from "next-auth";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import EMotionalNavbar from "./navigation";
import { api } from "~/utils/api";
import { type StaticImageData } from "next/image";
import Image from "next/image";

import vhappyImg from '../../public/VeryHappy.png';
import happyImg from '../../public/Happy.png';
import neutralImg from '../../public/Neutral.png';
import sadImg from '../../public/Sad.png';
import vsadImg from '../../public/VerySad.png';

const emotionImgs: StaticImageData[] = [vsadImg, sadImg, neutralImg, happyImg, vhappyImg];

const TimelineDisplay = (session: Session) => {
    const getEntries = api.entry.getEntries.useQuery({userID: session.user.id});

    let prevDate: Date | null = null;
    return(
        <>
            <div className="flex flex-row w-screen h-screen overflow-clip">
        {
            getEntries.data?.map((value, index) => {
                const date: Date = value.timestamp;

                let count = 0;
                let prevEmotion = -1;

                if(prevDate == null || prevDate.getFullYear() < date.getFullYear() || prevDate.getMonth() < date.getMonth() || prevDate.getDate() < date.getDate()){
                    prevDate = date;
                    return(
                        <div key={index} className="flex flex-col-reverse text-center flex-grow m-0.5 mt-96 mb-40 bg-[#ff854ddd] saturate-50 hover:bg-[#ff854dff] hover:z-50 hover:saturate-100 transition-all">
                            <span className="mb-2">{date.getDate()}/{date.getMonth()+1}/{date.getFullYear()}</span>
                            <div className="w-full h-1 bg-slate-800" />
                            {
                                getEntries.data?.map((value, index) => {
                                    if(value.timestamp.getFullYear() != date.getFullYear() || value.timestamp.getMonth() != date.getMonth() || value.timestamp.getDate() != date.getDate()){
                                        count = 0;
                                        return;
                                    }
                                    
                                    if(prevEmotion == value.emotion){
                                        return;
                                    }

                                    prevEmotion = value.emotion;
                                    count++;
                                    if(count-1 < 5){
                                        return(
                                            <Image className="m-2 ml-auto mr-auto" key={index} src={emotionImgs[value.emotion]} width={48} height={48} alt={"Entered emotion"} />
                                        );  
                                    }else
                                        return;
                                })
                            }
                        </div>
                    );
                }
                
            })
        }
            </div>
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