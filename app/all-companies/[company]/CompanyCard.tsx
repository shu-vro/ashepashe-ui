"use client";

import { Button, Card, CardBody } from "@nextui-org/react";
import React from "react";
import { Company } from "../page";
import Link from "next/link";
import { Rating } from "@smastrom/react-rating";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineCall } from "react-icons/md";
import { PiFacebookLogoBold } from "react-icons/pi";
import { removeTags } from "@/lib/utils";

export default function CompanyCard({ company }: { company: Company }) {
    return (
        <Card
            className="static lap:sticky top-24 grid-in-company h-min mt-6 ml-6 max-lap:mr-6 p-4 mb-10"
            shadow="sm">
            <CardBody className="overflow-visible gap-4">
                <div className="max-lap:hidden">
                    <h1 className="text-2xl font-bold">{company.name}</h1>
                    <p className="text-neutral-500 italic">
                        {removeTags(company.description)}
                    </p>
                </div>
                <FieldWithIcon Icon={IoLocationOutline} value={company.map} />
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
                </div>
            </CardBody>
        </Card>
    );
}

function FieldWithIcon({ Icon, value }: { Icon: any; value: React.ReactNode }) {
    return (
        <div className="flex flex-row items-center gap-1">
            <Icon className="text-2xl flex-shrink-0" />
            <p>{value}</p>
        </div>
    );
}
