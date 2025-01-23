import React, { use } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@heroui/react";
import { CiTrash } from "react-icons/ci";
import { deleteProductAction } from "./deleteProductAction";
import { UserContext } from "@/contexts/UserContext";
import { toast } from "sonner";

type Props = {
    slug: Product["product"]["slug"];
};

export default function DeleteProductBtn({ slug }: Props) {
    const useUser = use(UserContext);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button isIconOnly onPress={onOpen}>
                <CiTrash />
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Confirm To Delete Product?
                            </ModalHeader>
                            <ModalBody>
                                <p>
                                    Are you sure you want to delete this
                                    product?
                                    <br />
                                    This action is irreversible.
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
                                        const res = await deleteProductAction(
                                            {
                                                user_id: useUser?.user?.id,
                                            },
                                            slug
                                        );
                                        if (res.status === 200) {
                                            toast.success(res.message);
                                            useUser?.ticktock();
                                        } else {
                                            toast.error(res.message);
                                        }
                                        onClose();
                                    }}>
                                    Delete
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
