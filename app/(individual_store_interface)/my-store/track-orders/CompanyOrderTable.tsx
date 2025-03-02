"use client";

import React, { SVGProps, useEffect } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Chip,
    User,
    Pagination,
    Selection,
    ChipProps,
    SortDescriptor,
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    Card,
    CardBody,
    CardHeader,
    Image,
} from "@heroui/react";
import NextImage from "next/image";
import { changeProductStatusAction } from "./changeProductStatusAction";
import { IoSearchOutline, IoChevronDownOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { dynamicFakeImageGenerator } from "@/lib/utils";
import { UserContextType } from "@/contexts/UserContext";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
};

export const columns = [
    { name: "ORDER ITEM ID", uid: "order_item_id", sortable: true },
    { name: "PRODUCT", uid: "product", sortable: true },
    { name: "ORDERER", uid: "orderer", sortable: true },
    { name: "QUANTITY", uid: "quantity", sortable: true },
    { name: "TOTAL PRICE", uid: "totalPrice", sortable: true },
    { name: "ORDER ID", uid: "order_id", sortable: true },
    { name: "ORDERER PHONE", uid: "ordererPhone" },
    { name: "ORDERER ADDRESS", uid: "ordererAddress" },
    { name: "PRODUCT ID", uid: "product_id", sortable: true },
    { name: "CREATED_AT", uid: "created_at", sortable: true },
    { name: "STATUS", uid: "status", sortable: true },
    { name: "ACTIONS", uid: "actions" },
];

export const statusOptions = [
    { name: "Pending", uid: "pending" },
    { name: "Processing", uid: "processing" },
    { name: "Completed", uid: "completed" },
    { name: "Cancelled", uid: "cancelled" },
];

