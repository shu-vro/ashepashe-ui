import { Button, Tooltip } from "@heroui/react";
import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";

export default function ActionButtons({
    setItems,
    id,
}: {
    setItems: React.Dispatch<React.SetStateAction<any[]>>;
    id: string;
}) {
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
                            setItems((prev: any) =>
                                prev.filter((i: any) => i.item.id !== id)
                            );
                        }}>
                        <FaRegTrashAlt />
                    </Button>
                </Tooltip>
            </div>
        </>
    );
}
