"use client";

import React, { useEffect, useState } from "react";
import moment from "moment";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { deleteUser, getUsers } from "@/services/api";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";
import ModalCreateUser from "@/components/ModalCreateUser";
import { toast } from "sonner";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function UserPage() {
    const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);
    const [users, setUsers] = useState<User[]>([]);

    const fetchUsers = async () => {
        const res = await getUsers();
        if (res.status === "success") {
            setUsers(res.data);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);


    const handleDeleteUser = async (userId: string) => {
        const res = await deleteUser(userId);
        if (res.status === "success") {
            fetchUsers();
            toast(res.message, { action: { label: "Undo", onClick: () => console.log("Undo") } });
        }
        if (res.status === "error") {
            toast(res.message, { action: { label: "Undo", onClick: () => console.log("Undo") } });
        }
    };


    return (
        <div className="bg-white shadow-md rounded-lg p-1">
            <div className="h-[70px] border-b flex items-center justify-between px-5">
                Search
                <ModalCreateUser fetchUsers={fetchUsers} /> {/* Pass fetchUsers here */}
            </div>
            <Table className="text-black">
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-black font-bold px-6">#</TableHead>
                        <TableHead className="text-black font-bold px-6">Tên người dùng</TableHead>
                        <TableHead className="text-black font-bold px-6">Email</TableHead>
                        <TableHead className="text-black font-bold px-6">Vai trò</TableHead>
                        <TableHead className="text-black font-bold px-6">Trạng thái</TableHead>
                        <TableHead className="text-black font-bold px-6">Ngày tạo</TableHead>
                        <TableHead className="text-black font-bold px-6"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={7} className="text-center">Đang tải dữ liệu...</TableCell>
                        </TableRow>
                    ) : (
                        users.map((user, index) => (
                            <TableRow key={index}>
                                <TableCell className="py-2.5 px-6 font-medium">{index + 1}</TableCell>
                                <TableCell className="py-2.5 px-6 font-medium">{user.username}</TableCell>
                                <TableCell className="py-2.5 px-6 font-medium">{user.email}</TableCell>
                                <TableCell className="py-2.5 px-6 font-medium">{user.role.name}</TableCell>
                                <TableCell className="py-2.5 px-6 font-medium">
                                    {user.isActive ? "Hoạt động" : "Không hoạt động"}
                                </TableCell>
                                <TableCell className="py-2.5 px-6 font-medium">
                                    {moment(user.createdAt).locale("en").format("MMM Do YY")}
                                </TableCell>
                                <TableCell className="py-2.5 px-6 font-medium">
                                    <Popover open={openPopoverId === user._id} onOpenChange={(open) => setOpenPopoverId(open ? user._id : null)}>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" size="icon" className="w-7 h-7">
                                                <EllipsisVertical size={16} color="#171616" strokeWidth={1.5} />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent side="left" className="w-auto rounded-lg shadow-lg">
                                            <div className="w-[120px] flex flex-col gap-1">
                                                <Button onClick={() => setOpenPopoverId(null)} variant="outline" className="w-full">Xem chi tiết</Button>
                                                <Button onClick={() => setOpenPopoverId(null)} variant="outline" className="w-full">Sửa người dùng</Button>

                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button variant="outline" className="w-full">Xóa người dùng</Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Xóa người dùng</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Bạn có chắc chắn muốn xóa người dùng không?
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => handleDeleteUser(user._id)} className="text-white">Continue</AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
