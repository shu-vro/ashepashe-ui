"use client";

import ThemeButton from "../ThemeButton";
import { NavbarItem, Button, Divider, useDisclosure } from "@nextui-org/react";
import { cn } from "@/lib/utils";
import LoginButton from "./LoginButton";
import UserDropdown, { CreateStoreModal } from "./UserDropdown";

export default function ResponsiveButtons({}) {
    const { isOpen, onOpenChange } = useDisclosure();
    return (
        <>
            <NavbarItem>
                <ThemeButton />
            </NavbarItem>
            <CustomDivider />
            <NavbarItem>
                <LoginButton />
                <UserDropdown />
            </NavbarItem>
            <CreateStoreModal isOpen={isOpen} onOpenChange={onOpenChange} />
        </>
    );
}

function CustomDivider({ ...props }) {
    return (
        <Divider
            orientation="vertical"
            {...props}
            className={cn("h-6 max-[576px]:hidden", props?.className)}
        />
    );
}
