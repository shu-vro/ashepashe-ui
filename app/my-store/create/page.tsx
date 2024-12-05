"use client";

import {
    Autocomplete,
    AutocompleteItem,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardProps,
    Divider,
    Image,
    Input,
    InputProps,
    Select,
    Selection,
    SelectItem,
    Textarea,
    useDisclosure,
} from "@nextui-org/react";
import React, { useEffect, useMemo, useState, Key } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineCall } from "react-icons/md";
import { PiFacebookLogoBold } from "react-icons/pi";
import { FieldWithIcon } from "@/app/companies/[company]/CompanyCard";
import allLocationOptions from "@/lib/divisions.json";
import { WritableField, WritableSelect } from "./components/Writable";
import SelectLocation from "./components/SelectLocation";
import { toast } from "sonner";
import { GrSave } from "react-icons/gr";
import { API_URL } from "@/lib/var";
import Link from "next/link";
import { cn, removeTags, toValidUrl } from "@/lib/utils";
import NextImage from "next/image";
import { CiTrash } from "react-icons/ci";
import { LuPencilLine } from "react-icons/lu";
import { MdOutlineLocalOffer } from "react-icons/md";

export default function Page() {
    const [companyName, setCompanyName] = useState("Company Name");
    const [phoneNumber, setPhoneNumber] = useState("01xxxxxxxxx");
    const [fbPage, setFbPage] = useState("Fb Page Link");
    const [map, setMap] = useState("Some Address");
    const [companyDescription, setCompanyDescription] = useState(
        "Lorem ipsum dolor sit amet consectetur adipisicingelit. Reprehenderit itaque adipisci nemo, ducimusfacere fugit! Minima tempora cupiditate explicaboconsequuntur quis ex odit officia, at quod ipsum utquaerat repellat."
    );
    const [division, setDivision] = useState<Selection>(
        new Set<string>(["Rajshahi"])
    );
    const [district, setDistrict] = useState<Selection>(new Set<string>([]));
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [location, setLocation] = useState({
        lat: 0,
        long: 0,
    });
    const [imageFile, setImageFile] = useState<File>();
    const [selectedCategory, setSelectedCategory] = useState<
        React.Key | undefined
    >("");
    const [newSectionName, setNewSectionName] = useState("");

    const districts = useMemo(() => {
        const selectedDistricts =
            allLocationOptions.bangladesh[
                [...division][0] as keyof typeof allLocationOptions.bangladesh
            ] || [];
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

    return (
        <div className="grid grid-areas-companyLayoutNoLap grid-cols-productLayoutNoLap lap:grid-cols-productLayoutLap lap:grid-areas-companyLayoutLap gap-4">
            <label
                className="grid-in-image bg-content3 rounded-3xl h-96 relative grid place-content-center"
                htmlFor="file_input">
                <div className="text-[max(5vw,10vh)] text-white/35 text-center w-full">
                    16 X 7
                </div>
                <input
                    type="file"
                    id="file_input"
                    onChange={(e) => {
                        if (e.target.files) {
                            setImageFile(e.target.files[0]);
                        }
                    }}
                />
            </label>
            <div className="grid-in-name text-center">
                <h1 className="text-5xl font-bold my-3">
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
                <div className="italic text-neutral-500 w-7/12 mx-auto">
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
                    <Autocomplete
                        allowsCustomValue
                        label="Select Category"
                        className="max-w-xs"
                        selectedKey={
                            typeof selectedCategory === "string"
                                ? selectedCategory
                                : undefined
                        }
                        onSelectionChange={(key) =>
                            setSelectedCategory(key as Key | undefined)
                        }
                        defaultItems={categories}>
                        {(item) => (
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
                            ,
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
                            onClick={async () => {
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

            <div className="grid-in-product">
                <div className="flex flex-wrap justify-between items-center">
                    <div className="text-3xl font-bold text-default-600 ml-4">
                        Categories
                    </div>
                </div>
                <div className="w-full max-lap:w-screen max-[760px]:w-[100vw]">
                    <div className="more-product grid-in-more mt-6">
                        <h2 className="text-2xl font-bold text-default-400 ml-4 flex flex-wrap justify-between items-center">
                            <span>
                                <WritableField
                                    component={Input}
                                    props={{
                                        inputProps: {
                                            label: "Section Name",
                                            value: newSectionName,
                                            onValueChange: setNewSectionName,
                                        },
                                    }}>
                                    {newSectionName}
                                </WritableField>{" "}
                                ({0})
                            </span>
                            <Button color="secondary">Create</Button>
                        </h2>
                    </div>
                </div>
            </div>
            <Button
                color="success"
                className="fixed bottom-4 right-4 font-bold"
                size="lg"
                startContent={<GrSave />}>
                Save
            </Button>
        </div>
    );
}

function EditProduct({ product }: { product: Product["product"] }) {
    const discountPercent = ((product.price / product.price) * 100).toFixed(0);
    return (
        <Card
            shadow="sm"
            isPressable
            as={"div"}
            className={cn("w-52 md:w-72 p-0")}>
            <CardBody className="overflow-visible relative">
                <Image
                    shadow="sm"
                    radius="lg"
                    isZoomed
                    alt={product.name}
                    className="w-full aspect-[4/3] object-cover !h-auto"
                    src={toValidUrl(product.image1!)}
                    isBlurred
                    // fill={true}
                    width={400}
                    height={300}
                    // quality={70}
                    as={NextImage}
                />
            </CardBody>
            <CardFooter className="pt-0 text-start flex-col">
                <div className="w-full">
                    <div className="capitalize not-italic font-bold text-xl line-clamp-2 h-[4ch]">
                        {product.name}{" "}
                        {/* <Chip
                            color="success"
                            variant="bordered"
                            className={cn(
                                "rounded-[6px] md:hidden",
                                discountPercent === "100" ? "!hidden" : "flex"
                            )}>
                            {discountPercent}%
                        </Chip> */}
                    </div>
                    <div className="text-neutral-500 text-sm line-clamp-2 h-[4ch]">
                        {product.description && removeTags(product.description)}
                    </div>
                </div>
                <CustomDivider />
                <div className="flex flex-wrap justify-between items-center w-full">
                    <div>
                        {discountPercent !== "100" && (
                            <del className="text-default-500 text-sm">
                                {product.price}৳
                            </del>
                        )}{" "}
                        <span className="text-xl font-bold">
                            {product.price + "৳"}
                        </span>
                    </div>
                    {/* <Rating style={{ maxWidth: 100 }} readOnly value={rating} /> */}
                </div>
                <CustomDivider />
                <div className="flex flex-row justify-between items-center md:gap-1 w-full">
                    <Button isIconOnly>
                        <CiTrash />
                    </Button>
                    <Button isIconOnly>
                        <LuPencilLine />
                    </Button>
                    <Button isIconOnly>
                        <MdOutlineLocalOffer />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}

function CustomDivider() {
    return <Divider className="my-3 max-mob:my-1" />;
}
