import { CartContext } from "@/contexts/CartContext";
import { Button, Tooltip } from "@heroui/react";
import React, { use } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

export default function ActionButtons({
    setItems,
    id,
}: {
    setItems: React.Dispatch<React.SetStateAction<any[]>>;
    id: number;
}) {
    const useCart = use(CartContext);
    if (!useCart) return null;

    return (
        <>
            <div className="relative flex items-center gap-2 justify-end">
                <Tooltip color="danger" content="Remove From Cart">
                    <Button
                        isIconOnly
                        size="sm"
                        color="danger"
                        variant="flat"
                        onPress={() => {
                            useCart.deleteFromCart(id);
                        }}>
                        <FaRegTrashAlt />
                    </Button>
                </Tooltip>
            </div>
        </>
    );
}
