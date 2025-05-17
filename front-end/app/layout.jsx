"use client";
"use strict";

import {useEffect} from 'react';

import "../assets/css/globals.css";

function RootLayout({children}) {
    function checkSelectedTheme() {
        const SelectedTheme = localStorage.getItem('theme');
        if (!SelectedTheme) {
            localStorage.setItem('theme', 'light');
        } else if (SelectedTheme === 'dark' && !document.documentElement.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
            document.documentElement.classList.toggle('dark');
        }
    }

    useEffect(checkSelectedTheme, []);

    return (
        <html lang="en">
        <body className="bg-bg text-text">{children}</body>
        </html>
    )
}

export default RootLayout;