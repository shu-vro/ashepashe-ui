"use client";

import { Button, Form, Input, Textarea } from "@heroui/react";
import OrderTable from "./components/OrderTable";
import { use, useState } from "react";
import { CartContext } from "@/contexts/CartContext";
import { storeOrderAction } from "./components/storeOrderAction";
import { toast } from "sonner";
import { UserContext } from "@/contexts/UserContext";
import { validatePhoneNumber } from "@/lib/utils";

export default function Page() {
    const useCart = use(CartContext);
    const useUser = use(UserContext);
    const [loading, setLoading] = useState(false);
    return (
        <div className="flex justify-center items-start flex-row max-md:flex-col m-6 gap-6">
            <Form
                validationBehavior="native"
                className="w-full gap-4"
                onSubmit={async (e) => {
                    e.preventDefault();
                    console.log("Order Placed");
                    setLoading(true);
                    try {
                        const { name, phone, address } = Object.fromEntries(
                            new FormData(e.target as HTMLFormElement)
                        );
                        if (!useCart || !useCart.cart.length) {
                            return toast.error("Cart is empty");
                        }
                        const res: any = await storeOrderAction({
                            name,
                            phone,
                            address,
                            user_id: useUser?.user?.id,
                            products: useCart.cart.map((item) => ({
                                product_id: item.item.id,
                                quantity: item.count,
                            })),
                        });
                        console.log(res);
                        if (res.status === 201) {
                            toast.success(res.message);
                            useCart.setCart([]);
                        } else {
                            toast.error(res.message);
                        }
                    } catch (e) {
                    } finally {
                        setLoading(false);
                    }
                }}>
                <Input
                    label="Full Name"
                    placeholder="Your Name"
                    labelPlacement="outside"
                    variant="faded"
                    radius="sm"
                    name="name"
                    isRequired
                />
                <Input
                    label="Mobile Number"
                    placeholder="01xxxxxxxxx"
                    labelPlacement="outside"
                    variant="faded"
                    radius="sm"
                    name="phone"
                    isRequired
                    validate={(val) => {
                        if (!validatePhoneNumber(val) || val.length < 11) {
                            return "Invalid phone number";
                        }
                        return true;
                    }}
                />
                <Textarea
                    variant="faded"
                    label="Full Address"
                    labelPlacement="outside"
                    placeholder="Full Address"
                    radius="sm"
                    isRequired
                    name="address"></Textarea>
                <div className="flex justify-between items-center w-full">
                    <div className="grow" />
                    <Button
                        variant="shadow"
                        color="primary"
                        className="font-bold"
                        type="submit"
                        isLoading={loading}>
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
