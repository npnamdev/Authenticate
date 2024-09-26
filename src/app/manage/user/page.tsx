"use client";

import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getUsers } from "@/services/api";

interface User {
    username: string;
    email: string;
    role: {
        name: string;
    };
    createdAt: string;
}

export default function UserPage() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await getUsers();
            if (res.status === "success") {
                setUsers(res.data);
                console.log("Dữ liệu từ API:", res.data);
                console.log("Giá trị của users:", res.data);
            }
        };
        fetchUsers();
    }, []);

    return (
        <div className="bg-white shadow-md rounded-lg p-1">
            <Table className="text-black">
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-black font-bold px-6">#</TableHead>
                        <TableHead className="text-black font-bold px-6">Tên người dùng</TableHead>
                        <TableHead className="text-black font-bold px-6">Email</TableHead>
                        <TableHead className="text-black font-bold px-6">Vai trò</TableHead>
                        <TableHead className="text-black font-bold px-6">Ngày tạo</TableHead>
                        <TableHead className="text-black font-bold px-6">Hành động</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center">Đang tải dữ liệu...</TableCell>
                        </TableRow>
                    ) : (
                        users.map((user, index) => (
                            <TableRow key={index}>
                                <TableCell className="py-4 px-6 font-medium">{index + 1}</TableCell>
                                <TableCell className="py-4 px-6 font-medium">{user.username}</TableCell>
                                <TableCell className="py-4 px-6 font-medium">{user.email}</TableCell>
                                <TableCell className="py-4 px-6 font-medium">{user.role.name}</TableCell>
                                <TableCell className="py-4 px-6 font-medium">{user.createdAt}</TableCell>
                                <TableCell className="py-4 px-6 font-medium">
                                    <button className="text-blue-600 hover:underline">Sửa</button>
                                    <button className="text-red-600 hover:underline ml-2">Xóa</button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
