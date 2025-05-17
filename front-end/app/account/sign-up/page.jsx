"use client";
"use strict";

import {useState} from 'react';
import {useRouter} from "next/navigation";
import Image from "next/image";

import SwitchModeButton from "../../../components/switch-mode-button";
import Logo from "../../../assets/images/logo/EZ-Laptop-logo.png";
import {MdDarkMode, MdLightMode} from "react-icons/md";

const BASE_API = "http://127.0.0.1:3080";

function SignUpPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    function onChangeEmail(event) {
        setEmail(event.target.value);
    }

    function onChangePhone(event) {
        setPhone(event.target.value);
    }

    function onChangeUsername(event) {
        setUsername(event.target.value);
    }

    function onChangePassword(event) {
        setPassword(event.target.value);
    }

    function onChangeName(event) {
        setName(event.target.value);
    }

    async function signUp(formData) {
        try {
            const Email = formData.get('Email');
            const Password = formData.get('Password');

            let isExisted = null;
            await fetch(`${BASE_API}/api/account/info/check?email=${Email}`)
                .then(res => res.json())
                .then(data => isExisted = data)

            if (isExisted) {
                alert('Tài khoản đã tồn tại!');
                return;
            } else if (Password !== formData.get('ConfirmPassword')) {
                alert('Mật khẩu không khớp!');
                return;
            } else {
                try {
                    const NewAccount = {
                        Email: Email,
                        PhoneNumber: formData.get('Phone'),
                        Username: formData.get('Username'),
                        Password: Password,
                        Name: formData.get('Name')
                    }

                    await fetch(`${BASE_API}/api/unverified_account/add`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(NewAccount)
                    });

                    router.push(`/account/authentication?email=${NewAccount.Email}`);
                } catch (err) {
                    console.error(`Failed to sign up! Error: ${err}`)
                }
            }

        } catch (err) {
            console.error(`Failed to check existed account! Error: ${err}`)
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
                <form action={signUp} className="px-2 py-4 bg-bg rounded-lg grid grid-cols-1 gap-1">
                    <label htmlFor="Email">Email<span className="text-red-500">*</span>:</label>
                    <input onChange={onChangeEmail} type="email" id="Email" name="Email" value={email}
                           placeholder="Nhập email ở đây..." required
                           className="px-2 py-1 outline-none border-1 border-[#ccc] rounded-lg placeholder:text-gray"/>
                    <br/>
                    <label htmlFor="Phone">Số điện thoại:</label>
                    <input onChange={onChangePhone} type="tel" id="Phone" name="Phone" value={phone}
                           placeholder="Nhập số điện thoại ở đây..."
                           className="px-2 py-1 outline-none border-1 border-[#ccc] rounded-lg placeholder:text-gray"/>
                    <br/>
                    <label htmlFor="Username">Tên người dùng<span className="text-red-500">*</span>:</label>
                    <input onChange={onChangeUsername} type="text" id="Username" name="Username" value={username}
                           placeholder="Nhập tên người dùng ở đây..."
                           required
                           className="px-2 py-1 outline-none border-1 border-[#ccc] rounded-lg placeholder:text-gray"/>
                    <br/>
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
                    <label htmlFor="ConfirmPassword">Nhập lại mật khẩu<span className="text-red-500">*</span>:</label>
                    <input type="password" id="ConfirmPassword" name="ConfirmPassword" minLength="8"
                           placeholder="Nhập lại mật khẩu ở đây..." required
                           className="px-2 py-1 outline-none border-1 border-[#ccc] rounded-lg placeholder:text-gray"/>
                    <br/>
                    <label htmlFor="Name">Họ & tên<span className="text-red-500">*</span>:</label>
                    <input onChange={onChangeName} type="text" id="Name" name="Name" value={name}
                           placeholder="Nhập họ và tên ở đây..." required
                           className="px-2 py-1 outline-none border-1 border-[#ccc] rounded-lg placeholder:text-gray"/>
                    <br/>
                    <button type="submit" value="Submit"
                            className="w-1/2 py-2 bg-[#FFB433] font-bold rounded-lg justify-self-center active:bg-[#ccc] active:outline-2 active:outline-offset-2">Đăng
                        ký
                    </button>
                </form>
            </section>
            <SwitchModeButton
                className="absolute top-2 right-2"/>
        </div>
    </>
}

export default SignUpPage;