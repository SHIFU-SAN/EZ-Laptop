"use client";
"use strict";

import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/navigation";

import Logo from "../../../../public/images/logos/EZ-Laptop-logo.png";
import {Joan} from "next/dist/compiled/@next/font/dist/google/index.js";

const BASE_API = "http://localhost:3080";

function RegisterPage() {
    const router = useRouter();

    async function handleRegister(formData) {
        const Password = formData.get('Password');
        if (Password !== formData.get('ConfirmPassword')) {
            return alert("Mật khẩu không khớp!")
        } else {
            try {
                await fetch(`${BASE_API}/account`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': "application/json",
                    },
                    body: JSON.stringify({
                        Email: formData.get('Email'),
                        Username: formData.get('Username'),
                        Password: Password
                    })
                }).then(() => {
                    alert("Đăng ký thành công. ^-^");
                    router.replace('./login');
                });
            } catch (err) {
                console.error(`Can't handle register! Error: ${err.message}`);
            }
        }
    }

    return <div className="h-screen px-2 bg-[#80CBC4] md:text-lg flex flex-col items-center">
        <Link href="/" className="w-full md:w-2/3 lg:w-1/3 px-2 md:px-4">
            <Image
                src={Logo}
                alt="EZ-Laptop logo"
                priority={true}
                className="w-full h-auto"
            />
        </Link>
        <form action={handleRegister} className="w-full md:w-2/3 lg:w-1/3 px-2 md:px-4 pt-4 pb-8 bg-[#FBF8EF] rounded-lg flex flex-col gap-4">
            <div className="flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-2">
                <label htmlFor='Email'>Email<span className='text-red-500'>*</span>:</label>
                <input type='email' id='Email' name='Email' className="w-full outline-1 border-none p-2 rounded-lg"
                       placeholder="Nhập email ở đây..." required/>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center gap-1">
                <label htmlFor='Username' className='lg:min-w-[90px]'>Biệt danh<span className='text-red-500'>*</span>:</label>
                <input type='text' id='Username' name='Username' className="w-full outline-1 border-none p-2 rounded-lg"
                       placeholder="Nhập biệt danh ở đây..." required/>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center gap-1">
                <label htmlFor='Password' className='lg:min-w-[90px]'>Mật khẩu<span className='text-red-500'>*</span>:</label>
                <input type='password' id='Password' name='Password'
                       className="w-full outline-1 border-none p-2 rounded-lg" placeholder="Nhập mật khẩu ở đây..."
                       minLength={8}
                       required
                       pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$"
                       title="Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt"
                />
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center gap-1">
                <label htmlFor='ConfirmPassword' className='min-w-[160px]'>Nhập lại mật khẩu<span className='text-red-500'>*</span>:</label>
                <input type='password' id='ConfirmPassword' name='ConfirmPassword'
                       className="w-full outline-1 border-none p-2 rounded-lg"
                       placeholder="Nhập lại mật khẩu ở đây..." required/>
            </div>
            <button type='submit'
                    className="w-max px-8 py-2 outline-1 bg-[#FFB433] rounded-lg self-center cursor-pointer hover:bg-white hover:text-black active:bg-[#ccc]">Đăng
                ký
            </button>
        </form>
    </div>
}

export default RegisterPage;