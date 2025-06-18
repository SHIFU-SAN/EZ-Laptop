"use client";
"use strict";

import {useEffect, useState} from 'react';
import Image from "next/image";
import {useSearchParams, useRouter} from "next/navigation";

const BASE_API = "http://localhost:3080";

function OrderPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [image, setImage] = useState("http://localhost:3080/public/images/NoImageAvailable.png");
    const [laptop, setLaptop] = useState({});
    const [user, setUser] = useState({});

    async function checkLoggedIn() {
        try {
            await fetch(`${BASE_API}/account/personal`, {
                credentials: 'include'
            })
                .then(res => res.json())
                .then(data => {
                    if (data?.message) {
                        router.replace('/');
                    } else {
                        setUser(data);
                    }
                });
        } catch (err) {
            console.error(`Can't get user data! Error: ${err.message}`);
        }
    }

    async function getLaptop() {
        try {
            await fetch(`${BASE_API}/laptop/${searchParams.get('laptop_id')}`)
                .then(res => res.json())
                .then(data => {
                    setLaptop(data);
                    setImage(BASE_API + data?.Image);
                })
        } catch (err) {
            console.error(`Can't get laptop! Error: ${err.message}`);
        }
    }

    useEffect(() => {
        checkLoggedIn();
        getLaptop();
    }, [])

    async function order(formData) {
        try {
            console.log("order");
        } catch (err) {
            console.log(`Can't order laptop! Error: ${err.message}`);
        }
    }

    return <div className="h-screen bg-[#80CBC4] flex flex-col items-center justify-center">
        <div className="rounded-lg p-2 pb-8 md:p-4 md:pb-8 lg:p-8 bg-[#FBF8EF] flex flex-col gap-4">
            <div className="flex items-center gap-2">
                <div className="relative size-[80px]">
                    <Image
                        src={image}
                        alt="laptop image"
                        fill={true}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover rounded-full"
                    />
                </div>
                <div>
                    <h1 className="font-bold">{laptop?.Name}</h1>
                    <p className=" font-bold text-red-500">{new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                    }).format(laptop.Price)}</p>
                </div>
            </div>
            <h2 className="font-bold">Khách hàng: {user?.Username}</h2>
            <form action={order} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor='Phone'>Số điện thoại<span className='text-red-500'>*</span>:</label>
                    <input type='tel' id='Phone' name='Phone' className="outline-1 border-none rounded-lg p-2" placeholder="Nhập số điện thoại ở đây..." required/>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor='Name'>Người nhận<span className='text-red-500'>*</span>:</label>
                    <input type='text' id='Name' name='Name' className="outline-1 border-none rounded-lg p-2" placeholder="Nhập họ tên ở đây..." required/>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor='Address'>Địa chỉ<span className='text-red-500'>*</span>:</label>
                    <input type='text' id='Address' name='Address' className="outline-1 border-none rounded-lg p-2" placeholder="Nhập địa chỉ ở đây..." required/>
                </div>
                <button type='submit' className="w-max outline-1 rounded-lg px-8 py-2 bg-[#FFB433] self-center cursor-pointer hover:bg-[#80CBC4] hover:text-white active:bg-[#ccc]">Đặt hàng</button>
            </form>
        </div>
    </div>
}

export default OrderPage;