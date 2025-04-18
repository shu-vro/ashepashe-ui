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
} from "@heroui/react";
import { TbCurrencyTaka } from "react-icons/tb";
import { BsUpload } from "react-icons/bs";
import { onImageUpload } from "@/lib/utils";
import { UserContext } from "@/contexts/UserContext";
import { toast } from "sonner";
import { editProductAction } from "./editProductAction";
import { GoPlus } from "react-icons/go";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, EffectCoverflow, Pagination } from "swiper/modules";

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
            <Modal
                size="lg"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                scrollBehavior="outside">
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
                                        image1: payload.image1,
                                        image2: payload.image2,
                                        image3: payload.image3,
                                        user_id: useUser?.user?.id,
                                        company_id: useUser?.userCompany?.id,
                                    };
                                    console.log(customPayload);
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

function AddImageButton({ image }: { image?: Product["product"]["image1"] }) {
    return image ? (
        <img src={image} alt="preview image" className="w-20 h-20 rounded-md" />
    ) : (
        <>
            <Button
                isIconOnly
                color="primary"
                variant="flat"
                as={"span"}
                className="w-20 h-20 text-4xl">
                <GoPlus />
            </Button>
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
    const [image1Url, setImage1Url] = useState(defaultProps?.image1 || "");
    const [image2Url, setImage2Url] = useState(defaultProps?.image2 || "");
    const [image3Url, setImage3Url] = useState(defaultProps?.image3 || "");
    const [loading, setLoading] = useState(false);
    const validatePrice = (value: string) => {
        const regex = /(^\d*$)/;
        const match = value.match(regex);
        if (!match || match[0] !== value) {
            return "Invalid Price.";
        }
        return true;
    };

    const handleImageUpload = async (
        e: React.ChangeEvent<HTMLInputElement>,
        setImageFile: React.Dispatch<React.SetStateAction<string>>
    ) => {
        onImageUpload({ e, setImageFile: setImageFile, DIM: 1000 });
    };
    return (
        <Form
            validationBehavior="native"
            onSubmit={async (e) => {
                e.preventDefault();
                setLoading(true);
                const formData = new FormData(e.target as HTMLFormElement);
                const payload = Object.fromEntries(formData);

                let imgs = [image1Url, image2Url, image3Url].map(
                    (img) => img || ""
                );

                // Add images to payload
                payload["image1"] = imgs[0];
                payload["image2"] = imgs[1];
                payload["image3"] = imgs[2];

                // Validate at least one image is present
                if (!image1Url && !image2Url && !image3Url) {
                    toast.error("Please upload at least one image");
                    setLoading(false);
                    return;
                }

                try {
                    await onSubmit(payload);
                    onClose();
                } catch (e: any) {
                    toast.error(e.message, { description: e.cause });
                } finally {
                    setLoading(false);
                }
            }}>
            <ModalBody>
                {/* <label htmlFor="image1" className="cursor-pointer">
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
                <div className="flex gap-4">
                    <Button
                        isIconOnly
                        color="primary"
                        variant="flat"
                        className="w-20 h-20 text-4xl">
                        <GoPlus />
                    </Button>
                    <Button
                        isIconOnly
                        color="primary"
                        variant="flat"
                        className="w-20 h-20 text-4xl">
                        <GoPlus />
                    </Button>
                </div> */}
                <Swiper
                    effect={"coverflow"}
                    centeredSlides={true}
                    slidesPerView={"auto"}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    pagination={true}
                    modules={[EffectCoverflow, Pagination]}
                    className="!p-[0_6rem]">
                    <SwiperSlide>
                        <label htmlFor="image1">
                            <img
                                src={
                                    image1Url ||
                                    "https://placehold.co/400x300/2e2d51/3b82f6?text=4x3"
                                }
                                alt="Product image 1"
                            />
                        </label>
                    </SwiperSlide>
                    <SwiperSlide>
                        <label htmlFor="image2">
                            <img
                                src={
                                    image2Url ||
                                    "https://placehold.co/400x300/153d1f/43b05e?text=4x3"
                                }
                                alt="Product image 2"
                            />
                        </label>
                    </SwiperSlide>
                    <SwiperSlide>
                        <label htmlFor="image3">
                            <img
                                src={
                                    image3Url ||
                                    "https://placehold.co/400x300/3b133a/ed42e9?text=4x3"
                                }
                                alt="Product image 3"
                            />
                        </label>
                    </SwiperSlide>
                </Swiper>

                <div className="flex gap-4">
                    <label htmlFor="image1" className="cursor-pointer">
                        <div className="relative">
                            {image1Url ? (
                                <img
                                    src={image1Url}
                                    alt="Product image 1"
                                    className="w-20 h-20 rounded-md object-cover"
                                />
                            ) : (
                                <Button
                                    isIconOnly
                                    color="primary"
                                    variant="flat"
                                    as={"span"}
                                    className="w-20 h-20 text-4xl">
                                    <GoPlus />
                                </Button>
                            )}
                        </div>
                        <input
                            type="file"
                            id="image1"
                            className="sr-only"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, setImage1Url)}
                        />
                    </label>

                    <label htmlFor="image2" className="cursor-pointer">
                        <div className="relative">
                            {image2Url ? (
                                <img
                                    src={image2Url}
                                    alt="Product image 2"
                                    className="w-20 h-20 rounded-md object-cover"
                                />
                            ) : (
                                <Button
                                    isIconOnly
                                    color="primary"
                                    variant="flat"
                                    as={"span"}
                                    className="w-20 h-20 text-4xl">
                                    <GoPlus />
                                </Button>
                            )}
                        </div>
                        <input
                            type="file"
                            id="image2"
                            className="sr-only"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, setImage2Url)}
                        />
                    </label>

                    <label htmlFor="image3" className="cursor-pointer">
                        <div className="relative">
                            {image3Url ? (
                                <img
                                    src={image3Url}
                                    alt="Product image 3"
                                    className="w-20 h-20 rounded-md object-cover"
                                />
                            ) : (
                                <Button
                                    isIconOnly
                                    color="primary"
                                    variant="flat"
                                    as={"span"}
                                    className="w-20 h-20 text-4xl">
                                    <GoPlus />
                                </Button>
                            )}
                        </div>
                        <input
                            type="file"
                            id="image3"
                            className="sr-only"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, setImage3Url)}
                        />
                    </label>
                </div>
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
                <Button color="primary" type="submit" isLoading={loading}>
                    {submitText}
                </Button>
            </ModalFooter>
        </Form>
    );
}
