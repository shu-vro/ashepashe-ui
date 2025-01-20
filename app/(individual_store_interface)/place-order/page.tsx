"use client";

import { Button, Form, Input, Textarea } from "@heroui/react";
import OrderTable from "./components/OrderTable";

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
            </div>
        </div>
    );
}
