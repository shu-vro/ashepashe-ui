"use client";

import React, { useState } from "react";
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
    item: any;
    setItems: any;
    columnId: string;
}) {
    if (columnId === "product") {
        return (
            <ProductTableCell
                name={item.item.name}
                price={item.item.price}
                image1={item.item.image1}
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
    const [items, setItems] = useState<any[]>(
        Array.from({ length: 5 }, (_, k) => ({
            count: k,
            item: {
                id: k,
                company_id: 18,
                name: "AVA meal 1 Gluten-free, contains dairy.Price: $15.99",
                description: "Gluten-free, contains dairy.Price: $15.99",
                price: 200 + 50 * k,
                image1: "http://jinishpati.asepashe.com/products/1732819305_7489045loaded-beef-nachos-recipe-lutzflcat4x3-6c7ba4f55c514056894c920446cfd0b2.jpg",
                image2: null,
                image3: null,
                created_at: "2024-09-04T17:59:01.000000Z",
                updated_at: "2024-11-29T05:41:45.000000Z",
                slug: "ava-meal-1",
                section_id: 11,
                company: {
                    id: 18,
                    user_id: "1",
                    name: "AVA Restaurant",
                    category: "Restaurant",
                    description:
                        "\u003Cp\u003Eএখন রাজশাহীতে পাচ্ছেন চট্টগ্রামের ঐতিহ্যবাহী মেজবানি মাংস, কালা ভুনা, গরুর মাংসের ডাল ভুনা, গরুর নলা, ছ্যাঁকা পরোটা এবং খুলনার চুইঝাল শুধুমাত্র AVA Restaurant এ\u003C/p\u003E",
                    division: "Rajshahi",
                    city: "Rajshahi",
                    image: "uploads/restaurants/AVA Restaurant.jpg",
                    iframe: "https://maps.app.goo.gl/5TCA7DCQWFGJVgGD6",
                    map: "Boro Mosjid Rd, Rajshahi",
                    lati: null,
                    longi: null,
                    created_at: "2024-09-04T17:52:57.000000Z",
                    updated_at: "2024-09-04T20:23:47.000000Z",
                    slug: "ava-restaurant",
                    status: 0,
                    phone: "01797-236655",
                    fb_page: null,
                },
                rating: [
                    {
                        id: 47,
                        user_id: 11,
                        product_id: 34,
                        rating: 3,
                        review: "Not go",
                        created_at: "2025-01-09T19:12:03.000000Z",
                        updated_at: "2025-01-09T19:12:03.000000Z",
                        user: {
                            id: 11,
                            google_id: "112851940029691679334",
                            name: "Evan purification",
                            image: "https://lh3.googleusercontent.com/a/ACg8ocLfpt0ufTWcJljtZWKh7YEPMruuagXf43FFyGo6RjALLbkb-Nhi=s96-c",
                            phone: null,
                            email: "purificationevan04@gmail.com",
                            role: "admin",
                            email_verified_at: null,
                            created_at: "2024-09-25T03:17:00.000000Z",
                            updated_at: "2024-09-25T03:17:00.000000Z",
                        },
                    },
                ],
                offers: [
                    {
                        id: 12,
                        product_id: 34,
                        offer_percent: 22,
                        offer_buy: "offer_buy",
                        validity: "2025-01-09T19:10:39.000000Z",
                        created_at: "2025-01-10T17:54:05.000000Z",
                        updated_at: "2025-01-10T17:54:05.000000Z",
                    },
                ],
            },
        }))
    );

    const [selected, setSelected] = useState<Selection>(new Set<string>([]));
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
                            setItems([]);
                            return;
                        }
                        setItems((prev: any) =>
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
                    {items.reduce((prev, curr) => {
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
            <TableBody items={items} emptyContent="No items found in cart">
                {(item) => (
                    <TableRow key={item.item.id}>
                        {(columnId) => (
                            <TableCell>
                                <TableCellCustom
                                    item={item}
                                    setItems={setItems}
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
