"use client";
"use strict";

import {useState, useEffect, useRef} from 'react';
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {BsGpuCard} from "react-icons/bs";
import {MdAssignmentTurnedIn, MdLogout, MdLaptop, MdPerson} from "react-icons/md";
import {FiCpu} from "react-icons/fi";

import Logo from "../../../public/images/logos/EZ-Laptop-logo.png";

const BASE_API = "http://localhost:3080";

function TabHeader({onClick, className, children, isDisabled}) {
    return <li onClick={onClick}
               className={"md:min-w-[160px] lg:min-w-[200px] border-t-2 md:border-t-0 md:border-b-2 border-r-2 md:border-r-0 rounded-t-lg md:rounded-tr-none md:rounded-bl-lg px-2 md:px-4 lg:px-8 py-1 md:py-4 flex items-center gap-1 " + className}
               disabled={isDisabled}>{children}</li>
}

function TabMain({children, className}) {
    return <main
        className={"w-full p-2 md:p-4 rounded-tr-lg md:rounded-tl-lg rounded-b-lg bg-white shadow-md " + className}>{children}</main>
}

function AdminPage() {
    const router = useRouter();

    const navRef = useRef(null);

    const [avatar, setAvatar] = useState(`${BASE_API}/public/images/avatars/EmptyAvatar.png`);
    const [isLogout, setIsLogout] = useState(false);
    const [tab, setTab] = useState('AccountTab');
    const [user, setUser] = useState({});

    async function getUserData(signal) {
        try {
            await fetch(`${BASE_API}/account/personal`, {
                credentials: 'include',
                signal
            })
                .then(res => res.json())
                .then(data => {
                    if (data?.message || data?.Role?.Name !== 'Admin') {
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
    }, []);

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
        const Tabs = navRef.current.children;
        for (let i = 0; i < Tabs.length; i++) {
            if (Tabs[i].classList.contains('bg-white')) {
                Tabs[i].classList.toggle('bg-white');
                Tabs[i].classList.toggle('bg-[#B4EBE6]');
                Tabs[i].classList.toggle('cursor-pointer');
                Tabs[i].classList.toggle('hover:bg-[#80CBC4]');
                Tabs[i].classList.toggle('active:bg-[#FFB433]');
            }
        }

        //remove effect for current tab
        e.currentTarget.classList.toggle('bg-[#B4EBE6]');
        e.currentTarget.classList.toggle('cursor-pointer');
        e.currentTarget.classList.toggle('hover:bg-[#80CBC4]');
        e.currentTarget.classList.toggle('active:bg-[#FFB433]');
        //add new effect for current tab
        e.currentTarget.classList.toggle('bg-white');
    }

    return <div className="h-screen bg-[#ccc]/50">
        {/*navigation bar*/}
        <nav className="relative p-2 md:px-4 flex bg-[#80CBC4]">
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
                    alt={user?.Username + "'s avatar"}
                    fill={true}
                    sizes="(max-width: 768px) 48px, (max-width: 1200px) 60px, 60px"
                    className="object-cover rounded-full"
                />
                {isLogout && <button
                    onClick={handleLogout}
                    className="absolute top-[52px] md:top-[64px] -right-[24px] md:-right-[24px] w-max outline-1 p-1 bg-[#FBF8EF] rounded-lg flex items-center gap-1 cursor-pointer hover:bg-black hover:text-white active:bg-[#ccc]">Đăng
                    xuất<MdLogout/></button>}
            </div>
        </nav>
        {/*navigation tab*/}
        <div className="mx-2 md:mx-4 mt-2 flex flex-col md:flex-row">
            <ul className="flex md:flex-col gap-2 md:gap-4" ref={navRef}>
                <TabHeader onClick={e => {
                    setTab('AccountTab');
                    onChangeTab(e);
                }} className="md:mt-4 bg-white" isDisabled={tab === 'AccountTab'}><MdPerson
                    className='text-lg md:text-xl'/><h2
                    className="hidden md:inline">Tài khoản</h2></TabHeader>
                <TabHeader onClick={e => {
                    setTab('CPU_Tab');
                    onChangeTab(e);
                }} className="bg-[#B4EBE6] cursor-pointer hover:bg-[#80CBC4] active:bg-[#FFB433]"
                           isDisabled={tab === 'CPU_Tab'}><FiCpu
                    className='text-lg md:text-xl'/><h2 className="hidden md:inline">CPU</h2></TabHeader>
                <TabHeader onClick={e => {
                    setTab('GPU_Tab');
                    onChangeTab(e);
                }} className="bg-[#B4EBE6] cursor-pointer hover:bg-[#80CBC4] active:bg-[#FFB433]"
                           isDisabled={tab === 'GPU_Tab'}><BsGpuCard
                    className='text-lg md:text-xl'/><h2 className="hidden md:inline">GPU</h2></TabHeader>
                <TabHeader onClick={e => {
                    setTab('LaptopTab');
                    onChangeTab(e);
                }} className="bg-[#B4EBE6] cursor-pointer hover:bg-[#80CBC4] active:bg-[#FFB433]"
                           isDisabled={tab === 'LaptopTab'}><MdLaptop
                    className='text-lg md:text-xl'/><h2 className="hidden md:inline">Laptop</h2></TabHeader>
                <TabHeader onClick={e => {
                    setTab('OrderTab');
                    onChangeTab(e);
                }}
                           className="bg-[#B4EBE6] cursor-pointer hover:bg-[#80CBC4] active:bg-[#FFB433]"
                           isDisabled={tab === 'OrderTab'}><MdAssignmentTurnedIn
                    className='text-lg md:text-xl'/><h2 className="hidden md:inline">Đơn hàng</h2></TabHeader>
            </ul>
            {tab === 'AccountTab' && <TabMain className="h-[500px]">Quản lý tài khoản</TabMain>}
            {tab === 'CPU_Tab' && <TabMain className="h-[500px]">Quản lý CPU</TabMain>}
            {tab === 'GPU_Tab' && <TabMain className="h-[500px]">Quản lý GPU</TabMain>}
            {tab === 'LaptopTab' && <TabMain className="h-[500px]">Quản lý Laptop</TabMain>}
            {tab === 'OrderTab' && <TabMain className="h-[500px]">Quản lý đơn hàng</TabMain>}
        </div>
    </div>
}

export default AdminPage;