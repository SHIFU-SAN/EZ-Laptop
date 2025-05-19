"use client";
"use strict";

import {useState} from 'react';
import {useRouter} from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import Logo from "../../../assets/images/logo/EZ-Laptop-logo.png";

const BASE_API = "http://127.0.0.1:3070";

function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function onChangeEmail(event) {
        setEmail(event.target.value);
    }

    function onChangePassword(event) {
        setPassword(event.target.value);
    }

    async function login(formData) {
        const Email = formData.get('Email');
        const Password = formData.get('Password');
        try {
            // request login
            let UserInfo = {}
            await fetch(`${BASE_API}/api/account/check-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({
                    Email: Email,
                    Password: Password
                })
            })
                .then(res => res.json())
                .then(data => UserInfo = data);

            if (!UserInfo.Verify) {
                alert('Tài khoản hoặc mật khẩu không đúng!');
            } else {
                // store user info to local storage
                localStorage.setItem('ID', UserInfo.ID);
                localStorage.setItem('AccessToken', UserInfo.AccessToken);
                localStorage.setItem('RefreshToken', UserInfo.RefreshToken);

                // check permission
                const Permission = UserInfo.Permission;
                switch (Permission) {
                    case 'Admin':
                        router.push('/admin');
                        break;
                    case 'Customer':
                        router.push('/');
                        break;
                }
            }
        } catch (err) {
            console.error(`Can't login! Error: ${err}`);
        }
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
                <form action={login} className="px-2 py-4 bg-bg rounded-lg grid grid-cols-1 gap-1">
                    <label htmlFor="Email">Email<span className="text-red-500">*</span>:</label>
                    <input onChange={onChangeEmail} type="email" id="Email" name="Email" value={email}
                           placeholder="Nhập email ở đây..." required
                           className="px-2 py-1 outline-none border-1 border-[#ccc] rounded-lg placeholder:text-gray"/>
                    <label htmlFor="Password">Mật khẩu<span className="text-red-500">*</span>:</label>
                    <input onChange={onChangePassword} type="password" id="Password" name="Password" value={password}
                           minLength="8"
                           pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$"
                           placeholder="Nhập mật khẩu ở đây..."
                           title="Mật khẩu phải có ít nhất 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt."
                           required
                           className="px-2 py-1 outline-none border-1 border-[#ccc] rounded-lg placeholder:text-gray"/>
                    <small className="text-gray">(Mật khẩu phải có ít nhất 8 ký tự, gồm chữ thường, chữ hoa, số và ký
                        tự
                        đặc biệt.)</small>

                    <br/>
                    <button type="submit" value="Submit"
                            className="w-1/2 py-2 bg-[#FFB433] font-bold rounded-lg justify-self-center active:bg-[#ccc] active:outline-2 active:outline-offset-2">Đăng
                        nhập
                    </button>
                    <br/>
                    <span className="font-light text-center">Quên mật khẩu? <Link href="/account/reset-password"
                                                                                  className="underline font-bold active:text-[#ccc]">Lấy lại mật khẩu</Link></span>
                </form>
            </section>
        </div>
    </>
}

export default LoginPage;