/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

import banner from '../../public/EMotional_Banner.svg';
import Link from "next/link";
import type { Session } from "next-auth";
import { useState } from "react";

const EMotionalNavbar = () => {
    const {data: session, status: auth} = useSession();
    
    return(
        <>
            <nav className="h-14 w-full shadow bg-[#263577] absolute top-0 flex flex-row font-mono">
                <Image src={banner} width={112} height={56} alt="EMotional banner"/>
                <div id="SPACER" className="flex-grow" />
                {auth != "authenticated" ? UnauthenticatedFragment() : AuthenticatedFragment(session)}
            </nav>
        </>
    );
};

const UnauthenticatedFragment = () => {
    useState();
    return(
        <>
            <Link className="flex flex-col h-full w-20 bg-[#5865F2] hover:bg-[#454FBF] items-center justify-center shadow text-slate-100" href="https://discord.com/api/oauth2/authorize?client_id=1077023280759836782&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fcallback%2Fdiscord&response_type=code&scope=identify%20email">Sign in</Link>
        </>
    );
};

const AuthenticatedFragment = (session: Session) => {
    const [text, setText] = useState(session.user.name);
    const userImage = session?.user.image != null ? session?.user.image : "https://pfps.gg/assets/pfps/4909-default-discord.png";

    return(
        <>
            <Link href="" className="flex place-content-evenly flex-row h-full bg-[#5865F2] hover:bg-red-400 items-center justify-center shadow text-slate-100 transition-all" onClick={()=>{void signOut({callbackUrl: '/'})}} onMouseLeave={()=>{setText(session.user.name)}} onMouseOver={()=>{setText("Sign Out?")}}>
                <Image className="m-2 rounded-full" src={userImage} width={50} height={50} alt="User profile picture"/>
                <span className="m-2">{text == null? session.user.name : text}</span>
            </Link>
        </>
    );
};

export default EMotionalNavbar;