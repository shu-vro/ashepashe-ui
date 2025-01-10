import {
    Badge,
    Button,
    DatePicker,
    Form,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from "@nextui-org/react";
import React, { useMemo, useState } from "react";
import { MdOutlineLocalOffer } from "react-icons/md";
import { TbCurrencyTaka } from "react-icons/tb";
import { toast } from "sonner";
import { now, getLocalTimeZone } from "@internationalized/date";

export default function OfferProductBtn() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [discountPrice, setDiscountPrice] = useState("0");
    const price = 299;
    const discountPercent = useMemo(() => {
        return (Number(discountPrice) / price) * 100;
    }, [discountPrice]);
    return (
        <>
            <Button isIconOnly onPress={onOpen}>
                <MdOutlineLocalOffer />
            </Button>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <Form validationBehavior="native" className="block">
                            <ModalHeader className="flex flex-col gap-1">
                                Offer Product
                            </ModalHeader>
                            <ModalBody>
                                <div className="flex flex-row justify-start items-center gap-6">
                                    <span>Current Price:</span>{" "}
                                    <Badge
                                        color="primary"
                                        content={`${Math.round(
                                            100 - discountPercent
                                        )}% discount`}
                                        size="lg"
                                        classNames={{
                                            badge: "-right-8 -top-1",
                                        }}>
                                        <div className="text-primary text-3xl">
                                            {price}
                                        </div>
                                    </Badge>
                                </div>
                                <Input
                                    type="number"
                                    className="max-w-full"
                                    label="Discount Price"
                                    labelPlacement="outside"
                                    value={discountPrice}
                                    onValueChange={setDiscountPrice}
                                    startContent={<TbCurrencyTaka />}
                                />
                                <DatePicker
                                    hideTimeZone
                                    // showMonthAndYearPickers
                                    className="max-w-full"
                                    label="Valid Until"
                                    labelPlacement="outside"
                                    isRequired
                                    defaultValue={now(getLocalTimeZone())}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    autoFocus
                                    color="success"
                                    onPress={() => {
                                        toast.success("Product offered.");
                                        onClose();
                                    }}>
                                    Create Offer
                                </Button>
                            </ModalFooter>
                        </Form>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
