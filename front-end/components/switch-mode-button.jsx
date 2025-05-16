"use client";
"use strict";
import {useState, useEffect} from 'react';
import {MdLightMode, MdDarkMode} from "react-icons/md";

function SwitchModeButton({className}) {
    const [isDark, setIsDark] = useState(false);

    function switchMode() {
        setIsDark(!isDark);
        document.documentElement.classList.toggle('dark');
    }

    return <button onClick={switchMode} className={className}>{!isDark ? <MdLightMode/> : <MdDarkMode/>}</button>
}

export default SwitchModeButton;