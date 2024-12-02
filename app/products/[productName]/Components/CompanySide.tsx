"use client";

import { Company } from "@/app/companies/page";
import { dynamicFakeImageGenerator, removeTags } from "@/lib/utils";
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

type Prop = {
    company: Company;
};

export default function CompanySide({ company }: Prop) {
    return (
        <div className="company grid-in-company relative max-md:hidden">
            {/* flex-col sm:flex-row md:flex-row lap:flex-col */}
            <Card
                className="sticky top-24 h-min overflow-auto p-6 m-4 flex-col max-sm:flex-col max-lg:flex-col max-lap:flex-row"
                shadow="sm">
                <CardHeader className="w-full max-lap:max-w-[250px] max-sm:max-w-full mx-auto">
                    <Image
                        src={company.image}
                        // src={dynamicFakeImageGenerator()}
                        alt={company.name}
                    />
                </CardHeader>
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
                    <div className="flex justify-around items-stretch pt-2 gap-8">
                        <Button
                            onClick={() => {
                                window.open(company.iframe);
                            }}
                            className="w-full">
                            View Location
                        </Button>
                        <Button
                            as={Link}
                            href={`/companies/${company.slug}`}
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
