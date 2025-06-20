"use client";
"use strict";

import {useEffect, useState} from 'react';
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {MdSearch} from "react-icons/md";
import {FiCpu} from "react-icons/fi";
import {BsDeviceSsdFill, BsGpuCard} from "react-icons/bs";
import {FaMemory} from "react-icons/fa";

import logo from "../../public/images/logos/EZ-Laptop-logo.png";

const BASE_API = "http://localhost:3080";

function LaptopSection({className, children, laptop_data}) {
    const [laptop, setLaptop] = useState(laptop_data);
    const [image, setImage] = useState(BASE_API + laptop_data?.Image);

    return <Link href={"/laptop/" + laptop?._id}>
        <section
            className={"outline-1 rounded-lg bg-[#FBF8EF] p-2 flex flex-col items-center hover:bg-[#B4EBE6] active:bg-[#ccc] " + className}>
            <h2 className='font-medium'>{laptop.Name}</h2>
            <div className="w-full flex items-center gap-4">
                <div className="relative w-1/2 h-[200px]">
                    <Image
                        src={image}
                        alt="laptop image"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 33vw"
                        fill={true}
                        className="object-cover rounded-lg"
                    />
                </div>
                <ul>
                    <li className="flex items-center gap-2">
                        <h3 className='font-medium text-xl'><FiCpu/></h3>
                        <p>{laptop.CPU.match(/i[3579]-\d+[A-Z]*/i) || laptop.CPU.match(/R[3579]-\d+[A-Z]*/i) || laptop.CPU.match(/Ultra\s+[3579]-\d+[A-Z]*/i)}</p>
                    </li>
                    <li className="flex items-center gap-2">
                        <h3 className='font-medium text-xl'><BsGpuCard/></h3>
                        <p>{laptop.GPU.match(/RTX\s+[0-9]*/i) || laptop.GPU.match(/RX\d+[A-Z]*/i) || laptop.GPU.includes("Iris") && "Tích hợp" || laptop.GPU.includes("Arc") && "Tích hợp" || laptop.GPU.includes("UHD") && "Tích hợp"}</p>
                    </li>
                    <li className="flex items-center gap-2">
                        <h3 className='font-medium text-xl'><FaMemory/></h3>
                        <p>{laptop.RAM + 'GB'}</p>
                    </li>
                    <li className="flex items-center gap-2">
                        <h3 className='font-medium text-xl'><BsDeviceSsdFill/></h3>
                        <p>{laptop.SSD >= 1000 ? laptop.SSD / 1000 + 'TB' : laptop.SSD + 'GB'}</p>
                    </li>
                    <li className="font-bold text-[#FFB433] text-2xl">
                        {new Intl.NumberFormat("vi-VN", {
                            style: 'currency',
                            currency: 'VND'
                        }).format(laptop.Price)}
                    </li>
                </ul>
            </div>
            {children}
        </section>
    </Link>
}

