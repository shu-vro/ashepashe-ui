import React, { use, useState } from "react";
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
import { UserContext } from "@/contexts/UserContext";
import { toast } from "sonner";
import { editProductAction } from "./editProductAction";
import { API_URL } from "@/lib/var";

type Props = {
    defaultProps: Product["product"];
};

export default function EditProductBtn({ defaultProps }: Props) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const useUser = use(UserContext);

    return (
        <>
            <Button isIconOnly onPress={onOpen}>
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
                                onSubmit={async (payload) => {
                                    // if (!payload.image) {
                                    //     return toast.error(
                                    //         "Please upload an image."
                                    //     );
                                    // }
                                    if (
                                        !useUser ||
                                        !useUser.user ||
                                        !useUser.userCompany ||
                                        !payload ||
                                        !payload.price ||
                                        !payload.name
                                        // !payload.image
                                    )
                                        return toast.error(
                                            "Some Fields are missing.",
                                            {
                                                description:
                                                    "This error happened because you missed some REQUIRED fields empty. If this error happens over and over, please logout and login again. Also, make sure that you have created your store.",
                                            }
                                        );
                                    const customPayload = {
                                        name: payload.name,
                                        description: payload.description,
                                        price: parseFloat(payload.price),
                                        section_id: defaultProps.section_id,
                                        image1: payload.image,
                                        user_id: useUser?.user?.id,
                                        company_id: useUser?.userCompany?.id,
                                    };
                                    const data = await editProductAction(
                                        customPayload,
                                        defaultProps.slug
                                    );
                                    if (data.status === 200) {
                                        toast.success(data.message);
                                        useUser?.ticktock();
                                    } else {
                                        toast.error(data.message);
                                    }
                                }}
                                defaultProps={defaultProps}
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
    defaultProps,
}: {
    submitText?: string;
    onClose: () => void;
    onSubmit: (arg0: any) => Promise<any>;
} & Partial<Props>) {
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
            onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const payload = Object.fromEntries(formData);
                payload["image"] = imageUrl;
                try {
                    await onSubmit(payload);
                    onClose();
                } catch (e: any) {
                    toast.error(e.message, { description: e.cause });
                }
            }}>
            <ModalBody>
                <label htmlFor="image1" className="cursor-pointer">
                    <div className="relative">
                        <Image
                            isBlurred
                            src={
                                imageUrl ||
                                defaultProps?.image1 ||
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
                    defaultValue={defaultProps?.name}
                />
                <Textarea
                    errorMessage="Please enter a valid username"
                    label="Description"
                    labelPlacement="outside"
                    name="description"
                    placeholder="Product Description"
                    type="text"
                    defaultValue={defaultProps?.description}
                />
                <Input
                    isRequired
                    label="Price"
                    labelPlacement="outside"
                    name="price"
                    type="number"
                    validate={validatePrice}
                    defaultValue={defaultProps?.price?.toString()}
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
