import { SearchBox } from "@mapbox/search-js-react";
import { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { Button, Tooltip } from "@heroui/react";
import { SlTarget } from "react-icons/sl";
import { toast } from "sonner";

const MapSearchBox = ({
    mapRef,
    location = { lat: 0, long: 0 },
}: {
    mapRef: React.RefObject<mapboxgl.Map | null>;
    location: { lat: number; long: number };
}) => {
    useEffect(() => {
        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN!;
    }, []);

    const handleRetrieve = (result) => {
        if (result && result.features && result.features[0]) {
            const [lng, lat] = result.features[0].geometry.coordinates;
            mapRef.current!.flyTo({
                center: [lng, lat],
                zoom: 18,
                speed: 0.8,
                curve: 1,
                essential: true,
            });
        }
    };
    return (
        <div className="flex justify-stretch items-center gap-2">
            <div className="grow">
                <SearchBox
                    accessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN!}
                    onRetrieve={handleRetrieve}
                    options={{
                        language: "en",
                        country: "BD",
                        proximity: [location.long, location.lat],
                        // types: new Set([
                        //     "address",
                        //     "block",
                        //     "country",
                        //     "district",
                        //     "locality",
                        //     "neighborhood",
                        //     "place",
                        //     "postcode",
                        //     "region",
                        //     "street",
                        // ]),
                        limit: 10,
                    }}
                    // map={mapRef.current!}
                />
            </div>
            <Tooltip content="Select location" color="secondary" showArrow>
                <Button
                    variant="solid"
                    onPress={() => {
                        if (!navigator.geolocation)
                            return toast.error(
                                "Geolocation is not supported by your browser"
                            );
                        navigator.geolocation.getCurrentPosition(
                            async (success) => {
                                // setLocation({
                                //     lat: success.coords.latitude,
                                //     long: success.coords.longitude,
                                // });
                                mapRef.current!.flyTo({
                                    center: [
                                        success.coords.longitude,
                                        success.coords.latitude,
                                    ],
                                    zoom: 18,
                                    speed: 1.5,
                                    curve: 1,
                                    essential: true,
                                });
                            },
                            (error) => {
                                toast.error(error.message);
                            }
                        );
                    }}
                    isIconOnly>
                    <SlTarget />
                </Button>
            </Tooltip>
        </div>
    );
};

export default MapSearchBox;