export function capitalize(s: any) {
    return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

const statusColorMap: Record<string, ChipProps["color"]> = {
    completed: "success",
    cancelled: "danger",
    pending: "warning",
    processing: "primary",
    dropped: "danger",
};

const INITIAL_VISIBLE_COLUMNS = [
    "orderer",
    "ordererPhone",
    "ordererAddress",
    "product",
    "status",
    "quantity",
    "totalPrice",
    "actions",
];

function formatDate(isoString: number) {
    const date = new Date(isoString);
    console.log(isoString);
    return date.toLocaleTimeString() + ", " + date.toLocaleDateString();
}

export default function CompanyOrderTable({
    data,
    ticktock,
}: {
    data: UserContextType["companyOrders"];
    ticktock: () => void;
}) {
    const [filterValue, setFilterValue] = React.useState("");
    const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
        new Set([])
    );
    const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
        new Set(INITIAL_VISIBLE_COLUMNS)
    );
    const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
        column: "age",
        direction: "ascending",
    });
    const [page, setPage] = React.useState(1);

    const pages = Math.ceil(data.length / rowsPerPage);

    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = React.useMemo(() => {
        if (visibleColumns === "all") return columns;

        return columns.filter((column) =>
            Array.from(visibleColumns).includes(column.uid)
        );
    }, [visibleColumns]);

    const filteredItems = React.useMemo(() => {
        let filteredUsers = [...data];

        if (hasSearchFilter) {
            filteredUsers = filteredUsers.filter((user) => {
                const searchParam = [
                    user.orderer.name,
                    user.orderer.description,
                    user.product.name,
                    user.status,
                    user.order_id,
                    user.order_item_id,
                    user.ordererPhone,
                    user.ordererAddress,
                    user.product_id,
                ]
                    .join(" ")
                    .toLowerCase();
                console.log(searchParam);
                return searchParam.includes(filterValue.toLowerCase());
            });
        }
        if (
            statusFilter !== "all" &&
            Array.from(statusFilter).length !== statusOptions.length
        ) {
            filteredUsers = filteredUsers.filter((user) =>
                Array.from(statusFilter).includes(user.status)
            );
        }

        return filteredUsers;
    }, [data, filterValue, statusFilter]);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
        return [...items].sort((a: any, b: any) => {
            let first = a[sortDescriptor.column as string] as number;
            let second = b[sortDescriptor.column as string] as number;

            if (sortDescriptor.column === "orderer") {
                first = a.orderer.name + a.orderer.description;
                second = b.orderer.name + b.orderer.description;
            } else if (sortDescriptor.column === "product") {
                first = a.product.name;
                second = b.product.name;
            }
            console.log(first, second);
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    async function changeState(item_id: string, status: string) {
        const res = await changeProductStatusAction({
            item_id,
            status,
        });
        ticktock();
        console.log(res);
    }

    const renderCell = React.useCallback((field: any, columnKey: React.Key) => {
        const cellValue = field[columnKey as string];

        // return columnKey;

        switch (columnKey) {
            case "orderer":
            case "product":
                return (
                    <User
                        avatarProps={{
                            radius: "full",
                            size: "sm",
                            src: cellValue.avatar,
                            ImgComponent: NextImage,
                            imgProps: {
                                width: 50,
                                height: 50,
                            },
                            classNames: {
                                base: "shrink-0",
                            },
                        }}
                        classNames={{
                            description: "text-default-500",
                        }}
                        description={cellValue.description}
                        name={cellValue.name}
                    />
                );
            case "status":
                return (
                    <Chip
                        className="capitalize border-none gap-1 text-default-600"
                        color={statusColorMap[cellValue]}
                        size="sm"
                        variant="dot">
                        {cellValue}
                    </Chip>
                );
            case "created_at":
                return formatDate(cellValue);
            case "actions":
                return (
                    <div className="relative flex justify-end items-center gap-2">
                        <Dropdown className="bg-background border-1 border-default-200">
                            <DropdownTrigger>
                                <Button
                                    isIconOnly
                                    radius="full"
                                    size="sm"
                                    variant="light">
                                    <BsThreeDotsVertical fontSize="1.2rem" />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                onSelectionChange={(key) =>
                                    console.log(
                                        `Item with key ${key} was selected`
                                    )
                                }>
                                <DropdownItem key="view">View</DropdownItem>
                                <DropdownItem
                                    key="pending"
                                    onPress={async () => {
                                        await changeState(
                                            field.order_item_id,
                                            "pending"
                                        );
                                    }}>
                                    Flag Pending
                                </DropdownItem>
                                <DropdownItem
                                    key="processing"
                                    onPress={async () => {
                                        await changeState(
                                            field.order_item_id,
                                            "processing"
                                        );
                                    }}>
                                    Flag Processing
                                </DropdownItem>
                                <DropdownItem
                                    key="completed"
                                    onPress={async () => {
                                        await changeState(
                                            field.order_item_id,
                                            "completed"
                                        );
                                    }}>
                                    Flag Completed
                                </DropdownItem>
                                <DropdownItem
                                    key="dropped"
                                    onPress={async () => {
                                        await changeState(
                                            field.order_item_id,
                                            "dropped"
                                        );
                                    }}>
                                    Flag Dropped
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    const onRowsPerPageChange = React.useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            setRowsPerPage(Number(e.target.value));
            setPage(1);
        },
        []
    );

    const onSearchChange = React.useCallback((value?: string) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const topContent = React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                    <Input
                        isClearable
                        classNames={{
                            base: "w-full sm:max-w-[44%]",
                        }}
                        placeholder="Search by name..."
                        size="sm"
                        startContent={<IoSearchOutline fontSize="1.3rem" />}
                        value={filterValue}
                        onClear={() => setFilterValue("")}
                        onValueChange={onSearchChange}
                    />
                    <div className="flex gap-3">
                        <Dropdown>
                            <DropdownTrigger>
                                <Button
                                    endContent={
                                        <IoChevronDownOutline className="text-small" />
                                    }
                                    size="sm"
                                    variant="flat">
                                    Status
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={statusFilter}
                                selectionMode="multiple"
                                onSelectionChange={setStatusFilter}>
                                {statusOptions.map((status) => (
                                    <DropdownItem
                                        key={status.uid}
                                        className="capitalize">
                                        {capitalize(status.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown>
                            <DropdownTrigger>
                                <Button
                                    endContent={
                                        <IoChevronDownOutline className="text-small" />
                                    }
                                    size="sm"
                                    variant="flat">
                                    Columns
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={visibleColumns}
                                selectionMode="multiple"
                                onSelectionChange={setVisibleColumns}>
                                {columns.map((column) => (
                                    <DropdownItem
                                        key={column.uid}
                                        className="capitalize">
                                        {capitalize(column.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">
                        Total {data.length} Orders total
                    </span>
                    <label className="flex items-center text-default-400 text-small">
                        Rows per page:
                        <select
                            className="bg-transparent outline-none text-default-400 text-small"
                            onChange={onRowsPerPageChange}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                    </label>
                </div>
            </div>
        );
    }, [
        filterValue,
        statusFilter,
        visibleColumns,
        onSearchChange,
        onRowsPerPageChange,
        data.length,
        hasSearchFilter,
    ]);

    const bottomContent = React.useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
                <Pagination
                    showControls
                    classNames={{
                        cursor: "bg-foreground text-background",
                    }}
                    color="default"
                    isDisabled={hasSearchFilter}
                    page={page}
                    total={pages}
                    variant="light"
                    onChange={setPage}
                />
                <span className="text-small text-default-400">
                    {selectedKeys === "all"
                        ? "All items selected"
                        : `${selectedKeys.size} of ${items.length} selected`}
                </span>
            </div>
        );
    }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

    const [selectedOrder, setSelectedOrder] = React.useState<
        (typeof data)[0] | null
    >(null);

    useEffect(() => {
        if (selectedKeys) {
            let key = Array.from(selectedKeys)[0];
            let order = data.find(
                (val) => val.order_id === parseInt(key as string)
            );
            setSelectedOrder(order || null);
        } else {
            setSelectedOrder(null);
        }
    }, [selectedKeys]);

    return (
        <>
            <Table
                aria-label="Order Table"
                bottomContent={bottomContent}
                bottomContentPlacement="outside"
                checkboxesProps={{
                    classNames: {
                        wrapper:
                            "after:bg-foreground after:text-background text-background",
                    },
                }}
                selectedKeys={selectedKeys}
                selectionMode="single"
                sortDescriptor={sortDescriptor}
                topContent={topContent}
                topContentPlacement="outside"
                onSelectionChange={setSelectedKeys}
                onSortChange={setSortDescriptor}>
                <TableHeader columns={headerColumns}>
                    {(column) => (
                        <TableColumn
                            key={column.uid}
                            align={
                                column.uid === "actions" ? "center" : "start"
                            }
                            allowsSorting={column.sortable}>
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody emptyContent={"No orders found"} items={sortedItems}>
                    {(item) => (
                        <TableRow key={item.order_id}>
                            {(columnKey) => (
                                <TableCell>
                                    {renderCell(item, columnKey)}
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Drawer
                isOpen={!!Array.from(selectedKeys).length}
                onOpenChange={() => {
                    setSelectedKeys(new Set([]));
                }}
                size="2xl">
                <DrawerContent>
                    {(onClose) => (
                        <>
                            <DrawerHeader className="flex flex-col gap-1">
                                Order Details
                            </DrawerHeader>
                            <DrawerBody>
                                <div>
                                    Order Id:{" "}
                                    <Chip>{selectedOrder?.order_id}</Chip>
                                </div>
                                <div>
                                    Created At:{" "}
                                    <Chip variant="dot">
                                        {formatDate(selectedOrder?.created_at!)}
                                    </Chip>
                                </div>
                                <Card>
                                    <CardHeader>Orderer Details</CardHeader>
                                    <CardBody className="flex flex-row flex-wrap gap-4">
                                        <Image
                                            src={
                                                selectedOrder?.orderer.avatar ||
                                                dynamicFakeImageGenerator()
                                            }
                                            width={150}
                                            height={150}
                                            as={NextImage}
                                            alt="Orderer Avatar"
                                            className="w-40 h-40"
                                        />
                                        <div className="flex flex-col gap-2">
                                            <h2 className="text-xl font-bold">
                                                {selectedOrder?.orderer.name}
                                            </h2>
                                            <p className="text-default-400">
                                                As:{" "}
                                                {
                                                    selectedOrder?.orderer
                                                        .description
                                                }
                                            </p>
                                            <p>
                                                Phone:{" "}
                                                <a
                                                    href={`tel:${selectedOrder?.ordererPhone}`}>
                                                    {
                                                        selectedOrder?.ordererPhone
                                                    }
                                                </a>
                                            </p>
                                            <p>
                                                Address:{" "}
                                                {selectedOrder?.ordererAddress}
                                            </p>
                                        </div>
                                    </CardBody>
                                </Card>
                                <Card>
                                    <CardHeader>Product Details</CardHeader>
                                    <CardBody className="flex flex-row flex-wrap gap-4">
                                        <Image
                                            src={
                                                // @ts-ignore
                                                selectedOrder?.product.avatar ||
                                                dynamicFakeImageGenerator()
                                            }
                                            width={150}
                                            height={150}
                                            as={NextImage}
                                            alt="Orderer Avatar"
                                            className="w-40 h-40"
                                        />
                                        <div className="flex flex-col gap-3">
                                            <div>
                                                Product Name:{" "}
                                                <Chip>
                                                    {
                                                        selectedOrder?.product
                                                            .name
                                                    }
                                                </Chip>
                                            </div>
                                            <div>
                                                Quantity:{" "}
                                                <Chip>
                                                    {selectedOrder?.quantity}
                                                </Chip>
                                            </div>
                                            <div>
                                                Quantity:{" "}
                                                <Chip>
                                                    {
                                                        selectedOrder?.product
                                                            .description
                                                    }
                                                </Chip>
                                            </div>
                                            <div>
                                                Total Price:{" "}
                                                <Chip>
                                                    {selectedOrder?.totalPrice}
                                                </Chip>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </DrawerBody>
                            <DrawerFooter>
                                <Button
                                    color="danger"
                                    variant="light"
                                    onPress={onClose}>
                                    Close
                                </Button>
                            </DrawerFooter>
                        </>
                    )}
                </DrawerContent>
            </Drawer>
        </>
    );
}
