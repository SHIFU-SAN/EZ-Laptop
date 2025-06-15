"use client";
"use strict";

import {useState, useEffect, useRef} from 'react';
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {MdShoppingCart, MdContentPaste, MdLogout, MdPerson} from "react-icons/md";

import Logo from "../../../../public/images/logos/EZ-Laptop-logo.png";
import valueProcessor from "next/dist/build/webpack/loaders/resolve-url-loader/lib/value-processor.js";

const BASE_API = "http://localhost:3080";

function TabHeader({onClick, className, children, disabled}) {
    return <li onClick={onClick}
               className={"md:min-w-[160px] lg:min-w-[200px] border-t-2 md:border-t-0 md:border-b-2 border-r-2 md:border-r-0 rounded-t-lg md:rounded-tr-none md:rounded-bl-lg px-2 md:px-4 lg:px-8 py-1 md:py-4 flex items-center gap-1 " + className}
               disabled={disabled}>
        {children}
    </li>
}

function TabMain({children, className}) {
    return <main
        className={"w-full h-[500px] p-2 md:p-4 rounded-tr-lg md:rounded-tl-lg rounded-b-lg bg-white shadow-md " + className}>{children}</main>
}

function ProfilePage() {
    const router = useRouter();

    const navRef = useRef(null);

    const [avatar, setAvatar] = useState("http://localhost:3080/images/avatars/EmptyAvatar.png");
    const [isLogout, setIsLogout] = useState(false);
    const [tab, setTab] = useState('InfoTab');
    const [user, setUser] = useState({});

    async function getUserData(signal) {
        try {
            await fetch(`${BASE_API}/account/personal`, {
                credentials: 'include',
                signal
            })
                .then(res => res.json())
                .then(data => {
                    if (data?.message) {
                        router.replace('/');
                    } else {
                        setUser(data);
                        setAvatar(BASE_API + data?.Avatar);
                    }
                });
        } catch (err) {
            console.error(`Can't get user data! Error: ${err.message}`);
        }
    }

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        getUserData(signal);
        return () => abortController.abort();
    }, [])

    async function handleLogout() {
        try {
            await fetch(`${BASE_API}/account/logout`, {
                credentials: 'include'
            })
                .then(res => res.json())
                .then(data => {
                    if (data?.message) {
                        router.replace('/');
                    }
                });
        } catch (err) {
            console.error(`Can't logout! Error: ${err.message}`);
        }
    }

    function onChangeTab(e) {
        // find selected tab
        const [Index, SelectedTab] = Object.entries(navRef.current.children).find(([key, value]) => value.classList.contains('bg-white'));
        SelectedTab.classList.toggle('bg-white'); //remove old background
        // add new effect for selected tab
        SelectedTab.classList.toggle('bg-[#B4EBE6]');
        SelectedTab.classList.toggle('cursor-pointer');
        SelectedTab.classList.toggle('hover:bg-[#80CBC4]');
        SelectedTab.classList.toggle('active:bg-[#FFB433]');

        //remove effect for current tab
        e.target.classList.toggle('bg-[#B4EBE6]');
        e.target.classList.toggle('cursor-pointer');
        e.target.classList.toggle('hover:bg-[#80CBC4]');
        e.target.classList.toggle('active:bg-[#FFB433]');
        //add new effect for current tab
        e.target.classList.toggle('bg-white');
    }

    return <div className="h-screen bg-[#FBF8EF]">
        {/*navigation bar*/}
        <div className="relative p-2 md:px-4 flex bg-[#80CBC4]">
            <div>
                <Link href="/" className='cursor-pointer'>
                    <Image
                        src={Logo}
                        alt="EZ-Laptop logo"
                        priority={true}
                        className="w-[160px] md:w-[200px] h-auto"
                    />
                </Link>
            </div>
            <div className="absolute right-8 md:right-11 w-[48px] md:w-[60px] h-[48px] md:h-[60px]">
                <Image
                    onClick={() => setIsLogout(!isLogout)}
                    src={avatar}
                    alt={user?.Name + "'s avatar"}
                    fill={true}
                    sizes="(max-width: 768px) 48px, (max-width: 1200px) 60px, 60px"
                    className="object-cover rounded-full"
                />
                {isLogout && <button
                    onClick={handleLogout}
                    className="absolute top-[52px] md:top-[64px] -right-[24px] md:-right-[24px] w-max outline-1 p-1 bg-[#FBF8EF] rounded-lg flex items-center gap-1 cursor-pointer hover:bg-black hover:text-white active:bg-[#ccc]">Đăng
                    xuất<MdLogout/></button>}
            </div>
        </div>
        {/*main*/}
        <div className="mx-2 md:mx-4 mt-2 flex flex-col md:flex-row">
            <ul className="flex md:flex-col gap-2 md:gap-4" ref={navRef}>
                <TabHeader onClick={e => {
                    setTab('InfoTab');
                    onChangeTab(e);
                }} className="md:mt-4 bg-white"><MdPerson className='text-lg md:text-xl'/>Thông tin</TabHeader>
                <TabHeader onClick={e => {
                    setTab('CartTab');
                    onChangeTab(e);
                }}
                           className="bg-[#B4EBE6] cursor-pointer hover:bg-[#80CBC4] active:bg-[#FFB433]"><MdShoppingCart
                    className='text-lg md:text-xl'/>Giỏ hàng</TabHeader>
                <TabHeader onClick={e => {
                    setTab('OrderTab');
                    onChangeTab(e);
                }}
                           className="bg-[#B4EBE6] cursor-pointer hover:bg-[#80CBC4] active:bg-[#FFB433]"><MdContentPaste
                    className='text-lg md:text-xl'/>Đơn
                    hàng</TabHeader>
            </ul>
            {tab === 'InfoTab' && <TabMain>Thông tin cá nhân</TabMain>}
            {tab === 'CartTab' && <TabMain>Giỏ hàng</TabMain>}
            {tab === 'OrderTab' && <TabMain>Đơn hàng</TabMain>}
        </div>
    </div>
}

export default ProfilePage;