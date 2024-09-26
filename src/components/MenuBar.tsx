"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Boxes, ChartColumnDecreasing, ChevronDown, ChevronRight, Gift, LayoutGrid, LogOut, Settings, ShoppingCart, Truck, UsersRound, WalletCards } from "lucide-react";
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
import { Button } from "@/components/ui/button"

interface SubmenuItem {
    name: string;
    href?: string;
    onClick?: () => void;
}

interface MenuItem {
    name: string;
    icon: JSX.Element;
    key: string;
    submenus?: SubmenuItem[];
    href?: string;
    onClick?: () => void;
}

export default function MenuBar() {
    const router = useRouter();
    const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

    const mainMenu: MenuItem[] = [
        {
            name: "Tổng quan",
            icon: <LayoutGrid size={18} strokeWidth={1.5} color="#484863" />,
            key: "overview",
            href: "/manage",
        },
        {
            name: "Quản lý người dùng",
            icon: <UsersRound size={18} strokeWidth={1.5} color="#484863" />,
            key: "user-management",
            submenus: [
                { name: "Danh sách người dùng", href: "/manage/user" },
                { name: "Vai trò và phân quyền", href: "/manage/role-permission" },
            ],
        },
        {
            name: "Quản lý sản phẩm",
            icon: <ShoppingCart size={18} strokeWidth={1.5} color="#484863" />,
            key: "product-management",
            submenus: [
                { name: "Danh sách sản phẩm", href: "/manage/product" },
                { name: "Danh mục sản phẩm" },
            ],
        },
        {
            name: "Quản lý đơn hàng",
            icon: <Truck size={18} strokeWidth={1.5} color="#484863" />,
            key: "order-management",
            submenus: [
                { name: "Danh sách đơn hàng", href: "/manage/orders" },
                { name: "Giao hàng", href: "/manage/orders/shipping" },
                { name: "Đơn hàng bị huỷ", href: "/manage/orders/cancelled" },
                { name: "Đơn hàng hoàn thành", href: "/manage/orders/completed" },
            ],
        },
        {
            name: "Quản lý khuyến mãi",
            icon: <Gift size={18} strokeWidth={1.5} color="#484863" />,
            key: "promotion-management",
            submenus: [
                { name: "Khuyến mãi hiện tại", href: "/manage/promotion/current" },
                { name: "Lịch sử khuyến mãi", href: "/manage/promotion/history" },
                { name: "Thêm khuyến mãi mới", href: "/manage/promotion/add" },
            ],
        },
        {
            name: "Quản lý thanh toán",
            icon: <WalletCards size={18} strokeWidth={1.5} color="#484863" />,
            key: "payment-management",
            submenus: [
                { name: "Phương thức thanh toán", href: "/manage/payment/methods" },
                { name: "Giao dịch", href: "/manage/payment/transactions" },
                { name: "Lịch sử thanh toán", href: "/manage/payment/history" },
            ],
        },
        {
            name: "Quản lý kho",
            icon: <Boxes size={18} strokeWidth={1.5} color="#484863" />,
            key: "inventory-management",
            submenus: [
                { name: "Danh sách hàng tồn kho", href: "/manage/inventory" },
                { name: "Nhập kho", href: "/manage/inventory/import" },
                { name: "Xuất kho", href: "/manage/inventory/export" },
                { name: "Kiểm kê kho", href: "/manage/inventory/audit" },
            ],
        },
        {
            name: "Thống kê báo cáo",
            icon: <ChartColumnDecreasing size={18} strokeWidth={1.5} color="#484863" />,
            key: "reporting",
            submenus: [
                { name: "Doanh thu", href: "/manage/reports/revenue" },
                { name: "Chi phí", href: "/manage/reports/expenses" },
                { name: "Lợi nhuận", href: "/manage/reports/profit" },
                { name: "Tồn kho", href: "/manage/reports/inventory" },
                { name: "Hiệu suất bán hàng", href: "/manage/reports/sales-performance" },
            ],
        },
    ];

    const settingMenu: MenuItem[] = [
        {
            name: "Cài đặt",
            icon: <Settings size={18} strokeWidth={1.5} color="#484863" />,
            key: "settings",
            href: "/settings",
        },
        {
            name: "Đăng xuất",
            icon: <LogOut size={18} strokeWidth={1.5} color="#484863" />,
            key: "logout",
            onClick: () => {
                localStorage.removeItem("accessToken");
                router.push("/login");
                toast("Đăng xuất thành công", { action: { label: "Undo", onClick: () => console.log("Undo") }, });
            },
        },
    ];

    const handleMenuClick = (key: string) => {
        setExpandedMenu((prev) => (prev === key ? null : key));
    };

    return (
        <nav className="bg-white border-r h-[100vh] select-none">
            <Link href="/" className="h-[80px] flex items-center px-6">
                <Image
                    src="/logo.svg"
                    alt="Next.js Logo"
                    width={140}
                    height={36}
                    priority
                    className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
                />
            </Link>
            <div className="h-[calc(100%-80px)] flex flex-col justify-between py-2.5">
                <div className="flex flex-col justify-center gap-2 cursor-pointer px-3">
                    {mainMenu.map((menu) => (
                        <div key={menu.key} className="flex flex-col">
                            {menu.submenus ? (
                                <div
                                    className={`h-9 rounded-md flex items-center font-medium justify-between gap-2.5 hover:bg-gray-100 px-3 ${menu.key === expandedMenu ? "bg-gray-100" : ""
                                        }`}
                                    onClick={() => handleMenuClick(menu.key)}
                                >
                                    <div className="flex gap-2.5 items-center">
                                        {menu.icon}
                                        <span className="line-clamp-1">{menu.name}</span>
                                    </div>
                                    {expandedMenu !== menu.key ? (
                                        <ChevronRight size={16} color="#100404" strokeWidth={1.5} />
                                    ) : (
                                        <ChevronDown size={16} color="#100404" strokeWidth={1.5} />
                                    )}
                                </div>
                            ) : menu.onClick ? (
                                <button
                                    onClick={menu.onClick}
                                    className={`h-9 font-medium rounded-md flex gap-2.5 items-center px-3 hover:bg-gray-100 ${menu.key === expandedMenu ? "bg-gray-100" : ""
                                        }`}
                                >
                                    {menu.icon}
                                    <span className="line-clamp-1">{menu.name}</span>
                                </button>
                            ) : (
                                <Link
                                    href={menu.href || "/"}
                                    className={`h-9 font-medium rounded-md flex gap-2.5 items-center px-3 hover:bg-gray-100 ${menu.key === expandedMenu ? "bg-gray-100" : ""
                                        }`}
                                >
                                    {menu.icon}
                                    <span className="line-clamp-1">{menu.name}</span>
                                </Link>
                            )}
                            {menu.submenus && expandedMenu === menu.key && (
                                <div className="flex flex-col gap-1 mt-1">
                                    {menu.submenus.map((submenu, index) => (
                                        <Link
                                            href={submenu.href || "#"}
                                            key={index}
                                            className="ml-0.5 h-8 font-medium flex items-center px-4 gap-2.5"
                                        >
                                            <span className="h-9 w-[1px] bg-gray-200 mr-[11px]"></span>
                                            <span className="line-clamp-1">{submenu.name}</span>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="flex flex-col justify-center gap-2 px-3 border-t pt-2">
                    {settingMenu.map((menu) => (
                        menu.onClick ? (
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <button
                                        key={menu.key}
                                        className="h-9 font-medium rounded-md flex gap-2.5 items-center px-3 hover:bg-gray-100"
                                    >
                                        {menu.icon}
                                        <span className="line-clamp-1">{menu.name}</span>
                                    </button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Đăng xuất?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Bạn có chắc chắn muốn đăng xuất không?
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={menu.onClick} className="text-white">Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        ) : (
                            <Link
                                href={menu.href || "#"}
                                key={menu.key}
                                className="h-9 font-medium rounded-md flex gap-2.5 items-center px-3 hover:bg-gray-100"
                            >
                                {menu.icon} <span className="line-clamp-1">{menu.name}</span>
                            </Link>
                        )
                    ))}
                </div>
            </div>
        </nav>
    );
}
