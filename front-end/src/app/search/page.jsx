"use client";
"use strict";

import {Suspense} from 'react';
import {useSearchParams} from "next/navigation";

function SearchPage() {
    const searchParams = useSearchParams();

    return <h1>{searchParams.get('name')}</h1>
}

function SuspenseSearch() {
    return <Suspense>
        <SearchPage/>
    </Suspense>
}

export default SuspenseSearch;