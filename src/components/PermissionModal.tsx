"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

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
        {
            name: "Danh sách quyền quản lý blog",
            permission: [
                { key: "createPost", label: "Quyền tạo bài viết" },
                { key: "updatePost", label: "Quyền cập nhật bài viết" },
                { key: "deletePost", label: "Quyền xóa bài viết" },
                { key: "getPosts", label: "Quyền xem danh sách bài viết" },
            ],
        },
        {
            name: "Danh sách quyền sản phẩm",
            permission: [
                { key: "createProduct", label: "Quyền tạo sản phẩm" },
                { key: "updateProduct", label: "Quyền cập nhật sản phẩm" },
                { key: "deleteProduct", label: "Quyền xóa sản phẩm" },
                { key: "getProducts", label: "Quyền xem danh sách sản phẩm" },
            ],
        },
        {
            name: "Danh sách quyền quản lý block",
            permission: [
                { key: "createBlock", label: "Quyền tạo block" },
                { key: "updateBlock", label: "Quyền cập nhật block" },
                { key: "deleteBlock", label: "Quyền xóa block" },
                { key: "getBlocks", label: "Quyền xem danh sách block" },
            ],
        },
    ];

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Sửa vai trò</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-3xl px-8">
                <DialogHeader className="border-b pb-4">
                    <DialogTitle>Edit profile</DialogTitle>
                </DialogHeader>
                <div className="">


                    <h3 className="text-xl font-bold mb-4">{role.name}</h3>
                    <form className="space-y-4">
                        <Accordion defaultValue="item-0" type="single" collapsible>
                        {permissionList.map((group, index) => (
                            <AccordionItem key={group.name} value={`item-${index}`}>
                                <AccordionTrigger>
                                    <h4 className="">{group.name}</h4>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div>
                                        <div className="grid grid-cols-2 gap-5">
                                            {group.permission.map((permission) => (
                                                <div key={permission.key} className="flex items-center gap-2">
                                                    <Switch
                                                        id={permission.key}
                                                        checked={permissions[permission.key as keyof typeof permissions]}
                                                        onCheckedChange={() => handlePermissionChange(permission.key)}
                                                    />
                                                    <label htmlFor={permission.key} className="text-sm font-semibold">
                                                        {permission.label}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                        </Accordion>
                        
                    </form>
                    <DialogFooter className="border-t mt-5 pt-5">
                        <Button onClick={handleUpdatePermissions} className="text-white">Cập nhật quyền</Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
}
