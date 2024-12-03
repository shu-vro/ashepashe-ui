"use client";

import {
    Button,
    Card,
    CardBody,
    Input,
    InputProps,
    Select,
    Selection,
    SelectItem,
    Textarea,
    useDisclosure,
} from "@nextui-org/react";
import React, { useMemo, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineCall } from "react-icons/md";
import { PiFacebookLogoBold } from "react-icons/pi";
import { FieldWithIcon } from "@/app/companies/[company]/CompanyCard";
import allLocationOptions from "@/lib/divisions.json";
import { WritableField, WritableSelect } from "./components/Writable";
import SelectLocation from "./components/SelectLocation";
import { toast } from "sonner";

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

    const districts = useMemo(() => {
        const selectedDistricts =
            allLocationOptions.bangladesh[
                [...division][0] as keyof typeof allLocationOptions.bangladesh
            ] || [];
        setDistrict(new Set<string>([selectedDistricts[0]]));
        return selectedDistricts;
    }, [division]);

    return (
        <div className="grid grid-areas-companyLayoutNoLap grid-cols-productLayoutNoLap lap:grid-cols-productLayoutLap lap:grid-areas-companyLayoutLap gap-4">
            <div className="grid-in-image bg-amber-600 h-96"></div>
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
                                        value: phoneNumber,
                                        onValueChange: setFbPage,
                                    },
                                }}>
                                {fbPage}
                            </WritableField>
                        }
                    />
                    <div className="flex justify-around items-stretch pt-2 gap-8">
                        <Button
                            onClick={() => {
                                navigator.geolocation.getCurrentPosition(
                                    (success) => {
                                        setLocation({
                                            lat: success.coords.latitude,
                                            long: success.coords.longitude,
                                        });
                                    },
                                    (error) => {
                                        toast.error(error.message);
                                    }
                                );
                                onOpen();
                            }}
                            className="w-full">
                            Select Location
                        </Button>
                        <SelectLocation
                            isOpen={isOpen}
                            onOpenChange={onOpenChange}
                        />
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}
