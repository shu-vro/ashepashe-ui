import { CartContext } from "@/contexts/CartContext";
import { Button, ButtonGroup } from "@heroui/react";
import React, { use } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";

export default function QuantityButtons({
    item,
    setItems,
}: {
    item: any;
    setItems: (arg0: any) => any;
}) {
    const useCart = use(CartContext);
    if (!useCart) return null;
    return (
        <ButtonGroup size="sm" color="secondary" variant="flat">
            <Button
                isIconOnly
                onPress={() => {
                    useCart.updateCount(item.item.id, -1);
                    // setItems((prev: any) => {
                    //     const newItems = prev.map((i: any) => {
                    //         if (i.item.id === item.item.id) {
                    //             return { ...i, count: i.count - 1 };
                    //         }
                    //         return i;
                    //     });
                    //     return newItems;
                    // });
                }}>
                <FaMinus />
            </Button>
            <Button isIconOnly disabled>
                {item.count}
            </Button>
            <Button
                isIconOnly
                onPress={() => {
                    useCart.updateCount(item.item.id, 1);
                    // setItems((prev: any) => {
                    //     const newItems = prev.map((i: any) => {
                    //         if (i.item.id === item.item.id) {
                    //             return { ...i, count: i.count + 1 };
                    //         }
                    //         return i;
                    //     });
                    //     return newItems;
                    // });
                }}>
                <FaPlus />
            </Button>
        </ButtonGroup>
    );
}
