"use client";

import React, { useEffect, useState } from 'react';

export const LoadingWrapper: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 1000 }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => { setLoading(false); }, delay);
        return () => clearTimeout(timer);
    }, [delay]);

    if (loading) {
        return (
            <div className="h-full w-full bg-white flex justify-center items-center">
                <div className="spinner">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        )
    }
    return <>{children}</>;
};

export default LoadingWrapper;


