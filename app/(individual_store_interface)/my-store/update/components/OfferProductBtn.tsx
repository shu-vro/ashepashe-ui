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
} from "@heroui/react";
import React, { use, useMemo, useState } from "react";
import { MdOutlineLocalOffer } from "react-icons/md";
import { TbCurrencyTaka } from "react-icons/tb";
import { toast } from "sonner";
import {
    now,
    getLocalTimeZone,
    DateValue,
    parseDateTime,
    parseDate,
} from "@internationalized/date";
import { createProductOffersAction } from "./createProductOffersAction";
import { UserContext } from "@/contexts/UserContext";
import { deleteOfferAction } from "./deleteOfferAction";
import { updateProductOfferAction } from "./updateProductOfferAction";

export default function OfferProductBtn({
    productId,
    currentOffer,
    currentPrice,
}: {
    productId: number;
    currentOffer?: Offer;
    currentPrice?: number;
}) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [loading, setLoading] = useState(false);
    const [discountPrice, setDiscountPrice] = useState(
        currentPrice?.toString() ||
            (
                ((currentOffer?.offer_percent || 0) * (currentPrice || 0)) /
                100
            ).toFixed()
    );
    const [validity, setValidity] = useState<DateValue | null>(
        parseDateTime(now(getLocalTimeZone()).toString().split("T")[0])
    );
    const discountPercent = useMemo(() => {
        return 100 - (Number(discountPrice) / (currentPrice || 1)) * 100;
    }, [discountPrice]);
    const useUser = use(UserContext);

    return (
        <>
            <Button
                isIconOnly
                onPress={onOpen}
                isLoading={loading}
                color={currentOffer ? "success" : "default"}>
                <MdOutlineLocalOffer />
            </Button>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <Form
                            validationBehavior="native"
                            className="block"
                            onSubmit={async (e) => {
                                e.preventDefault();
                                setLoading(true);
                                try {
                                    if (!useUser || !useUser.user?.id) {
                                        toast.error("User not found.");
                                        return;
                                    }
                                    if (currentOffer) {
                                        // {
                                        //     "product_id" : 34,
                                        //     "offer_percent": 22,
                                        //     "offer_buy" : "offer_buy",
                                        //     "validity" : "2025-01-09T19:10:39.000000Z",
                                        //         "user_id": 1
                                        // }
                                        const payload = {
                                            user_id: useUser.user?.id,
                                            product_id: productId,
                                            offer_percent: discountPercent,
                                            validity: validity
                                                ? new Date(
                                                      validity.toString()
                                                  ).toISOString()
                                                : null,
                                        };
                                        const res: any =
                                            await updateProductOfferAction(
                                                payload,
                                                currentOffer.id
                                            );
                                        if (res.status === 200) {
                                            toast.success(res.message);
                                            useUser.ticktock();
                                            onClose();
                                        } else {
                                            toast.error(
                                                `Error(${res.status}) ` +
                                                    res.message
                                            );
                                        }
                                    } else {
                                        const payload = {
                                            user_id: useUser.user?.id,
                                            product_id: productId,
                                            offer_percent: discountPercent,
                                            validity: validity
                                                ? new Date(
                                                      validity.toString()
                                                  ).toISOString()
                                                : null,
                                        };
                                        // return console.log(payload);
                                        const res: any =
                                            await createProductOffersAction(
                                                payload
                                            );

                                        if (res.status === 201) {
                                            toast.success(res.message);
                                            useUser.ticktock();
                                            onClose();
                                        } else {
                                            toast.error(
                                                `Error(${res.status}) ` +
                                                    res.message
                                            );
                                        }
                                    }
                                } catch (error) {
                                } finally {
                                    setLoading(false);
                                }
                            }}>
                            <ModalHeader className="flex flex-col gap-1">
                                Offer Product
                            </ModalHeader>
                            <ModalBody>
                                <div className="flex flex-row justify-start items-center gap-6">
                                    <span>Current Price:</span>{" "}
                                    <Badge
                                        color="primary"
                                        content={`${Math.round(
                                            discountPercent
                                        )}% discount`}
                                        size="lg"
                                        classNames={{
                                            badge: "-right-8 -top-1",
                                        }}>
                                        <div className="text-primary text-3xl">
                                            {currentPrice}
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
                                    value={validity}
                                    onChange={setValidity}
                                />
                            </ModalBody>
                            <ModalFooter>
                                {currentOffer && (
                                    <Button
                                        autoFocus
                                        color="danger"
                                        isLoading={loading}
                                        onPress={async () => {
                                            setLoading(true);
                                            try {
                                                if (
                                                    !currentOffer?.id ||
                                                    !useUser
                                                ) {
                                                    return toast.error(
                                                        "Offer not found."
                                                    );
                                                }
                                                const res =
                                                    await deleteOfferAction({
                                                        offerId:
                                                            currentOffer?.id,
                                                        userId: useUser?.user
                                                            ?.id,
                                                    });

                                                if (res.status === 200) {
                                                    toast.success(res.message);
                                                    useUser.ticktock();
                                                    onClose();
                                                } else {
                                                    toast.error(
                                                        `Error(${res.status}) ` +
                                                            res.message
                                                    );
                                                }
                                            } catch (error) {
                                            } finally {
                                                setLoading(false);
                                            }
                                        }}>
                                        Delete Offer
                                    </Button>
                                )}
                                <Button
                                    autoFocus
                                    color="success"
                                    type="submit"
                                    isLoading={loading}>
                                    {currentOffer
                                        ? "Update Offer"
                                        : "Create Offer"}
                                </Button>
                            </ModalFooter>
                        </Form>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
