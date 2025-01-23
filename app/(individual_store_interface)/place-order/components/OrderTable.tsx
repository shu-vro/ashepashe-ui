"use client";

import React, { use, useState } from "react";
import {
    Button,
    Selection,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Chip,
} from "@heroui/react";
import QuantityButtons from "./QuantityButtons";
import ProductTableCell from "./ProductTableCell";
import ActionButtons from "./ActionButtons";
import { cn } from "@/lib/utils";
import { CartContext } from "@/contexts/CartContext";

const columns = [
    {
        name: "Product",
        uid: "product",
    },
    {
        name: "Quantity",
        uid: "quantity",
    },
    {
        name: "Total",
        uid: "total",
    },
    {
        name: "Action",
        uid: "action",
    },
];

function TableCellCustom({
    item,
    setItems,
    columnId,
}: {
    item: Cart;
    setItems: any;
    columnId: string;
}) {
    if (columnId === "product") {
        return (
            <ProductTableCell
                name={item.item.name}
                price={item.item.price}
                image1={item.item.image1!}
            />
        );
    } else if (columnId === "quantity") {
        return <QuantityButtons item={item} setItems={setItems} />;
    } else if (columnId === "total") {
        return (
            <Chip color="warning" variant="flat" size="sm">
                Price: ৳ {item.item.price * item.count}
            </Chip>
        );
    } else if (columnId === "action") {
        return <ActionButtons id={item.item.id} setItems={setItems} />;
    }
    return null;
}

export default function OrderTable({
    fullHeight = false,
}: {
    fullHeight?: boolean;
}) {
    const useCart = use(CartContext);

    const [selected, setSelected] = useState<Selection>(new Set<string>([]));
    if (!useCart) return null;
    const { cart, setCart } = useCart;
    const TableTopBar = () => {
        return (
            <div className="flex justify-between items-center w-full">
                <Button
                    color="danger"
                    isDisabled={
                        typeof selected !== "string" && selected.size === 0
                    }
                    onPress={() => {
                        if (selected === "all") {
                            setCart([]);
                            return;
                        }
                        setCart((prev: any) =>
                            prev.filter(
                                (i: any) => !selected.has(i.item.id.toString())
                            )
                        );
                        setSelected(new Set<string>([]));
                    }}>
                    Delete Selected
                </Button>
                <div className="text-warning text-2xl">
                    Price:{" "}
                    {cart.reduce((prev, curr) => {
                        return prev + curr.item.price * curr.count;
                    }, 0)}
                </div>
            </div>
        );
    };

    return (
        <Table
            isHeaderSticky
            aria-label="Example table with custom cells"
            selectionMode="multiple"
            classNames={{
                wrapper: cn("max-h-[500px]", fullHeight && "max-h-[100%]"),
            }}
            topContent={<TableTopBar />}
            topContentPlacement="outside"
            onSelectionChange={(selected) => {
                setSelected(selected);
            }}>
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn
                        key={column.uid}

                        // align={column.uid === "product" ? "center" : "start"}
                    >
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody items={cart} emptyContent="No items found in cart">
                {(item) => (
                    <TableRow key={item.item.id}>
                        {(columnId) => (
                            <TableCell>
                                <TableCellCustom
                                    item={item}
                                    setItems={setCart}
                                    columnId={columnId as string}
                                />
                            </TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
