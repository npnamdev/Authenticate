"use client";

import React, { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface RoleGuardProps {
    children: ReactNode;
    allowedRoles: string[];
}

const RoleGuard: React.FC<RoleGuardProps> = ({ children, allowedRoles }) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            router.push('/login');
            setLoading(false);
            return;
        }
        const verifyToken = async () => {
            try {
                const response = await fetch('/api/getMe', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Token không hợp lệ hoặc đã hết hạn');
                }
                const data = await response.json();
                setIsAuthenticated(true);
                setUserRole(data.role);
            } catch (error) {
                console.error(error);
                router.push('/login');
            } finally {
                setLoading(false);
            }
        };

        verifyToken();
    }, [router]);

    if (loading) return <p>Loading...</p>;

    if (!isAuthenticated || (userRole && !allowedRoles.includes(userRole))) {
        router.push('/unauthorized');
        return null;
    }
    return <>{children}</>;
};

export default RoleGuard;
