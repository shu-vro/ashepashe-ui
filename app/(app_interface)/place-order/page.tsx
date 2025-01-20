"use client";

import React, { useEffect, useState } from "react";
import {
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Form,
    Image,
    Input,
    Textarea,
    ScrollShadow,
    Selection,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    User,
    Chip,
    Tooltip,
} from "@heroui/react";
import { dynamicFakeImageGenerator } from "@/lib/utils";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";

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

function QuantityButtons({
    item,
    setItems,
}: {
    item: any;
    setItems: (arg0: any) => any;
}) {
    return (
        <ButtonGroup size="sm">
            <Button
                isIconOnly
                onPress={() => {
                    setItems((prev: any) => {
                        const index = prev.findIndex(
                            (i: any) => i.item.id === item.item.id
                        );
                        prev[index].count -= 1;
                        return prev;
                    });
                }}>
                <FaMinus />
            </Button>
            <Button isIconOnly disabled>
                {item.count}
            </Button>
            <Button
                isIconOnly
                onPress={() => {
                    setItems((prev: any) => {
                        const index = prev.findIndex(
                            (i: any) => i.item.id === item.item.id
                        );
                        prev[index].count += 1;
                        return prev;
                    });
                }}>
                <FaPlus />
            </Button>
        </ButtonGroup>
    );
}

function OrderTable({}) {
    const [items, setItems] = useState<any[]>([
        {
            count: 1,
            item: {
                id: 34,
                company_id: 18,
                name: "AVA meal 1",
                description: "Gluten-free, contains dairy.Price: $15.99",
                price: 200,
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
        },
        {
            count: 2,
            item: {
                id: 35,
                company_id: 18,
                name: "AVA meal 2",
                description: "Gluten-free, contains dairy.Price: $15.99",
                price: 200,
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
        },
    ]);
    const [selected, setSelected] = useState<Selection>(new Set<string>([]));
    const DeleteSelected = () => {
        return (
            <Button
                color="danger"
                onPress={() => {
                    setItems((prev: any) =>
                        prev.filter(
                            (i: any) =>
                                !(selected as Set<string>).has(
                                    i.item.id.toString()
                                )
                        )
                    );
                }}>
                Delete Selected
            </Button>
        );
    };

    return (
        <Table
            isHeaderSticky
            aria-label="Example table with custom cells"
            selectionMode="multiple"
            classNames={{
                wrapper: "max-h-[500px]",
            }}
            topContent={
                <div>
                    <DeleteSelected />
                </div>
            }
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
            <TableBody items={items}>
                {(item) => (
                    <TableRow key={item.item.id}>
                        <TableCell>
                            <div className="flex justify-start">
                                <User
                                    avatarProps={{
                                        radius: "lg",
                                        src: item.item.image1!,
                                    }}
                                    description={"৳ " + item.item.price}
                                    name={item.item.name}
                                    classNames={{
                                        name: "text-start",
                                        description: "text-start",
                                    }}
                                />
                            </div>
                        </TableCell>
                        <TableCell>
                            <ButtonGroup size="sm">
                                <Button
                                    isIconOnly
                                    onPress={() => {
                                        setItems((prevItems) => {
                                            let prev = [...prevItems];
                                            const index = prev.findIndex(
                                                (i) =>
                                                    i.item.id === item.item.id
                                            );
                                            prev[index].count -= 1;
                                            return prev;
                                        });
                                    }}>
                                    <FaMinus />
                                </Button>
                                <Button isIconOnly disabled>
                                    {item.count}
                                </Button>
                                <Button
                                    isIconOnly
                                    onPress={() => {
                                        setItems((prevItems) => {
                                            let prev = [...prevItems];
                                            const index = prev.findIndex(
                                                (i) =>
                                                    i.item.id === item.item.id
                                            );
                                            prev[index].count += 1;
                                            return prev;
                                        });
                                    }}>
                                    <FaPlus />
                                </Button>
                            </ButtonGroup>
                        </TableCell>
                        <TableCell>
                            <Chip color="primary" size="sm">
                                ৳ {item.item.price * item.count}
                            </Chip>
                        </TableCell>
                        <TableCell>
                            <div className="relative flex items-center gap-2 justify-end">
                                <Tooltip
                                    color="danger"
                                    content="Remove From Cart">
                                    <Button
                                        isIconOnly
                                        size="sm"
                                        color="danger"
                                        variant="flat"
                                        onPress={() => {
                                            setItems((prev: any) =>
                                                prev.filter(
                                                    (i: any) =>
                                                        i.item.id !==
                                                        item.item.id
                                                )
                                            );
                                        }}>
                                        <FaRegTrashAlt />
                                    </Button>
                                </Tooltip>
                            </div>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}

export default function Page() {
    return (
        <div className="flex justify-center items-start flex-row max-md:flex-col m-6 gap-6">
            <Form
                validationBehavior="native"
                className="w-full gap-4"
                onSubmit={(e) => {
                    e.preventDefault();
                    console.log("Order Placed");
                }}>
                <Input
                    label="Full Name"
                    placeholder="Your Name"
                    labelPlacement="outside"
                    variant="faded"
                    radius="sm"
                />
                <Input
                    label="Mobile Number"
                    placeholder="01xxxxxxxxx"
                    labelPlacement="outside"
                    variant="faded"
                    radius="sm"
                />
                <Textarea
                    variant="faded"
                    label="Full Address"
                    labelPlacement="outside"
                    placeholder="Full Address"
                    radius="sm"></Textarea>
                <div className="flex justify-between items-center w-full">
                    <div className="grow" />
                    <Button
                        variant="shadow"
                        color="primary"
                        className="font-bold"
                        type="submit">
                        Place Order
                    </Button>
                </div>
            </Form>
            <div className="w-full">
                <OrderTable />
                <div className="flex justify-between items-center w-full mt-4">
                    <div className="grow" />
                    <div className="text-warning text-2xl">Price: 1122</div>
                </div>
            </div>
        </div>
    );
}
