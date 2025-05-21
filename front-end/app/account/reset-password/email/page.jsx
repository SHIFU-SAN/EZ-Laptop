"use client";
"use strict";

import {useState} from 'react';
import {useRouter} from "next/navigation";
import Image from "next/image";

import Logo from "../../../../assets/images/logo/EZ-Laptop-logo.png";

function ResetPasswordPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");

    function onChangeEmail(event) {
        setEmail(event.target.value);
    }

    function sendEmail(formData) {
        const Email = formData.get('Email');
        router.push(`/account/authentication?method=reset-password&email=${Email}`);
    }

    return <>
        <div className="min-h-screen py-12 bg-green overflow-auto md:flex md:flex-col md:items-center">
            <section className="w-full md:max-w-3/4 lg:max-w-1/3 px-2 md:px-0">
                <Image
                    src={Logo}
                    alt="EZ-Laptop logo"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="w-full h-auto"
                />
                <form action={sendEmail} className="px-2 py-4 bg-bg rounded-lg grid grid-cols-1 gap-1">
                    <label htmlFor="Email">Email<span className="text-red-500">*</span>:</label>
                    <input onChange={onChangeEmail} type="email" id="Email" name="Email" value={email}
                           placeholder="Nhập email ở đây..." required
                           className="px-2 py-1 outline-none border-1 border-[#ccc] rounded-lg placeholder:text-gray"/>
                    <br/>
                    <button type="submit"
                            className="w-1/2 py-2 bg-[#FFB433] font-bold rounded-lg justify-self-center active:bg-[#ccc] active:outline-2 active:outline-offset-2">Khôi
                        phục mật khẩu
                    </button>
                </form>
            </section>
        </div>
    </>
}

export default ResetPasswordPage;