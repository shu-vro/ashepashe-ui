import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from "@nextui-org/react";
import { WritableField } from "./Writable";
import { use, useState } from "react";
import EditProduct from "./EditProduct";
import { deleteSectionAction } from "./deleteSectionAction";
import { toast } from "sonner";
import { updateSectionAction } from "./updateSectionAction";
import { UserContext } from "@/contexts/UserContext";
import { ProductForm } from "./EditProductBtn";
import { CompanySection } from "./AllCategories";
import { createProductAction } from "./createProductAction";

function UpdateCategory({ section }: { section: Category }) {
    const [sectionName, setSectionName] = useState(section.name || "");
    const useUser = use(UserContext);
    return (
        <div className="w-full">
            <div className="more-product grid-in-more my-6">
                <h2 className="text-2xl font-bold text-default-400 ml-4 flex flex-wrap justify-between items-center gap-2">
                    <div className="grow">
                        <WritableField
                            component={Input}
                            props={{
                                inputProps: {
                                    label: "Section Name",
                                    value: sectionName,
                                    onValueChange: setSectionName,
                                },
                            }}>
                            {sectionName}
                        </WritableField>{" "}
                        ({0})
                    </div>
                    <Button
                        color="secondary"
                        variant="flat"
                        onPress={async () => {
                            const res = await updateSectionAction({
                                name: sectionName,
                                sectionId: section.id,
                            });

                            if (res.status === 200) {
                                toast.success(res.message);
                                useUser?.ticktock();
                            } else {
                                toast.error(res.message);
                            }
                        }}>
                        Update
                    </Button>
                    <Button
                        color="danger"
                        variant="flat"
                        onPress={async () => {
                            const res = await deleteSectionAction({
                                sectionId: section.id,
                            });

                            if (res.status === 200) {
                                toast.success(res.message);
                                useUser?.ticktock();
                            } else {
                                toast.error(res.message);
                            }
                        }}>
                        Delete
                    </Button>
                </h2>
            </div>
        </div>
    );
}

export default function CategoryEditSection({
    section,
}: {
    section: CompanySection;
}) {
    const useUser = use(UserContext);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <div>
            <UpdateCategory section={section} />
            <div className="flex flex-wrap justify-start items-center w-full gap-2">
                <Button
                    className="w-full h-48 text-4xl font-bold"
                    onPress={onOpen}>
                    Create Product
                </Button>
                <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">
                                    Create Product
                                </ModalHeader>
                                <ProductForm
                                    submitText="Create Product"
                                    onClose={onClose}
                                    onSubmit={async (payload) => {
                                        if (!payload.image) {
                                            throw new Error(
                                                "Please upload an image."
                                            );
                                        }
                                        if (!payload.name) {
                                            throw new Error(
                                                "Please Enter a valid name."
                                            );
                                        }
                                        if (!payload.price) {
                                            throw new Error(
                                                "Please Enter a valid price."
                                            );
                                        }
                                        if (
                                            !useUser ||
                                            !useUser.user ||
                                            !useUser.userCompany ||
                                            !section ||
                                            !payload ||
                                            !payload.price ||
                                            !payload.name ||
                                            !payload.image
                                        ) {
                                            throw new Error(
                                                "Some Fields are missing.",
                                                {
                                                    cause: "This error happened because you missed some REQUIRED fields empty. If this error happens over and over, please logout and login again. Also, make sure that you have created your store.",
                                                }
                                            );
                                        }
                                        const customPayload = {
                                            name: payload.name,
                                            description: payload.description,
                                            price: parseFloat(payload.price),
                                            section_id: section.id,
                                            image1: payload.image,
                                            user_id: useUser?.user?.id,
                                            company_id:
                                                useUser?.userCompany?.id,
                                        };
                                        const res = await createProductAction(
                                            customPayload
                                        );
                                        if (res.status === 200) {
                                            toast.success(res.message);
                                            useUser?.ticktock();
                                        } else {
                                            toast.error(res.message);
                                        }
                                    }}
                                />
                            </>
                        )}
                    </ModalContent>
                </Modal>
                {section.products.map((product) => (
                    <EditProduct key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