function HomePage() {
    const router = useRouter();

    const [isAdmin, setIsAdmin] = useState(false);
    const [avatar, setAvatar] = useState(`${BASE_API}/public/images/avatars/EmptyAvatar.png`);
    const [avatarMenu, setAvatarMenu] = useState(false);
    const [laptops, setlaptops] = useState([]);
    const [searchedLaptops, setSearchedLaptops] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    async function getAllLaptops() {
        try {
            await fetch(`${BASE_API}/laptop/list`, {
                credentials: 'include'
            })
                .then(res => res.json())
                .then(data => {
                    setlaptops(data);
                    setSearchedLaptops(data);
                });
        } catch (err) {
            console.log(`Can't get all laptops! Error: ${err.message}`);
        }
    }

    async function getUserData() {
        try {
            await fetch(`${BASE_API}/account/personal`, {
                credentials: 'include'
            })
                .then(res => res.json())
                .then(data => {
                    if (!data.message) {
                        setIsLoggedIn(true);
                        setAvatar(BASE_API + data?.Avatar);
                        if (data.Role?.Name === 'Admin') {
                            setIsAdmin(!isAdmin);
                        }
                    }
                });
        } catch (err) {
            console.log(`Can't get user data! Error: ${err.message}`);
        }
    }

    useEffect(() => {
        getAllLaptops();
        getUserData();
    }, [])

    async function logout() {
        try {
            await fetch(`${BASE_API}/account/logout`, {
                credentials: 'include'
            }).then(res => {
                setIsLoggedIn(false);
                alert("Đăng xuất thành công. ^-^");
            })
        } catch (err) {
            console.log(`Can't log out! Error: ${err.message}`);
        }
    }

    function search(formData) {
        setSearchedLaptops(laptops.filter(laptop => laptop.Name.toLowerCase().includes(formData.get('Name').toLowerCase())));
    }

    return <div>
        <nav className="p-4 bg-[#80CBC4] flex flex-col items-center">
            <div className="w-full flex items-center gap-2">
                <Image
                    src={logo}
                    alt="EZ-Laptop logo"
                    priority={true}
                    sizes="(max-width: 768px) 200px, (max-width: 1200px) 200px, 200px"
                    className="w-[200px] h-auto"
                />
                <form action={search} className="w-full outline-1 rounded-lg bg-[#FBF8EF] flex items-center">
                    <input type="text" name='Name' placeholder="Tìm kiếm laptop?"
                           className="w-full border-none rounded-l-lg p-2"/>
                    <button className="p-2 text-2xl"><MdSearch/></button>
                </form>
                {isLoggedIn ? <div className="relative min-w-[160px] flex flex-col items-center">
                        <div className="relative size-[60px]">
                            <Image
                                onClick={() => setAvatarMenu(!avatarMenu)}
                                src={avatar}
                                alt="avatar"
                                fill={true}
                                sizes="(max-width: 768px) 60px, (max-width: 1200px) 60px, 60px"
                                className="object-cover rounded-full"
                            />
                        </div>
                        {avatarMenu && <ul className="absolute top-[68px] rounded-lg bg-[#FBF8EF] text-sm cursor-pointer">
                            {isAdmin && <li className="px-2 py-1 underline text-center"><Link href="/admin">Quản lý</Link></li>}
                            {isLoggedIn &&
                                <li className="border-b-1 px-2 py-1 text-center underline"><Link href="/account/profile">Cá
                                    nhân</Link></li>}
                            <li onClick={logout} className="px-2 py-1 underline">Đăng xuất</li>
                        </ul>}
                    </div> :
                    <Link href="/account/login"
                          className="text-[#FBF8EF] underline hover:text-[#FFB433] hover:font-medium">Đăng
                        nhập</Link>}
            </div>

            <ul className="flex items-center gap-2">
                <li
                    onClick={() => {
                        setSearchedLaptops(laptops);
                    }}
                    className="p-2 text-[#FBF8EF] font-bold cursor-pointer hover:text-[#FFB433]"
                >Tất cả
                </li>
                <li className='text-[#FBF8EF]'>|</li>
                <li
                    onClick={() => {
                        setSearchedLaptops(laptops.filter(laptop => laptop.GPU.includes('RTX') || laptop.GPU.includes('RX')));
                    }}
                    className="p-2 text-[#FBF8EF] font-bold cursor-pointer hover:text-[#FFB433]"
                >Laptop chơi game
                </li>
                <li className='text-[#FBF8EF]'>|</li>
                <li
                    onClick={() => {
                        setSearchedLaptops(laptops.filter(laptop => !laptop.GPU.includes('RTX') && !laptop.GPU.includes('RX')));
                    }}
                    className="p-2 text-[#FBF8EF] font-bold cursor-pointer hover:text-[#FFB433]"
                >Laptop văn phòng
                </li>
                <li className='text-[#FBF8EF]'>|</li>
                <li
                    onClick={() => {
                        setSearchedLaptops(laptops.filter(laptop => laptop.Name.toLowerCase().includes('asus')));
                    }}
                    className="p-2 text-[#FBF8EF] font-bold cursor-pointer hover:text-[#FFB433]"
                >ASUS
                </li>
                <li className='text-[#FBF8EF]'>|</li>
                <li
                    onClick={() => {
                        setSearchedLaptops(laptops.filter(laptop => laptop.Name.toLowerCase().includes('dell')));
                    }}
                    className="p-2 text-[#FBF8EF] font-bold cursor-pointer hover:text-[#FFB433]"
                >DELL
                </li>
                <li className='text-[#FBF8EF]'>|</li>
                <li
                    onClick={() => {
                        setSearchedLaptops(laptops.filter(laptop => laptop.Name.toLowerCase().includes('lenovo')));
                    }}
                    className="p-2 text-[#FBF8EF] font-bold cursor-pointer hover:text-[#FFB433]"
                >LENOVO
                </li>
                <li className='text-[#FBF8EF]'>|</li>
                <li
                    onClick={() => {
                        setSearchedLaptops(laptops.filter(laptop => laptop.Name.toLowerCase().includes('msi')));
                    }}
                    className="p-2 text-[#FBF8EF] font-bold cursor-pointer hover:text-[#FFB433]"
                >MSI
                </li>
                <li className='text-[#FBF8EF]'>|</li>
                <li
                    onClick={() => {
                        setSearchedLaptops(laptops.filter(laptop => laptop.Name.toLowerCase().includes('gigabyte')));
                    }}
                    className="p-2 text-[#FBF8EF] font-bold cursor-pointer hover:text-[#FFB433]"
                >GIGABYTE
                </li>
            </ul>
        </nav>
        <div className="bg-[#ccc]/50 p-4 grid grid-cols-4 gap-4">
            {searchedLaptops.map((laptop, index) => <LaptopSection key={laptop._id} laptop_data={laptop}/>)}
        </div>
    </div>
}

export default HomePage;