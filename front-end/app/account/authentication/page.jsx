"use client";
"use strict";

import {useState, useEffect, useRef} from 'react';
import {MdEmail} from "react-icons/md";
import {useSearchParams, useRouter} from "next/navigation";

import SwitchModeButton from "../../../components/switch-mode-button";

const BASE_API = "http://127.0.0.1:3080";

function AuthenticationPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const Email = searchParams.get('email');
    const Method = searchParams.get('method');


    const [seconds, setSeconds] = useState(30);
    const [isRunning, setIsRunning] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (isRunning && seconds > 0) {
            intervalRef.current = setInterval(() => {
                setSeconds(prev => prev - 1);
            }, 1000);
        }

        return () => clearInterval(intervalRef.current);
    }, [isRunning]);

    useEffect(() => {
        if (seconds === 0) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
        }
    }, [seconds]);

    async function getCode() {
        setIsSent(true);
        setSeconds(30);      // Đặt lại về 30
        setIsRunning(true);  // Bắt đầu đếm
        // Lấy mã xác nhận
        try {
            await fetch(`${BASE_API}/api/email-verification/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({
                    Email: Email
                })
            });
        } catch (err) {
            console.error(`Can't get code! Error: ${err}`)
        }
    };


    async function confirmEmail(formData) {
        try {
            // Create body of request
            const AuthenticationData = {
                Email: Email,
                Code: formData.get('Code'),
                Method: Method
            }
            // Check code
            let ConfirmResult = {};

            await fetch(`${BASE_API}/api/email-verification/check`, {
                method: 'PUT',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(AuthenticationData)
            })
                .then(res => res.json())
                .then(data => ConfirmResult = data);

            if (!ConfirmResult.Verify) {
                alert('Mã xác nhận không đúng!');
            } else {
                switch (Method) {
                    case 'sign-up':
                        router.push('/account/login');
                        break;
                    case 'reset-password':
                        //reset password logic
                        break;
                }

            }

        } catch (err) {
            console.error(`Can't confirm email! Error: ${err}`);
        }
    }

    return <>
        <div className="min-h-screen py-20 bg-green flex flex-col items-center">
            <section className="flex flex-col items-center gap-4">
                <MdEmail className="text-8xl"/>
                <h1 className="font-bold">Email: {Email}</h1>
                <button onClick={getCode} disabled={isRunning}
                        className="p-2 bg-[#FFB433] font-medium border-1 rounded-lg active:p-3 active:bg-[#ccc] active:outline-2 active:outline-offset-2">{!isSent ? "Lấy mã xác nhận" : "Gửi lại mã"}
                </button>
                {!isRunning ? null : <small className="text-gray">Hãy đợi {seconds} giây để lấy lại mã!</small>}
                {!isSent ? null : <form action={confirmEmail} className="flex flex-col items-center gap-1">
                    <label htmlFor="Code">Mã xác nhận<span className="text-red-500">*</span>:</label>
                    <input type="text" name="Code" placeholder="Nhập mã xác nhận ở đây" required
                           className="px-2 py-1 bg-bg text-center outline-none border-1 border-[#ccc] rounded-lg"/>
                    <br/>
                    <button type="submit" value="Submit"
                            className="p-2 bg-[#FFB433] font-medium border-1 rounded-lg active:p-3 active:bg-[#ccc] active:outline-2 active:outline-offset-2">Xác
                        nhận
                    </button>
                </form>}
            </section>
            <SwitchModeButton className="absolute top-4 right-4"/>
        </div>
    </>
}

export default AuthenticationPage;