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

export default function CategoryEditSection({
    section,
    id,
}: {
    section: Category["name"];
    id: Category["id"];
}) {
    const [sectionName, setSectionName] = useState(section);
    const useUser = use(UserContext);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <div>
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
                                console.log(id);
                                const res = await updateSectionAction({
                                    name: sectionName,
                                    sectionId: id,
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
                                console.log(id);
                                const res = await deleteSectionAction({
                                    sectionId: id,
                                });
                                console.log(res);
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
                                    onSubmit={(payload) => {
                                        alert(JSON.stringify(payload));
                                    }}
                                />
                            </>
                        )}
                    </ModalContent>
                </Modal>
                {Array.from({
                    length: 2,
                }).map((_, i) => (
                    <EditProduct
                        key={i}
                        product={
                            {
                                name: "Product Name",
                                price: 1000,
                                image1: "/images/placeholder.png",
                                description:
                                    "Lorem ipsum dolor sit amet consectetur adipisicingelit. Reprehenderit itaque adipisci nemo, ducimusfacere fugit! Minima tempora cupiditate explicaboconsequuntur quis ex odit officia, at quod ipsum utquaerat repellat.",
                            } as Product["product"]
                        }
                    />
                ))}
            </div>
        </div>
    );
}
