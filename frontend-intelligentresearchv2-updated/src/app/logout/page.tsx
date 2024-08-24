"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from "react";
import Cookies from 'js-cookie';

const Logout = () => {
    const router = useRouter();

    useEffect(() => {
        Cookies.remove('token')

        router.push('/login');
    }, [router]);

    return (
        <div>Saindo...</div>
    )
}
 
export default Logout;