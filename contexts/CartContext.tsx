"use client";

import useLocalStorage from "@/hooks/useLocalStorage";
import React, { createContext } from "react";

export type CartContextType = {
    cart: Cart[];
    addToCart: (product: Product["product"], count: number) => void;
    updateCount: (productId: number, count: number) => void;
    deleteFromCart: (productId: number) => void;
    setCart: React.Dispatch<React.SetStateAction<Cart[]>>;
};

export const CartContext = createContext<CartContextType | null>(null);

export default function CartProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [cart, setCart] = useLocalStorage("cart", []);

    const addToCart = (product: Product["product"], count: number) => {
        setCart((prevCart: Cart[]) => {
            const existingProductIndex = prevCart.findIndex(
                (item) => item.item.id === product.id
            );

            if (existingProductIndex !== -1) {
                // Update the count of the existing product
                const updatedCart = [...prevCart];
                updatedCart[existingProductIndex].count += count;
                return updatedCart;
            } else {
                // Add the new product to the cart
                return [...prevCart, { item: product, count }];
            }
        });
    };

    const updateCount = (productId: number, count: number) => {
        setCart((prevCart: Cart[]) => {
            const updatedCart = prevCart.map((item) =>
                item.item.id === productId
                    ? { ...item, count: item.count + count }
                    : item
            );
            return updatedCart;
        });
    };

    const deleteFromCart = (productId: number) => {
        setCart((prevCart: Cart[]) => {
            const updatedCart = prevCart.filter(
                (item) => item.item.id !== productId
            );
            return updatedCart;
        });
    };

    return (
        <CartContext.Provider
            value={{ cart, addToCart, updateCount, deleteFromCart, setCart }}>
            {children}
        </CartContext.Provider>
    );
}
