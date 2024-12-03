import React, { useEffect, useRef } from "react";
import mapboxgl, { Map } from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";

const MapboxExample = () => {
    const mapContainerRef = useRef(null);
    const mapRef = useRef<Map>(null);

    useEffect(() => {
        mapboxgl.accessToken =
            "pk.eyJ1Ijoic2h1LXZybyIsImEiOiJjbHpxMWl1NGkxYTUxMmpxdWowZ3Vxajh2In0.X7PJs_zONFMSEf-SIyV8iw";

        mapRef.current = new mapboxgl.Map({
            style: "mapbox://styles/mapbox/light-v11",
            center: [-74.0066, 40.7135],
            zoom: 15.5,
            pitch: 45,
            bearing: -17.6,
            container: "map",
            antialias: true,
        });

        mapRef.current.on("style.load", () => {
            if (!mapRef.current) return;
            const layers = mapRef.current.getStyle()?.layers;
            if (!layers) return;
            const labelLayerId = layers.find(
                (layer) =>
                    layer?.type === "symbol" && layer.layout?.["text-field"]
            )?.id;

            mapRef.current.addLayer(
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

        return () => mapRef.current?.remove();
    }, []);

    return (
        <div id="map" ref={mapContainerRef} style={{ height: "100%" }}></div>
    );
};

export default MapboxExample;
