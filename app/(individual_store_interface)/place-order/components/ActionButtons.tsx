import { CartContext } from "@/contexts/CartContext";
import { Button, Tooltip } from "@heroui/react";
import Link from "next/link";
import React, { use } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { RxExternalLink } from "react-icons/rx";

export default function ActionButtons({
    setItems,
    id,
    slug,
}: {
    setItems: React.Dispatch<React.SetStateAction<any[]>>;
    id: number;
    slug: string;
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
                <Tooltip color="primary" content="Go to Product">
                    <Button
                        isIconOnly
                        size="sm"
                        color="primary"
                        variant="flat"
                        as={Link}
                        href={`/p/${slug}`}>
                        <RxExternalLink />
                    </Button>
                </Tooltip>
            </div>
        </>
    );
}
