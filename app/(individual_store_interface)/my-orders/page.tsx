"use client";

import { cn } from "@/lib/utils";
import {
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Selection,
    Chip,
    Tooltip,
    Button,
    Card,
    CardBody,
    Code,
} from "@heroui/react";
import React, { use, useState } from "react";
import ProductTableCell from "../place-order/components/ProductTableCell";
import { FaRegTrashAlt } from "react-icons/fa";
import { UserContext } from "@/contexts/UserContext";
import Link from "next/link";
import { RxExternalLink } from "react-icons/rx";
import { GoPencil } from "react-icons/go";
import { deleteOrderItemAction } from "./components/deleteOrderItemAction";
import { toast } from "sonner";
import { deleteOrderAction } from "./components/deleteOrderAction";

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
        name: "Status",
        uid: "status",
    },
    {
        name: "Action",
        uid: "action",
    },
];

function chooseColor(status: string) {
    if (status === "pending") {
        return "warning";
    }
    if (status === "completed") {
        return "success";
    }
    if (status === "cancelled") {
        return "danger";
    }
    return "secondary";
}

function TableCellCustom({
    item,
    columnId,
}: {
    item: OrderItem;
    columnId: string;
}) {
    const useUser = use(UserContext);
    if (columnId === "product") {
        return (
            <ProductTableCell
                name={item.products.name}
                price={item.products.price}
                image1={item.products.image1!}
            />
        );
    } else if (columnId === "quantity") {
        return item.quantity + " pcs";
    } else if (columnId === "status") {
        return (
            <Chip color={chooseColor(item.status)} variant="flat" size="sm">
                {item.status}
            </Chip>
        );
    } else if (columnId === "total") {
        return (
            <Chip color="warning" variant="flat" size="sm">
                Price: ৳ {item.products.price * item.quantity}
            </Chip>
        );
    } else if (columnId === "action") {
        return (
            <>
                <div className="relative flex items-center gap-2 justify-end">
                    <Tooltip color="secondary" content="Edit">
                        <Button
                            isIconOnly
                            size="sm"
                            color="secondary"
                            variant="flat"
                            isDisabled={
                                item.status === "completed" ||
                                item.status === "cancelled"
                            }
                            onPress={() => {
                                // useCart.deleteFromCart(id);
                            }}>
                            <GoPencil />
                        </Button>
                    </Tooltip>
                    <Tooltip color="primary" content="Go to Product">
                        <Button
                            isIconOnly
                            size="sm"
                            color="primary"
                            variant="flat"
                            isDisabled={
                                item.status === "completed" ||
                                item.status === "cancelled"
                            }
                            as={Link}
                            href={`/p/${item.products.slug}`}>
                            <RxExternalLink />
                        </Button>
                    </Tooltip>
                    <Tooltip color="danger" content="Remove From Orders">
                        <Button
                            isIconOnly
                            size="sm"
                            color="danger"
                            variant="flat"
                            isDisabled={
                                item.status === "completed" ||
                                item.status === "cancelled"
                            }
                            onPress={async () => {
                                const res: any = await deleteOrderItemAction({
                                    order_item_id: item.id,
                                    user_id: useUser?.user?.id as number,
                                });
                                if (res.status === 200) {
                                    toast.success(res.message);
                                    useUser?.ticktock();
                                } else {
                                    toast.error(res.message);
                                    console.log(res);
                                }
                            }}>
                            <FaRegTrashAlt />
                        </Button>
                    </Tooltip>
                </div>
            </>
        );
    }
    return null;
}

function FieldValue({
    name,
    phone,
    address,
    status,
}: {
    name: React.ReactNode;
    phone: React.ReactNode;
    address: React.ReactNode;
    status: React.ReactNode;
}) {
    return (
        <>
            <Code
                color="secondary"
                size="sm"
                className="text-wrap cursor-pointer w-fit rounded-b-none">
                Name: {name}
            </Code>
            <Code
                color="secondary"
                size="sm"
                className="text-wrap cursor-pointer w-fit rounded-none">
                Phone: {phone}
            </Code>
            <Code
                color="secondary"
                size="sm"
                className="text-wrap cursor-pointer w-fit rounded-t-none rounded-bl-none">
                Address: {address}
            </Code>
            {status && (
                <Code
                    color={chooseColor(status as string)}
                    size="sm"
                    className="text-wrap cursor-pointer w-fit rounded-t-none">
                    {status}
                </Code>
            )}
        </>
    );
}

function TableTopBar({
    orderId,
    userId,
    ticktock,
}: {
    orderId: number;
    userId?: number;
    ticktock: () => void;
}) {
    return (
        <div className="mt-8 flex gap-2">
            <Button
                color="danger"
                onPress={async () => {
                    const res: any = await deleteOrderAction({
                        order_id: orderId,
                        user_id: userId,
                    });
                    if (res.status === 200) {
                        toast.success(res.message);
                        ticktock();
                    } else {
                        toast.error(res.message);
                        console.log(res);
                    }
                }}>
                Delete Order
            </Button>
            <Button color="danger" variant="flat">
                Delete Selected
            </Button>
        </div>
    );
}

export default function Page() {
    const [selected, setSelected] = useState<Selection>(new Set<string>());
    const useUser = use(UserContext);
    return (
        <div>
            <h1 className="font-bold text-3xl my-4">Orders</h1>
            <p>
                Found{" "}
                {useUser?.orders.reduce(
                    (prev, curr) => prev + curr.order_items.length,
                    0
                )}{" "}
                orders active
            </p>
            <div className="flex flex-col gap-2">
                {useUser?.orders?.length
                    ? useUser.orders.map((order) => (
                          <Card key={order.id}>
                              <CardBody>
                                  <FieldValue
                                      name={order.name}
                                      phone={order.phone}
                                      address={order.address}
                                      status={order.status}
                                  />

                                  <Table
                                      isHeaderSticky
                                      aria-label="Example table with custom cells"
                                      selectionMode="multiple"
                                      classNames={{
                                          wrapper: cn("max-h-full"),
                                      }}
                                      topContent={
                                          <TableTopBar
                                              orderId={order.id}
                                              userId={useUser.user?.id}
                                              ticktock={useUser.ticktock}
                                          />
                                      }
                                      topContentPlacement="outside"
                                      onSelectionChange={(selected) => {
                                          setSelected(selected);
                                      }}>
                                      <TableHeader columns={columns}>
                                          {(column) => (
                                              <TableColumn
                                                  key={column.uid}
                                                  align={
                                                      column.uid === "action"
                                                          ? "end"
                                                          : column.uid ===
                                                            "product"
                                                          ? "start"
                                                          : "center"
                                                  }>
                                                  {column.name}
                                              </TableColumn>
                                          )}
                                      </TableHeader>
                                      <TableBody
                                          items={order.order_items}
                                          emptyContent="No items found in cart">
                                          {(item) => (
                                              <TableRow key={item.id}>
                                                  {(columnId) => (
                                                      <TableCell>
                                                          <TableCellCustom
                                                              columnId={
                                                                  columnId as string
                                                              }
                                                              item={item}
                                                              // item={item}
                                                              // setItems={setCart}
                                                              // columnId={columnId as string}
                                                          />
                                                      </TableCell>
                                                  )}
                                              </TableRow>
                                          )}
                                      </TableBody>
                                  </Table>
                              </CardBody>
                          </Card>
                      ))
                    : "No orders found"}
            </div>
        </div>
    );
}
