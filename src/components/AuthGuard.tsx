"use client";

import React, { ReactNode, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const AuthGuard: React.FC<{ children: ReactNode }> = ({ children }) => {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const restrictedRoutes = ['/login', '/register'];
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        setIsAuthenticated(!!token); 
        const isRestrictedRoute = restrictedRoutes.some((route) => pathname === route);
        if (isAuthenticated && isRestrictedRoute) {
            router.push('/');
        }
    }, [isAuthenticated, pathname, router]);

    return <>{children}</>;
};

export default AuthGuard;
