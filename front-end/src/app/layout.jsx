"use client";
"use strict";

import "../assets/styles/globals.css";

function RootLayout({children}) {
    return <html>
    <head>
        <title>EZ-Laptop</title>
    </head>
    <body className="md:text-lg">{children}</body>
    </html>
}

export default RootLayout;