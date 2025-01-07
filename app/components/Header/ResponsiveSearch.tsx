"use client";

import ThemeButton from "../ThemeButton";
import { CiBookmark } from "react-icons/ci";
import { NavbarItem, Button, Divider, useDisclosure } from "@nextui-org/react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import LoginButton from "./LoginButton";
import UserDropdown, { CreateStoreModal } from "./UserDropdown";
import { useRouter } from "next/navigation";
import { use } from "react";
import { UserContext } from "@/contexts/UserContext";

export default function ResponsiveButtons({}) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { push } = useRouter();
    const useUser = use(UserContext);
    return (
        <>
            <NavbarItem>
                <Button
                    as={Link}
                    color="primary"
                    href="#"
                    variant="flat"
                    isIconOnly
                    className="text-xl mob:text-2xl">
                    <CiBookmark />
                </Button>
            </NavbarItem>
            <CustomDivider />
            <NavbarItem>
                <ThemeButton />
            </NavbarItem>
            <CustomDivider />
            <Button
                color="primary"
                variant="flat"
                onPress={() => {
                    if (!useUser?.userCompany) {
                        onOpen();
                    } else {
                        push("/my-store/update");
                    }
                }}>
                {!useUser?.userCompany ? "Create Store" : "My Store"}
            </Button>
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
