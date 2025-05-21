"use client";
"use strict";

import {useState} from 'react';
import {useSearchParams, useRouter} from "next/navigation";
import Image from "next/image";

import Logo from "../../../assets/images/logo/EZ-Laptop-logo.png";
import {MdEmail} from "react-icons/md";

const BASE_API = "http://127.0.0.1:3070";

function ResetPasswordPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [newPassword, setNewPassword] = useState("");

    const Email = searchParams.get('email');

    function onChangeNewPassword(event) {
        setNewPassword(event.target.value);
    }

    async function resetPassword(formData) {
        try {
            const NewPassword = formData.get('NewPassword');
            if (NewPassword !== formData.get('ConfirmNewPassword')) {
                alert("Mật khẩu mới không khớp!");
            } else {
                let ConfirmResult = false;

                await fetch(`${BASE_API}/api/account/reset-password`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': "application/json"
                    },
                    body: JSON.stringify({
                        Email: Email,
                        NewPassword: newPassword
                    })
                })
                    .then(res => res.json())
                    .then(data => ConfirmResult = data.Verify);
                if (ConfirmResult) {
                    router.push('/account/login');
                }
            }
        } catch (err) {
            console.error(`Can't reset password! Error: ${err}`);
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
                <form action={resetPassword} className="px-2 py-2 bg-bg rounded-lg grid grid-cols-1 gap-1">
                    <div className="flex items-center my-4">
                        <MdEmail className="text-2xl"/>
                        <h1 className="font-bold text-xl">Email: {Email}</h1>
                    </div>
                    <label htmlFor="Password">Mật khẩu mới<span className="text-red-500">*</span>:</label>
                    <input onChange={onChangeNewPassword} type="password" id="NewPassword" name="NewPassword"
                           value={newPassword}
                           minLength="8"
                           pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$"
                           placeholder="Nhập mật khẩu mới ở đây..."
                           title="Mật khẩu phải có ít nhất 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt."
                           required
                           className="px-2 py-1 outline-none border-1 border-[#ccc] rounded-lg placeholder:text-gray"/>
                    <small className="mb-4 text-gray">(Mật khẩu phải có ít nhất 8 ký tự, gồm chữ thường, chữ hoa, số và
                        ký
                        tự
                        đặc biệt.)</small>

                    <label htmlFor="ConfirmPassword">Nhập lại mật khẩu mới<span
                        className="text-red-500">*</span>:</label>
                    <input type="password" id="ConfirmNewPassword" name="ConfirmNewPassword" minLength="8"
                           placeholder="Nhập lại mật khẩu mới ở đây..." required
                           className="px-2 py-1 outline-none border-1 border-[#ccc] rounded-lg placeholder:text-gray"/>
                    <br/>
                    <button type="submit" value="Submit"
                            className="w-1/2 py-2 bg-[#FFB433] font-bold rounded-lg justify-self-center active:bg-[#ccc] active:outline-2 active:outline-offset-2">Lưu
                    </button>
                </form>
            </section>
        </div>
    </>
}

export default ResetPasswordPage;