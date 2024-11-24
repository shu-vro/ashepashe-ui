"use client";

import {
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Button } from "@nextui-org/react";
import React from "react";
import Link from "next/link";

export type AppSidebarItemsProps = { item: { title: string; url: string } };

export default function AppSidebarItems({ item }: AppSidebarItemsProps) {
    return (
        <SidebarMenuSubItem className="my-1">
            <SidebarMenuSubButton asChild>
                <Button
                    color="default"
                    variant="light"
                    as={Link}
                    className="capitalize justify-start rounded-sm text-sidebar-foreground/70 text-medium py-5"
                    href={item.url}>
                    {item.title}
                </Button>
            </SidebarMenuSubButton>
        </SidebarMenuSubItem>
    );
}
