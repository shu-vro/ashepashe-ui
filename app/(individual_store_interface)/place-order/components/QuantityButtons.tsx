import { CartContext } from "@/contexts/CartContext";
import { Button, ButtonGroup } from "@heroui/react";
import React, { use } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { toast } from "sonner";

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
                    if (item.count === 1) {
                        return toast.error("Minimum quantity reached", {
                            description: "Delete the cart item to remove it",
                        });
                    }
                    useCart.updateCount(item.item.id, -1);
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
                }}>
                <FaPlus />
            </Button>
        </ButtonGroup>
    );
}
