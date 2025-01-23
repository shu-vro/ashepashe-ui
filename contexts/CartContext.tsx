"use client";

import useLocalStorage from "@/hooks/useLocalStorage";
import React, { createContext } from "react";

export type CartContextType = {
    cart: Cart[];
    addToCart: (productId: number, count: number) => void;
};

export const CartContext = createContext<CartContextType | null>(null);

export default function CartProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [cart, setCart] = useLocalStorage("cart", []);

    const addToCart = (productId: number, count: number) => {
        setCart((prevCart: Cart[]) => {
            const existingProductIndex = prevCart.findIndex(
                (item) => item.productId === productId
            );

            if (existingProductIndex !== -1) {
                // Update the count of the existing product
                const updatedCart = [...prevCart];
                updatedCart[existingProductIndex].count += count;
                return updatedCart;
            } else {
                // Add the new product to the cart
                return [...prevCart, { productId, count }];
            }
        });
    };

    return (
        <CartContext.Provider value={{ cart, addToCart }}>
            {children}
        </CartContext.Provider>
    );
}
