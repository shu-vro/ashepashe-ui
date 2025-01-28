"use client";

import React, { createContext, useState } from "react";

export type OrderDrawerContextType = {
    isOrderDrawerOpen: boolean;
    onOrderDrawerOpenChange: (isOpen: boolean) => void;
    // onOrderDrawerClose: () => void;
};

export const OrderDrawerContext = createContext<OrderDrawerContextType | null>(
    null
);

export default function OrderDrawerProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    // const {
    //     isOpen: isOrderDrawerOpen,
    //     onOpenChange: onOrderDrawerOpenChange,
    //     onClose: onOrderDrawerClose,
    // } = useDisclosure();
    const [isOrderDrawerOpen, onOrderDrawerOpenChange] = useState(false);
    return (
        <OrderDrawerContext.Provider
            value={{
                isOrderDrawerOpen,
                onOrderDrawerOpenChange,
                // onOrderDrawerClose,
            }}>
            {children}
        </OrderDrawerContext.Provider>
    );
}
