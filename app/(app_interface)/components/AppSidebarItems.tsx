"use client";

import {
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@heroui/react";
import React from "react";
import Link from "next/link";

export type AppSidebarItemsProps = { item: { title: string; url: string } };

export default function AppSidebarItems({ item }: AppSidebarItemsProps) {
    const sidebar = useSidebar();
    return (
        <SidebarMenuSubItem className="my-1">
            <SidebarMenuSubButton asChild>
                <Button
                    color="default"
                    variant="light"
                    as={Link}
                    onPress={() => {
                        sidebar.setOpenMobile(false);
                    }}
                    className="capitalize justify-start rounded-sm text-sidebar-foreground/70 text-medium py-5"
                    href={item.url}>
                    {item.title}
                </Button>
            </SidebarMenuSubButton>
        </SidebarMenuSubItem>
    );
}
