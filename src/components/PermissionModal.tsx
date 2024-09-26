"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";

export default function PermissionModal({ role }: PermissionModalProps) {
    const [permissions, setPermissions] = useState({
        getUsers: false,
        getUserById: false,
        createUser: false,
        updateUser: false,
        deleteUser: false,
    });

    useEffect(() => {
        if (role.permissions) { setPermissions(role.permissions); }
    }, [role.permissions]);

    const handlePermissionChange = (permission: string) => {
        setPermissions((prevPermissions) => ({
            ...prevPermissions,
            [permission]: !prevPermissions[permission as keyof typeof prevPermissions],
        }));
    };

    const handleUpdatePermissions = () => {
        console.log("Đang cập nhật quyền cho vai trò:", role.name);
        console.log("Quyền hiện tại:", permissions);
        console.log("Fake API call to update permissions");
    };

    const permissionList = [
        {
            name: "Danh sách quyền người dùng",
            permission: [
                { key: "getUsers", label: "Quyền xem danh sách người dùng" },
                { key: "getUserById", label: "Quyền xem chi tiết người dùng" },
                { key: "createUser", label: "Quyền tạo người dùng" },
                { key: "updateUser", label: "Quyền cập nhật người dùng" },
                { key: "deleteUser", label: "Quyền xóa người dùng" },
            ],
        },
        // {
        //     name: "Danh sách quyền bài viết",
        //     permission: [
        //         { key: "getPosts", label: "Quyền xem danh sách người dùng" },
        //         { key: "getPostById", label: "Quyền xem chi tiết người dùng" },
        //         { key: "createPost", label: "Quyền tạo người dùng" },
        //         { key: "updatePost", label: "Quyền cập nhật người dùng" },
        //         { key: "deletePost", label: "Quyền xóa người dùng" },
        //     ],
        // },
    ];

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Sửa vai trò</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
                <div className="min-h-[300px]">
                    <h3 className="text-xl font-bold mb-4">{role.name}</h3>
                    <form className="space-y-4">
                        {permissionList.map((group) => (
                            <div key={group.name}>
                                <h4 className="font-semibold text-lg">{group.name}</h4>
                                {group.permission.map((permission) => (
                                    <div key={permission.key} className="flex items-center justify-between gap-2">
                                        <label htmlFor={permission.key} className="text-sm font-medium">
                                            {permission.label}
                                        </label>
                                        <Switch
                                            id={permission.key}
                                            checked={permissions[permission.key as keyof typeof permissions]}
                                            onCheckedChange={() => handlePermissionChange(permission.key)}
                                        />
                                    </div>
                                ))}
                            </div>
                        ))}
                    </form>
                    <div className="mt-6">
                        <Button onClick={handleUpdatePermissions}>Cập nhật quyền</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
