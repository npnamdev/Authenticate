"use client";

import React, { ReactNode, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
    const router = useRouter();
    const pathname = usePathname();
    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        const isManagePage = pathname.startsWith('/manage');
        if (isManagePage && !token) {
            router.push('/login');
        }
    }, [pathname, token, router]);

    return <>{token ? children : null}</>;
};

export default ProtectedRoute;
