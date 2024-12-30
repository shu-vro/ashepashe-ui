import React from "react";
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

type Props = {};

export default function EditProductBtn({}: Props) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const validatePrice = (value: string) => {
        const numberValue = parseFloat(value);
        if (numberValue < 0) {
            return "Price cannot be negative";
        }
        return true;
    };
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
                            <ModalBody>
                                <Form validationBehavior="native">
                                    <label htmlFor="image1">
                                        <div className="relative">
                                            <Image
                                                isBlurred
                                                // src="afds"
                                                src={`https://placehold.co/400x300/2e2d51/3b82f6?text=4x3`}
                                                fallbackSrc={`https://placehold.co/400x300/2e2d51/3b82f6?text=4x3`}
                                                alt="placeholder image"
                                            />
                                            <Button
                                                color="primary"
                                                variant="flat"
                                                isIconOnly
                                                className="mt-2 absolute right-4 top-4 z-10">
                                                <BsUpload />
                                            </Button>
                                        </div>
                                        <input
                                            type="file"
                                            name="image1"
                                            id="image1"
                                            className="sr-only"
                                            title="Upload Image"
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
                                        errorMessage="Enter valid Price"
                                        label="Price"
                                        labelPlacement="outside"
                                        name="name"
                                        type="number"
                                        validate={validatePrice}
                                        startContent={<TbCurrencyTaka />}
                                    />
                                </Form>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    variant="light"
                                    onClick={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onClick={onClose}>
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
