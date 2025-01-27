"use client";

import {
    Autocomplete,
    AutocompleteItem,
    Button,
    Card,
    CardBody,
    Input,
    Selection,
    Textarea,
    useDisclosure,
} from "@heroui/react";
import React, { useEffect, useMemo, useState, Key, useRef, use } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineCall } from "react-icons/md";
import { PiFacebookLogoBold } from "react-icons/pi";
import { FieldWithIcon } from "@/app/(app_interface)/companies/[company]/CompanyCard";
import allLocationOptions from "@/lib/divisions.json";
import { WritableField, WritableSelect } from "./components/Writable";
import SelectLocation from "./components/SelectLocation";
import { toast } from "sonner";
import { GrSave } from "react-icons/gr";
import { API_URL } from "@/lib/var";
import { onImageUpload, validatePhoneNumber } from "@/lib/utils";
import { updateStoreAction } from "./components/updateStoreAction";
import { UserContext } from "@/contexts/UserContext";
import CreateSection from "./components/CreateSection";
import AllCategories from "./components/AllCategories";
import { uploadImageAction } from "./components/uploadImageAction";
import IndividualLink from "./components/IndividualLink";

export default function Page() {
    const useUser = use(UserContext);
    const imageRef = useRef<HTMLLabelElement>(null);
    const [companyName, setCompanyName] = useState("Company Name");
    const [phoneNumber, setPhoneNumber] = useState("01xxxxxxxxx");
    const [fbPage, setFbPage] = useState("Fb Page Link");
    const [map, setMap] = useState("Some Address");
    const [companyDescription, setCompanyDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [division, setDivision] = useState<Selection>(
        new Set<string>(["Rajshahi"])
    );
    const [district, setDistrict] = useState<Selection>(new Set<string>([]));
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [location, setLocation] = useState({
        lat: 0,
        long: 0,
    });
    const [imageFile, setImageFile] = useState<string>();
    const [selectedCategory, setSelectedCategory] = useState<
        React.Key | undefined
    >("");

    const districts = useMemo(() => {
        const selectedDistricts =
            allLocationOptions.bangladesh[
                [...division][0] as keyof typeof allLocationOptions.bangladesh
            ] || [];
        if (selectedDistricts.includes([...district][0] as string)) {
            return selectedDistricts;
        }
        setDistrict(new Set<string>([selectedDistricts[0]]));
        return selectedDistricts;
    }, [division]);

    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        (async () => {
            const response = await fetch(`${API_URL}/categories`);
            const cat = (await response.json()) as Category[];
            setCategories(cat);
        })();
    }, []);

    useEffect(() => {
        if (!useUser?.userCompany) return;
        setCompanyName(useUser.userCompany.name || companyName);
        setCompanyDescription(
            useUser.userCompany.description || companyDescription
        );
        setPhoneNumber(useUser.userCompany.phone || phoneNumber);
        setFbPage(useUser.userCompany.fb_page || fbPage);
        setMap(useUser.userCompany.map || map);
        setSelectedCategory(useUser.userCompany.category || selectedCategory);
        setDivision(
            new Set<string>([
                useUser.userCompany.division || ([...division][0] as string),
            ])
        );
        setDistrict(
            new Set<string>([
                useUser.userCompany.city || ([...district][0] as string),
            ])
        );
    }, [useUser?.userCompany]);

    const handleImageUpload = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        onImageUpload({ e, setImageFile, imageEl: imageRef.current! });
    };

    useEffect(() => {
        if (!imageFile) {
            return;
        }
        if (!useUser) {
            toast.warning("User not authenticated");
        }
        if (!useUser?.userCompany) {
            toast.warning("Company not found");
        }
        (async () => {
            const res = await uploadImageAction({
                data: imageFile,
                slug: useUser?.userCompany?.slug || "",
            });
            if (res.status === 200) {
                toast.success(res.message);
            } else {
                toast.error(`Error(${res.status}): ${res.message}`);
            }
        })();
    }, [imageFile]);

    return (
        <div className="grid grid-areas-companyLayoutNoLap grid-cols-productLayoutNoLap lap:grid-cols-productLayoutLap lap:grid-areas-companyLayoutLap gap-4 p-4">
            <label
                className="grid-in-image bg-content3 rounded-3xl h-96 relative grid place-content-center mx-auto w-full overflow-hidden bg-center bg-no-repeat bg-contain"
                ref={imageRef}
                style={{
                    backgroundImage: `url(${
                        useUser?.userCompany?.image || imageFile
                    })`,
                }}
                htmlFor="file_input">
                <div className="text-[max(5vw,10vh)] text-white/35 text-center w-full">
                    16 X 7
                </div>
                <input
                    type="file"
                    id="file_input"
                    accept="image/*"
                    className="sr-only"
                    onChange={handleImageUpload}
                />
            </label>{" "}
            <div className="grid-in-name">
                <h1 className="text-5xl font-bold my-3 mx-auto w-fit">
                    <WritableField
                        component={Input}
                        props={{
                            inputProps: {
                                // placeholder: "Company Name",
                                label: "Company Name",
                                value: companyName,
                                onValueChange: setCompanyName,
                            },
                        }}>
                        {companyName}
                    </WritableField>
                </h1>
                <div className="italic text-neutral-500 w-7/12 text-center mx-auto">
                    <WritableField
                        component={Textarea}
                        props={{
                            inputProps: {
                                // placeholder: "Facebook Page",
                                label: "Description",
                                placeholder:
                                    "Write your company description here",
                                value: companyDescription,
                                onValueChange: setCompanyDescription,
                            },
                            textProps: {
                                style: {
                                    whiteSpace: "pre-wrap",
                                },
                            },
                        }}>
                        {companyDescription}
                    </WritableField>
                </div>
            </div>
            <Card
                className="static lap:sticky top-24 grid-in-company h-min mt-6 ml-6 max-lap:mr-6 p-4 mb-10"
                shadow="sm">
                <CardBody className="overflow-visible gap-4">
                    <div className="max-lap:hidden">
                        <h3 className="text-2xl font-bold">
                            <WritableField
                                component={Input}
                                props={{
                                    inputProps: {
                                        // placeholder: "Company Name",
                                        label: "Company Name",
                                        value: companyName,
                                        onValueChange: setCompanyName,
                                    },
                                }}>
                                {companyName}
                            </WritableField>
                        </h3>
                        <div className="text-neutral-500 italic">
                            <WritableField
                                component={Textarea}
                                props={{
                                    inputProps: {
                                        // placeholder: "Facebook Page",
                                        label: "Description",
                                        value: companyDescription,
                                        onValueChange: setCompanyDescription,
                                    },
                                }}>
                                {companyDescription}
                            </WritableField>
                        </div>
                    </div>
                    <IndividualLink slug={useUser?.userCompany?.slug || ""} />
                    <Autocomplete
                        allowsCustomValue
                        label="Select Category"
                        className="max-w-xs"
                        selectedKey={
                            typeof selectedCategory === "string"
                                ? selectedCategory
                                : undefined
                        }
                        onSelectionChange={(key) => {
                            setSelectedCategory(key as Key | undefined);
                        }}
                        defaultItems={categories}>
                        {(item: Category) => (
                            <AutocompleteItem key={item.id}>
                                {item.name}
                            </AutocompleteItem>
                        )}
                    </Autocomplete>
                    <FieldWithIcon
                        Icon={IoLocationOutline}
                        value={
                            <WritableField
                                component={Input}
                                props={{
                                    inputProps: {
                                        // placeholder: "Facebook Page",
                                        label: "Exact Location",
                                        value: map,
                                        onValueChange: setMap,
                                    },
                                }}>
                                {map}
                            </WritableField>
                        }
                    />
                    <div className="flex flex-row items-center gap-1">
                        <IoLocationOutline className="text-2xl flex-shrink-0" />
                        <div>
                            <WritableSelect
                                key="division"
                                options={districts}
                                props={{
                                    inputProps: {
                                        // placeholder: "Division",
                                        label: "Select District",
                                        selectedKeys: district,
                                        onSelectionChange: setDistrict,
                                    },
                                }}>
                                {district}
                            </WritableSelect>
                            ,{" "}
                            <WritableSelect
                                key="district"
                                options={Object.keys(
                                    allLocationOptions.bangladesh
                                )}
                                props={{
                                    inputProps: {
                                        // placeholder: "Division",
                                        label: "Select Division",
                                        selectedKeys: division,
                                        onSelectionChange: setDivision,
                                    },
                                }}>
                                {division}
                            </WritableSelect>
                        </div>
                    </div>
                    <FieldWithIcon
                        Icon={MdOutlineCall}
                        value={
                            <WritableField
                                component={Input}
                                props={{
                                    inputProps: {
                                        // placeholder: "Phone Number",
                                        label: "Phone Number",
                                        value: phoneNumber,
                                        onValueChange: setPhoneNumber,
                                    },
                                }}>
                                {phoneNumber}
                            </WritableField>
                        }
                    />
                    <FieldWithIcon
                        Icon={PiFacebookLogoBold}
                        value={
                            <WritableField
                                component={Input}
                                props={{
                                    inputProps: {
                                        // placeholder: "Facebook Page",
                                        label: "Facebook Page",
                                        value: fbPage,
                                        onValueChange: setFbPage,
                                    },
                                }}>
                                {fbPage}
                            </WritableField>
                        }
                    />
                    <div className="flex justify-center items-center flex-col pt-2 gap-8">
                        {location.lat !== 0 && location.long !== 0 && (
                            <iframe
                                src={`https://maps.google.com/maps?q=${location.lat},${location.long}&hl=es;z=132m&output=embed`}
                                title="google iframe embed"
                                className="w-full"
                                height={400}></iframe>
                        )}
                        <Button
                            onPress={async () => {
                                navigator.geolocation.getCurrentPosition(
                                    async (success) => {
                                        setLocation({
                                            lat: success.coords.latitude,
                                            long: success.coords.longitude,
                                        });
                                        // const request = await fetch(
                                        //     `https://api.mapbox.com/geocoding/v5/mapbox.places/${success.coords.longitude},${success.coords.latitude}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}`
                                        // );
                                        // const data = await request.json();
                                        // console.log(data);
                                        onOpen();
                                    },
                                    (error) => {
                                        toast.error(error.message);
                                    }
                                );
                            }}
                            className="w-full">
                            Select Location
                        </Button>
                        <SelectLocation
                            isOpen={isOpen}
                            onOpenChange={onOpenChange}
                            setLocation={setLocation}
                            location={location}
                        />
                    </div>
                </CardBody>
            </Card>
            <div className="grid-in-product mb-20">
                <div className="flex flex-wrap justify-between items-center">
                    <div className="text-3xl font-bold text-default-600 ml-4">
                        Categories
                    </div>
                </div>
                <CreateSection />
                <AllCategories
                    products={useUser?.userCompany?.products || []}
                />
            </div>
            <Button
                color="success"
                className="fixed bottom-4 right-4 font-bold"
                size="lg"
                isLoading={loading}
                onPress={async () => {
                    try {
                        setLoading(true);
                        const phone = validatePhoneNumber(phoneNumber);
                        if (!phone) {
                            return toast.error("Phone number is not valid.");
                        }
                        const payload = {
                            name: companyName,
                            city: [...district][0],
                            description: companyDescription,
                            division: [...division][0],
                            map: map,
                            iframe: `https://maps.google.com/maps?q=${location.lat},${location.long}&hl=es;z=132m&output=embed`,
                            phone,
                            fb_page: fbPage,
                            lati: location.lat,
                            longi: location.long,
                            category:
                                categories
                                    .find((e) => e.id == selectedCategory)
                                    ?.id.toString() || "",
                        };
                        console.log(payload);
                        const x: any = await updateStoreAction({
                            data: payload,
                            store_slug: useUser?.userCompany?.slug,
                            userId: useUser?.user?.id,
                        });
                        if (x.status === 200) {
                            toast.success(x.message);
                            useUser?.ticktock();
                        } else {
                            toast.error(`Error(${x.status}): ` + x.message);
                        }
                    } catch (error) {
                    } finally {
                        setLoading(false);
                    }
                }}
                startContent={<GrSave />}>
                Save
            </Button>
        </div>
    );
}
