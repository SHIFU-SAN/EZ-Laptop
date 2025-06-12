"use client";
"use strict";

import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {MdLogin} from "react-icons/md";

import Logo from "../../../../public/images/logos/EZ-Laptop-logo.png";

const BASE_API = "http://localhost:3080";

function LoginPage() {
    const router = useRouter();

    async function handleLogin(formData) {
        try {
            await fetch(`${BASE_API}/account/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({
                    Email: formData.get('Email'),
                    Password: formData.get('Password'),
                })
            })
                .then(res => res.json())
                .then(data => {
                    if (!data?.isExist) {
                        alert("Email chưa được đăng ký!");
                    } else if (!data?.result) {
                        alert("Sai mật khẩu");
                    } else if (data?.result) {
                        router.replace('/');
                    }
                });
        } catch (err) {
            console.error(`Can't login! Error: ${err.message}`);
        }
    }

    return <div className="h-screen px-2 bg-[#80CBC4] flex flex-col items-center">
        <Link href="/" className="md:w-2/3 lg:w-1/3">
            <Image
                src={Logo}
                alt="EZ-Laptop logo"
                priority={true}
                className="w-full h-auto"
            />
        </Link>
        <div
            className="w-full md:w-2/3 lg:w-1/3 px-2 md:px-4 pt-4 lg:pt-8 pb-8 bg-[#FBF8EF] rounded-lg flex flex-col items-center gap-4">
            <form action={handleLogin} className="w-full flex flex-col gap-4">
                <div className="flex flex-col lg:flex-row lg:items-center gap-2">
                    <label htmlFor='Email'>Email<span className='text-red-500'>*</span>:</label>
                    <input type='email' id='Email' name='Email' className="w-full outline-1 border-none p-2 rounded-lg"
                           placeholder="Nhập email ở đây..." required/>
                </div>
                <div className="flex flex-col lg:flex-row lg:items-center gap-2">
                    <label htmlFor='Password' className='lg:min-w-[90px]'>Mật khẩu<span
                        className='text-red-500'>*</span>:</label>
                    <input type='password' id='Password' name='Password'
                           className="w-full outline-1 border-none p-2 rounded-lg" placeholder="Nhập mật khẩu ở đây..."
                           minLength={8}
                           required
                           pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$"
                           title="Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt"
                    />
                </div>
                <button type='submit'
                        className="w-max outline-1 px-4 py-2 bg-[#FFB433] rounded-lg self-center flex items-center gap-1 cursor-pointer hover:bg-white hover:text-black active:bg-[#ccc]">
                    <MdLogin/>Đăng
                    nhập
                </button>
            </form>
            <p className="font-light italic">Chưa có tài khoản? <Link href="./register"
                                                                      className="text-blue-500 underline">Đăng
                ký</Link></p>
        </div>
    </div>
}

export default LoginPage;