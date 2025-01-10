import {
    Button,
    Card,
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

function UpdateCategory({ section }: { section: CompanySection }) {
    const [sectionName, setSectionName] = useState(section.name || "");
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const {
        isOpen: isCreateProductOpen,
        onOpen: onCreateProductOpen,
        onOpenChange: onCreateProductOpenChange,
    } = useDisclosure();
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
                        ({section.products.length})
                    </div>
                    <Button
                        color="secondary"
                        variant="flat"
                        onPress={async () => {
                            if (sectionName === section.name) {
                                toast.error("No changes detected.");
                                return;
                            }
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
                    <Button color="danger" variant="flat" onPress={onOpen}>
                        Delete
                    </Button>
                    <Modal
                        isOpen={isOpen}
                        onOpenChange={onOpenChange}
                        backdrop="blur">
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1">
                                        Confirm To Delete Section "
                                        {section.name}" ?
                                    </ModalHeader>
                                    <ModalBody>
                                        <p>
                                            This will delete all the products in
                                            this section and{" "}
                                            <span className="uppercase text-warning">
                                                this action is irreversible!
                                            </span>
                                            <br />
                                            Are you absolutely sure?
                                        </p>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button
                                            color="warning"
                                            variant="light"
                                            onPress={onClose}>
                                            Close
                                        </Button>
                                        <Button
                                            color="danger"
                                            onPress={async () => {
                                                const res =
                                                    await deleteSectionAction({
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
                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
                    </Modal>

                    <Button
                        color="primary"
                        variant="flat"
                        className="font-bold"
                        onPress={onCreateProductOpen}>
                        Create Product
                    </Button>
                    <Modal
                        isOpen={isCreateProductOpen}
                        onOpenChange={onCreateProductOpenChange}>
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
                                                description:
                                                    payload.description,
                                                price: parseFloat(
                                                    payload.price
                                                ),
                                                section_id: section.id,
                                                image1: payload.image,
                                                user_id: useUser?.user?.id,
                                                company_id:
                                                    useUser?.userCompany?.id,
                                            };
                                            const res =
                                                await createProductAction(
                                                    customPayload
                                                );
                                            if (res.status === 200) {
                                                toast.success(res.message);
                                                useUser?.ticktock();
                                            } else {
                                                toast.error(
                                                    `Error(${res.status}): ` +
                                                        res.message
                                                );
                                            }
                                        }}
                                    />
                                </>
                            )}
                        </ModalContent>
                    </Modal>
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
    return (
        <div>
            <UpdateCategory section={section} />
            <div className="flex flex-wrap justify-start items-center w-full gap-2">
                {section.products.map((product) => (
                    <EditProduct key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
