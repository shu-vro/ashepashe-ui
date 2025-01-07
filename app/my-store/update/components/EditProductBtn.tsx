import React, { useState } from "react";
import { LuPencilLine } from "react-icons/lu";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Form,
    Input,
    Textarea,
    Image,
} from "@nextui-org/react";
import { TbCurrencyTaka } from "react-icons/tb";
import { BsUpload } from "react-icons/bs";
import { onImageUpload } from "@/lib/utils";

type Props = {};

export default function EditProductBtn({}: Props) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button isIconOnly onClick={onOpen}>
                <LuPencilLine />
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Edit Product
                            </ModalHeader>
                            <ProductForm
                                onClose={onClose}
                                onSubmit={() => {}}
                            />
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export function ProductForm({
    submitText = "Submit",
    onClose,
    onSubmit,
}: {
    submitText?: string;
    onClose: () => void;
    onSubmit: (arg0: any) => void;
}) {
    const [imageUrl, setImageUrl] = useState("");
    const validatePrice = (value: string) => {
        const regex = /(^\d*$)/;
        const match = value.match(regex);
        if (!match || match[0] !== value) {
            return "Invalid Price.";
        }
        return true;
    };

    const handleImageUpload = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        onImageUpload({ e, setImageFile: setImageUrl, DIM: 1000 });
    };
    return (
        <Form
            validationBehavior="native"
            onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const payload = Object.fromEntries(formData);
                payload["image"] = imageUrl;
                onSubmit(payload);
                onClose();
            }}>
            <ModalBody>
                <label htmlFor="image1" className="cursor-pointer">
                    <div className="relative">
                        <Image
                            isBlurred
                            src={
                                imageUrl ||
                                "https://placehold.co/400x300/2e2d51/3b82f6?text=4x3"
                            }
                            fallbackSrc={`https://placehold.co/400x300/2e2d51/3b82f6?text=4x3`}
                            alt="placeholder image"
                        />
                        <Button
                            color="primary"
                            variant="flat"
                            isIconOnly
                            className="mt-2 absolute right-4 top-4 z-10 select-none pointer-events-none">
                            <BsUpload />
                        </Button>
                    </div>
                    <input
                        type="file"
                        id="image1"
                        className="sr-only"
                        title="Upload Image"
                        accept="image/*"
                        onChange={handleImageUpload}
                    />
                </label>
                <Input
                    isRequired
                    errorMessage="Please enter a valid product name"
                    label="Product Name"
                    labelPlacement="outside"
                    name="name"
                    placeholder="Product name"
                    type="text"
                />
                <Textarea
                    errorMessage="Please enter a valid username"
                    label="Description"
                    labelPlacement="outside"
                    name="description"
                    placeholder="Product Description"
                    type="text"
                />
                <Input
                    isRequired
                    label="Price"
                    labelPlacement="outside"
                    name="price"
                    type="number"
                    validate={validatePrice}
                    startContent={<TbCurrencyTaka />}
                />
            </ModalBody>
            <ModalFooter className="w-full">
                <Button color="danger" variant="light" onPress={onClose}>
                    Close
                </Button>
                <Button color="primary" type="submit">
                    {submitText}
                </Button>
            </ModalFooter>
        </Form>
    );
}
