"use client";

import {
    dynamicFakeImageGenerator,
    extractIframeUrl,
    removeTags,
    toValidUrl,
} from "@/lib/utils";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Image,
} from "@nextui-org/react";
import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineCall } from "react-icons/md";
import { PiFacebookLogoBold } from "react-icons/pi";
import Link from "next/link";
import { Rating } from "@smastrom/react-rating";
import NextImage from "next/image";

type Prop = {
    company: Company;
    specialized?: boolean;
};

export default function CompanySide({ company, specialized = false }: Prop) {
    const iframe = extractIframeUrl(company.iframe);

    return (
        <div className="company grid-in-company relative max-md:hidden">
            <Card
                className="sticky top-24 h-min p-3 m-4 flex-col max-sm:flex-col max-lg:flex-col max-lap:flex-row"
                shadow="sm">
                <CardBody className="w-full max-lap:max-w-[250px] max-sm:max-w-full mx-auto">
                    <Image
                        src={toValidUrl(company.image)}
                        fallbackSrc={dynamicFakeImageGenerator()}
                        as={NextImage}
                        width={500}
                        height={280}
                        className="!h-auto !w-auto"
                        alt={company.name}
                    />
                </CardBody>
                <CardBody className="overflow-visible">
                    <h2 className="text-2xl font-bold">{company.name}</h2>
                    <p className="italic text-neutral-500">
                        {removeTags(company.description)}
                    </p>
                    <FieldWithIcon
                        Icon={IoLocationOutline}
                        value={company.map}
                    />
                    <FieldWithIcon
                        Icon={IoLocationOutline}
                        value={`${company.city}, ${company.division}`}
                    />
                    <FieldWithIcon
                        Icon={MdOutlineCall}
                        value={
                            <Link href={`tel:${company.phone}`}>
                                {company.phone}
                            </Link>
                        }
                    />
                    <FieldWithIcon
                        Icon={PiFacebookLogoBold}
                        value={
                            <Link
                                href={company.fb_page || "#"}
                                target="_blank"
                                rel="noopener noreferrer">
                                {company.name}
                            </Link>
                        }
                    />
                    <div className="flex flex-row items-center gap-1 my-4">
                        <Rating value={0} className="max-w-32" />
                        <span>(0)</span>
                    </div>
                    <div className="flex justify-around items-stretch flex-col pt-2 gap-8">
                        {company.lati || company.longi ? (
                            <iframe
                                src={`${iframe}`}
                                className="w-full"
                                height="400"
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"></iframe>
                        ) : (
                            "No map available."
                        )}
                        <Button
                            as={Link}
                            href={`${specialized ? "/a" : "/companies"}/${
                                company.slug
                            }`}
                            className="w-full">
                            Go To Store
                        </Button>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}

function FieldWithIcon({ Icon, value }: { Icon: any; value: React.ReactNode }) {
    return (
        <div className="flex flex-row items-center gap-1 mt-2">
            <Icon className="text-2xl flex-shrink-0" />
            <p>{value}</p>
        </div>
    );
}
