import React from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@nextui-org/react";
import { CiTrash } from "react-icons/ci";

type Props = {};

export default function DeleteProductBtn({}: Props) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button isIconOnly onClick={onOpen}>
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
                                    onClick={onClose}>
                                    Close
                                </Button>
                                <Button color="danger" onClick={onClose}>
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
