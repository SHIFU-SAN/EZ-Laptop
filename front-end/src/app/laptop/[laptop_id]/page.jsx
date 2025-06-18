"use client";
"use strict";

import {useState, useEffect} from 'react';
import Image from "next/image";
import {useParams, useRouter} from "next/navigation";

import logo from "../../../../public/images/logos/EZ-Laptop-logo.png";
import Link from "next/link";
import Logo from "../../../../public/images/logos/EZ-Laptop-logo.png";

const BASE_API = "http://localhost:3080";

function LaptopPage() {
    const params = useParams();
    const router = useRouter();

    const [laptop, setLaptop] = useState({});
    const [image, setImage] = useState(`${BASE_API}/public/images/NoImageAvailable.png`);

    async function getLaptopData(signal) {
        try {
            await fetch(`${BASE_API}/laptop/${params.laptop_id}`, {
                credentials: 'include',
                signal
            })
                .then(res => res.json())
                .then(data => {
                    setLaptop(data);
                    setImage(BASE_API + data.Image);
                });
        } catch (err) {
            console.error(`Can't get laptop data! Error: ${err.message}`)
        }
    }

    useEffect(() => {
        const abortController = new AbortController();
        getLaptopData(abortController.signal);
        return () => abortController.abort();
    }, [])

    async function order() {
        try {
            await fetch(`${BASE_API}/account/personal`, {
                credentials: 'include'
            })
                .then(res => res.json())
                .then(data => {
                    if (data?.message) {
                        router.replace('/account/login');
                    } else {
                        router.replace(`/order?laptop_id=${params?.laptop_id}`)
                    }
                });
        } catch (err) {
            console.error(`Can't get user data! Error: ${err.message}`);
        }
    }

    return <div className="bg-[#ccc]/50">
        <div className="bg-[#80CBC4]">
            <Link href="/" className='cursor-pointer'>
                <Image
                    src={Logo}
                    alt="EZ-Laptop logo"
                    priority={true}
                    className="w-[160px] md:w-[200px] h-auto"
                />
            </Link>
        </div>
        <div className="m-4 rounded-lg p-2 pb-20 md:p-4 lg:p-8 bg-[#FBF8EF] flex flex-col md:flex-row gap-4">
            <div className="w-full flex flex-col items-center gap-2">
                <h1 className="font-bold">{laptop?.Name}</h1>
                <div className="relative size-[320px] lg:size-[400px]">
                    <Image
                        src={image}
                        alt="laptop image"
                        fill={true}
                        sizes="(max-width: 768px) 200px, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover rounded-lg"
                    />
                </div>
                <p className=" font-bold text-[#80CBC4] text-2xl">{new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND'
                }).format(laptop.Price)}</p>
                <button onClick={order} className="w-2/3 lg:w-1/4 outline-1 rounded-lg py-2 bg-[#FFB433] font-bold text-xl cursor-pointer hover:bg-[#B4EBE6] hover:text-white active:bg-[#ccc]">Mua
                </button>
            </div>
            <ul className="w-full rounded-lg bg-white flex flex-col gap-2">
                <h2 className="p-2 rounded-t-lg bg-[#B4EBE6] font-bold">Thông số kỹ thuật:</h2>
                <li className="p-2 flex items-center gap-2">
                    <h3 className='font-bold'>CPU:</h3>
                    <p>{laptop.CPU}</p>
                </li>
                <li className="bg-[#ccc]/50 p-2 flex items-center gap-2">
                    <h3 className='font-bold'>GPU:</h3>
                    <p>{laptop.GPU}</p>
                </li>
                <li className="p-2 flex items-center gap-2">
                    <h3 className='font-bold'>RAM:</h3>
                    <p>{laptop.RAM} GB</p>
                </li>
                <li className="bg-[#ccc]/50 p-2 flex items-center gap-2">
                    <h3 className='font-bold'>SSD:</h3>
                    <p>{laptop.SSD < 1000 ? laptop.SSD + ' GB' : laptop.SSD / 1000 + ' TB'}</p>
                </li>
                <li className="p-2 flex items-center gap-2">
                    <h3 className='font-bold'>Màn hình:</h3>
                    <p>{laptop.Screen}</p>
                </li>

            </ul>
        </div>
    </div>
}

export default LaptopPage;