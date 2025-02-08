"use client";

import { CiBookmark, CiShoppingCart } from "react-icons/ci";
import {
    NavbarItem,
    Button,
    Divider,
    useDisclosure,
    Badge,
    DividerProps,
} from "@heroui/react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import LoginButton from "./LoginButton";
import UserDropdown, { CreateStoreModal } from "./UserDropdown";
import { useRouter } from "next/navigation";
import { use, useMemo, useState, useEffect } from "react";
import { UserContext } from "@/contexts/UserContext";
import { useSession } from "next-auth/react";
import { OrderDrawerContext } from "@/contexts/OrderDrawerContext";
import { CartContext } from "@/contexts/CartContext";
import { useIsMobile } from "@/hooks/use-mobile";

export default function ResponsiveButtons({}) {
    const [orderCount, setOrdersCount] = useState(0);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { push } = useRouter();
    const useUser = use(UserContext);
    const { status } = useSession();
    const useOrderDrawer = use(OrderDrawerContext);
    const useCart = use(CartContext);
    const mobile_450 = useIsMobile(450);

    const ordersLength = useMemo(() => {
        return useUser?.orders.reduce((prev, curr) => {
            const validCount = curr.order_items.filter(
                (f) => f.status !== "cancelled"
            );
            return prev + validCount.length;
        }, 0);
    }, [useUser?.orders]);

    const storeId = useUser?.userCompany?.id;
    const fetchOrders = async () => {
        try {
            const response = await fetch(
                `https://asepashe.com/api/owner-order/${storeId}`
            );
            if (!response.ok) throw new Error("Failed to fetch orders");

            const data = await response.json();
            setOrdersCount(data.length); // Assuming data is an array of orders
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        if (useUser?.userCompany) fetchOrders();
    }, [useUser?.userCompany]);

    return (
        <>
            {useUser?.userCompany ? (
                <Badge
                    color="warning"
                    size="lg"
                    content={orderCount}
                    isInvisible={orderCount === 0}>
                    <Button
                        as={Link}
                        href="/my-store/list-orders"
                        color="primary"
                        variant="flat"
                        isIconOnly
                        className="text-xl">
                        <CiShoppingCart />
                    </Button>
                </Badge>
            ) : (
                <>
                    <NavbarItem>
                        <Badge
                            color="warning"
                            size="lg"
                            content={useCart?.cart?.length}
                            isInvisible={useCart?.cart?.length === 0}>
                            <Button
                                color="primary"
                                variant="flat"
                                isIconOnly
                                className="text-xl mob:text-2xl"
                                onPress={() => {
                                    if (!useOrderDrawer) return;
                                    useOrderDrawer.onOrderDrawerOpenChange(
                                        true
                                    );
                                }}>
                                <CiBookmark />
                            </Button>
                        </Badge>
                    </NavbarItem>
                    <CustomDivider className="max-mob:hidden" />
                    <NavbarItem className="max-mob:hidden">
                        <Badge
                            color="warning"
                            size="lg"
                            content={ordersLength}
                            isInvisible={ordersLength === 0}>
                            <Button
                                as={Link}
                                href="/my-orders"
                                color="primary"
                                variant="flat"
                                isIconOnly
                                className="text-xl">
                                <CiShoppingCart />
                            </Button>
                        </Badge>
                    </NavbarItem>
                </>
            )}

            {/* <CustomDivider className="max-mob:hidden" /> */}
            {/* <NavbarItem>
                <ThemeButton />
            </NavbarItem> */}
            {status === "authenticated" && (
                <>
                    <CustomDivider />
                    <Button
                        color="primary"
                        variant="flat"
                        size={mobile_450 ? "sm" : "md"}
                        onPress={() => {
                            if (!useUser?.userCompany) {
                                onOpen();
                            } else {
                                push("/my-store/update");
                            }
                        }}>
                        {!useUser?.userCompany ? "Create Store" : "My Store"}
                    </Button>
                </>
            )}
            <CustomDivider />
            <NavbarItem>
                <LoginButton />
                <UserDropdown />
            </NavbarItem>
            <CreateStoreModal isOpen={isOpen} onOpenChange={onOpenChange} />
        </>
    );
}

export function CustomDivider({ ...props }: DividerProps) {
    return (
        <Divider
            orientation="vertical"
            {...props}
            className={cn("h-6 max-[576px]:hidden", props?.className)}
        />
    );
}
