"use client";

import OrderTable from "@/app/(individual_store_interface)/place-order/components/OrderTable";
import { OrderDrawerContext } from "@/contexts/OrderDrawerContext";
import {
    Button,
    Divider,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
} from "@heroui/react";
import React, { use } from "react";

export default function OrderSidebar() {
    const od = use(OrderDrawerContext);
    if (!od) {
        return null;
    }
    return (
        <Drawer
            isOpen={od.isOrderDrawerOpen}
            size="2xl"
            onOpenChange={od.onOrderDrawerOpenChange}>
            <DrawerContent className="border-l-2 border-y-2 border-content3">
                {(onClose) => (
                    <DrawerBody>
                        <div className="w-full rounded-md">
                            <DrawerHeader className="flex flex-col p-0 m-0">
                                <h2 className="text-xl">Order List</h2>
                            </DrawerHeader>
                            <Divider className="my-6" />
                            <OrderTable fullHeight />
                        </div>
                        <DrawerFooter className="flex justify-between items-center flex-wrap flex-row">
                            <div />
                            <Button
                                color="warning"
                                onPress={onClose}
                                // className="sticky bottom-0"
                            >
                                Close
                            </Button>
                        </DrawerFooter>
                    </DrawerBody>
                )}
            </DrawerContent>
        </Drawer>
    );
}
