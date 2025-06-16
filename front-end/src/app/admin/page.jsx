"use client";
"use strict";

import {useState, useEffect} from 'react';
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {MdLogout} from "react-icons/md";

import Logo from "../../../public/images/logos/EZ-Laptop-logo.png";

const BASE_API = "http://localhost:3080";

function AdminPage() {
    const router = useRouter();

    const [avatar, setAvatar] = useState(`${BASE_API}/public/images/avatars/EmptyAvatar.png`);
    const [isLogout, setIsLogout] = useState(false);
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

    return <div className="h-screen bg-[#ccc]/50">
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
    </div>
}

export default AdminPage;