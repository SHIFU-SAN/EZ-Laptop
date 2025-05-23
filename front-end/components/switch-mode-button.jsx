"use client";
"use strict";
import {useState} from 'react';
import {MdLightMode, MdDarkMode} from "react-icons/md";

function SwitchModeButton({className}) {
    const [isDark, setIsDark] = useState(false);

    function switchMode() {
        const theme = localStorage.getItem('theme');
        if (theme != 'dark') {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
        setIsDark(!isDark);
        document.documentElement.classList.toggle('dark');
    }

    return <button onClick={switchMode}
                   className={`${className} p-2 bg-bg border-1 border-[#ccc] rounded-lg active:bg-[#FFB433] active:text-lg active:outline-2 active:outline-offset-2 `}>{!isDark ?
        <MdLightMode/> : <MdDarkMode/>}</button>
}

export default SwitchModeButton;