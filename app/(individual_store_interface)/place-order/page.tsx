"use client";

import {
    Button,
    Form,
    Input,
    Textarea,
    useDisclosure,
    Drawer,
    Modal,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    InputOtp,
} from "@heroui/react";
import OrderTable from "./components/OrderTable";
import { use, useState } from "react";
import { CartContext } from "@/contexts/CartContext";
import { storeOrderAction } from "./components/storeOrderAction";
import { toast } from "sonner";
import { UserContext } from "@/contexts/UserContext";
import { validatePhoneNumber } from "@/lib/utils";
import { signIn } from "next-auth/react";

export default function Page() {
    const useCart = use(CartContext);
    const useUser = use(UserContext);
    const [loading, setLoading] = useState(false);
    const { isOpen, onOpenChange, onOpen } = useDisclosure();
    return (
        <div className="flex justify-center items-start flex-row max-lg:flex-wrap m-6 gap-6">
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                You are not Signed In!
                            </ModalHeader>
                            <ModalBody>
                                <p>
                                    You need to sign in to place an order. Click
                                    the button below to sign in.
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    variant="light"
                                    onPress={onClose}>
                                    Close
                                </Button>
                                <Button
                                    color="primary"
                                    onPress={() => {
                                        signIn("google", {
                                            redirectTo: "/place-order",
                                            redirect: false,
                                        });
                                        onClose();
                                    }}>
                                    Sign Up
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <Form
                validationBehavior="native"
                className="w-full gap-4"
                onSubmit={async (e) => {
                    e.preventDefault();
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
                            useUser?.ticktock();
                        } else if (res.status === 402) {
                            onOpen();
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
                <div>
                    <p>
                        Phone Number<span className="text-danger">*</span>
                    </p>
                    <InputOtp
                        length={11}
                        size="sm"
                        label="Phone Number"
                        radius="none"
                        name="phone"
                        className="mt-0"
                        isRequired
                    />
                </div>
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
