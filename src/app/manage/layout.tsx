"use client";

import MenuBar from "@/components/MenuBar";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function ManageLayout({ children }: { children: React.ReactNode }) {
    return (
        <ProtectedRoute>
            <div className="grid grid-cols-[250px_auto] text-sm">
                <MenuBar />
                <main className="overflow-auto h-dvh">
                    <header className="sticky top-0 z-10 h-[60px] flex px-5 items-center bg-white border-b">
                        header
                    </header>
                    <div className="h-[calc(100%-60px)] p-4 bg-gray-50">
                        {children}
                    </div>
                </main>
            </div>
        </ProtectedRoute>
    )
}