"use client";

import React, { useEffect, useRef } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "@nextui-org/react";
import mapboxgl, { Map } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxExample from "./MapboxExample";

type Props = {
    isOpen: boolean;
    onOpenChange: () => void;
};

export default function SelectLocation({ isOpen, onOpenChange }: Props) {
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            Select Location
                        </ModalHeader>
                        <ModalBody>
                            <MapboxExample />
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

// function MapboxExample() {
//     const mapContainerRef = useRef(null);
//     const mapRef = useRef<Map>(null);

//     useEffect(() => {
//         mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN!;

//         mapRef.current = new mapboxgl.Map({
//             // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
//             style: "mapbox://styles/mapbox/light-v11",
//             center: [88.6283773, 24.3635683],
//             zoom: 18,
//             pitch: 45,
//             bearing: -17.6,
//             container: "map",
//             antialias: true,
//         });

//         mapRef.current.on("error", (e) => {
//             console.log(e);
//         });

//         mapRef.current.on("style.load", () => {
//             if (!mapRef.current) return;
//             const layers = mapRef.current.getStyle()?.layers;
//             if (!layers) return;
//             const labelLayerId = layers.find(
//                 (layer) =>
//                     layer?.type === "symbol" && layer.layout?.["text-field"]
//             )?.id;

//             mapRef.current.addLayer(
//                 {
//                     id: "add-3d-buildings",
//                     source: "composite",
//                     "source-layer": "building",
//                     filter: ["==", "extrude", "true"],
//                     type: "fill-extrusion",
//                     minzoom: 15,
//                     paint: {
//                         "fill-extrusion-color": "#aaa",
//                         "fill-extrusion-height": [
//                             "interpolate",
//                             ["linear"],
//                             ["zoom"],
//                             15,
//                             0,
//                             15.05,
//                             ["get", "height"],
//                         ],
//                         "fill-extrusion-base": [
//                             "interpolate",
//                             ["linear"],
//                             ["zoom"],
//                             15,
//                             0,
//                             15.05,
//                             ["get", "min_height"],
//                         ],
//                         "fill-extrusion-opacity": 0.6,
//                     },
//                 },
//                 labelLayerId
//             );
//         });

//         return () => {
//             mapRef.current?.remove();
//         };
//     }, []);

//     return (
//         <div id="map" ref={mapContainerRef} style={{ height: "100%" }}></div>
//     );
// }
