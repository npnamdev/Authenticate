"use client";

import React, { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/vi"; // Import ngôn ngữ tiếng Việt cho moment
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";
import { getRoles } from "@/services/api";
import PermissionModal from "@/components/PermissionModal";

// Giả sử Role có cấu trúc như thế này


export default function RolePermissionPage() {
    const [roles, setRoles] = useState<Role[]>([]);

    useEffect(() => {
        const fetchRoles = async () => {
            const res = await getRoles();
            if (res.status === "success") {
                setRoles(res.data);
                console.log("Dữ liệu từ API:", res.data);
            }
        };
        fetchRoles();
    }, []);

    return (
        <div className="bg-white shadow-md rounded-lg p-1">
            <Table className="text-black">
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-black font-bold px-6">#</TableHead>
                        <TableHead className="text-black font-bold px-6">Id</TableHead>
                        <TableHead className="text-black font-bold px-6">Tên vai trò</TableHead>
                        <TableHead className="text-black font-bold px-6">Ngày tạo</TableHead>
                        <TableHead className="text-black font-bold px-6">Ngày Cập nhật</TableHead>
                        <TableHead className="text-black font-bold px-6"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {roles.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center">Đang tải dữ liệu...</TableCell>
                        </TableRow>
                    ) : (
                        roles.map((role, index) => (
                            <TableRow key={index}>
                                <TableCell className="py-2.5 px-6 font-medium">{index + 1}</TableCell>
                                <TableCell className="py-2.5 px-6 font-medium">{role._id}</TableCell>
                                <TableCell className="py-2.5 px-6 font-medium">{role.name}</TableCell>
                                <TableCell className="py-2.5 px-6 font-medium">
                                    {moment(role.createdAt).locale("en").format("MMM Do YY")}
                                </TableCell>
                                <TableCell className="py-2.5 px-6 font-medium">
                                    {moment(role.updatedAt).locale("en").format("MMM Do YY")}
                                </TableCell>
                                <TableCell className="py-2.5 px-6 font-medium">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" size="icon" className="w-7 h-7">
                                                <EllipsisVertical size={16} color="#171616" strokeWidth={1.5} />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent side="left" className="w-auto rounded-lg shadow-lg">
                                            <div className="w-[120px] flex flex-col gap-1">
                                                <Button variant="outline" className="w-full">Xem chi tiết</Button>
                                                <PermissionModal role={role}/>
                                                <Button variant="outline" className="w-full">Xóa vai trò</Button>
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
