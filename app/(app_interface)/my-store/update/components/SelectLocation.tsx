"use client";

import React, { useEffect, useRef } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "@heroui/react";
import mapboxgl, { Map } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxExample from "./MapboxExample";

export type SelectLocationProp = {
    isOpen: boolean;
    onOpenChange: () => void;
    location: { lat: number; long: number };
    setLocation: React.Dispatch<
        React.SetStateAction<SelectLocationProp["location"]>
    >;
};

export default function SelectLocation({
    isOpen,
    onOpenChange,
    location,
    setLocation,
}: SelectLocationProp) {
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            Select Location
                            <p className="text-neutral-400 text-sm">
                                Double Tap on any location to select it.
                            </p>
                        </ModalHeader>
                        <ModalBody>
                            <MapboxExample
                                setLocation={setLocation}
                                location={location}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="danger"
                                variant="light"
                                onPress={onClose}>
                                Close
                            </Button>
                            <Button color="primary" onPress={onClose}>
                                Select
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
