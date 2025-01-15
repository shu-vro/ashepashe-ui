"use client";

import React from "react";
import { Tabs, Tab } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function CustomNavigationTabs({
    sidebarItems,
}: {
    sidebarItems: Partial<Category>[];
}) {
    const pathName = usePathname();
    return (
        <Tabs
            aria-label="navigation items"
            variant="underlined"
            items={sidebarItems}
            selectedKey={pathName}>
            {(item) => (
                <Tab
                    key={item.id}
                    title={item.name}
                    as={Link}
                    href={item.id!.toString()}></Tab>
            )}
        </Tabs>
    );
}
