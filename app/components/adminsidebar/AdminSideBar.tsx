"use client"
import Link from "next/link";

import React, { useState } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  { name: "Dashboard", href: "home" },
  { name: "Role Management", href: "role" },
  { name:"User Management", href: "user" },
  { name:"Customer Management", href: "custmer" },
  { name:"Product Management", href: "product" },
  { name:"Service Management", href: "service" },
  { name:"Tag Management", href: "tag" },
  { name:"Category Management", href: "category" },
  { name:"Order Management", href: "orders" },
  { name:"HomePage Management", href: "homePageContent" },
]
// src/lib/sidebarItems.ts
import {
  LayoutDashboard,
  UserCheck,
  Users,
  UserPlus,
  Box,
  Settings,
  Tag,
  Folder,
  ShoppingCart,
  Home,
} from "lucide-react";

// {
//     group: "Tổng Quan",
//     items: [
//       { name: "Bảng điều khiển", href: "home", icon: LayoutDashboard },
//     ],
//   },

export const sidebarItems = [
  {
    group: "Đơn hàng & Trang chủ",
    items: [
      { name: "Quản lý đơn hàng", href: "orders", icon: ShoppingCart },
      { name: "Quản lý trang chủ", href: "homePageContent", icon: Home },
    ],
  },
  {
    group: "Quản trị người dùng",
    items: [
      { name: "Quản lý vai trò", href: "role", icon: UserCheck },
      { name: "Quản lý người dùng", href: "user", icon: Users },
      { name: "Quản lý khách hàng", href: "customer", icon: UserPlus },
    ],
  },
  {
    group: "Sản phẩm & dịch vụ",
    items: [
      { name: "Quản lý sản phẩm", href: "product", icon: Box },
      { name: "Quản lý dịch vụ", href: "service", icon: Settings },
      { name: "Quản lý thẻ", href: "tag", icon: Tag },
      { name: "Quản lý danh mục", href: "category", icon: Folder },
    ],
  },
];

export function AdminSideBar() {
  
  const [open, setOpen] = useState(false);
  return (
    <Sidebar className="bg-slate-900 z-[1000]">
      <SidebarTrigger className="fixed bg-primary"/>
    {/* Mobile Trigger */}
    {/* <SidebarTrigger onClick={() => setOpen(!open)} className="md:hidden p-2">
      <span className="sr-only">Toggle Menu</span>
      {/* Example hamburger icon */}
      {/* <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h16M4 12h16M4 18h16"
        ></path>
      </svg> */}
    {/* </SidebarTrigger> */}
    {/* Sidebar content */}
    <SidebarContent className="w-64 p-4 border-r md:block">
      {sidebarItems.map((group) => (
        <SidebarGroup key={group.group} className="mb-6">
          <SidebarGroupLabel className="mb-2 text-xs font-semibold text-primary uppercase tracking-wide">
            {group.group}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {group.items.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <Link href={`/admin/${item.href}`} passHref>
                    <SidebarMenuButton
                      onClick={() => setOpen(false)} // Close sidebar on mobile when a link is clicked
                      className="flex items-center p-2 hover:bg-gray-100 hover:text-black rounded-md"
                    >
                      <item.icon className="w-5 h-5 mr-2" />
                      <span>{item.name}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </SidebarContent>
  </Sidebar>
);
}