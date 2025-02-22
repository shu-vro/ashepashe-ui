"use client";

import React, { useEffect, useRef, useState } from "react";
import mapboxgl, { Map } from "mapbox-gl";
// import Map from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import { SelectLocationProp } from "./SelectLocation";
import MapSearchBox from "./MapSearchBox";

export default function MapboxExample({
    setInnerLocation,
    location,
    innerLocation,
}: {
    setInnerLocation: SelectLocationProp["setLocation"];
    location: SelectLocationProp["location"];
    innerLocation: SelectLocationProp["location"];
}) {
    const mapContainerRef = useRef(null);
    const mapRef = useRef<Map>(null);

    useEffect(() => {
        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN!;

        mapRef.current = new mapboxgl.Map({
            style: "mapbox://styles/mapbox/light-v11",
            center: [innerLocation.long, innerLocation.lat],
            zoom: 18,
            pitch: 45,
            bearing: -17.6,
            container: "map",
            antialias: true,
        });

        const map = mapRef.current!;

        map.on("style.load", () => {
            if (!map) return;
            const layers = map.getStyle()?.layers;
            if (!layers) return;
            const labelLayerId = layers.find(
                (layer) =>
                    layer?.type === "symbol" && layer.layout?.["text-field"]
            )?.id;

            map.addLayer(
                {
                    id: "add-3d-buildings",
                    source: "composite",
                    "source-layer": "building",
                    filter: ["==", "extrude", "true"],
                    type: "fill-extrusion",
                    minzoom: 15,
                    paint: {
                        "fill-extrusion-color": "#aaa",
                        "fill-extrusion-height": [
                            "interpolate",
                            ["linear"],
                            ["zoom"],
                            15,
                            0,
                            15.05,
                            ["get", "height"],
                        ],
                        "fill-extrusion-base": [
                            "interpolate",
                            ["linear"],
                            ["zoom"],
                            15,
                            0,
                            15.05,
                            ["get", "min_height"],
                        ],
                        "fill-extrusion-opacity": 0.6,
                    },
                },
                labelLayerId
            );
        });

        // map.on("click", "add-3d-buildings", (e) => {
        //     // Query the features at the clicked point
        //     const features = map.queryRenderedFeatures(e.point, {
        //         layers: ["add-3d-buildings"],
        //     });

        //     if (features.length > 0) {
        //         const feature = features[0];

        //         // Create a popup
        //         new mapboxgl.Popup()
        //             .setLngLat(e.lngLat)
        //             .setHTML(
        //                 `<h3>Building Height: ${feature.properties?.height}m</h3>`
        //             )
        //             .addTo(map);
        //     }
        // });

        // Change the cursor to a pointer when hovering over the 3D buildings layer
        map.on("mouseenter", "add-3d-buildings", () => {
            map.getCanvas().style.cursor = "pointer";
        });

        // Change it back to the default cursor when it leaves the 3D buildings layer
        map.on("mouseleave", "add-3d-buildings", () => {
            map.getCanvas().style.cursor = "";
        });

        // Add a marker for "home"
        const marker = new mapboxgl.Marker()
            .setLngLat([location.long, location.lat]) // Set the longitude and latitude for your "home" location
            .addTo(map);

        const selLoc = (e: mapboxgl.MapMouseEvent) => {
            const lng = e.lngLat.lng;
            const lat = e.lngLat.lat;
            marker.setLngLat([lng, lat]);
            setInnerLocation({ lat, long: lng });
        };

        map.on("click", selLoc);

        return () => mapRef.current?.remove();
    }, []);

    useEffect(() => {
        mapRef.current!.flyTo({
            center: [innerLocation.long, innerLocation.lat],
            zoom: 18,
            speed: 0.8,
            curve: 1,
        });
        // mapRef.current?.setCenter([location.long, location.lat]);
    }, [innerLocation]);

    return (
        <>
            <MapSearchBox mapRef={mapRef} location={innerLocation} />
            <div
                id="map"
                className="w-full h-[500px] md:h-[600px] lg:h-[700px]"
                ref={mapContainerRef}></div>
        </>
    );
}
