"use client";

import React from "react";
import Link, { LinkProps as LProps } from "next/link";
import { LinkProps, Link as Nui } from "@nextui-org/react";

export default function NextLink({ ...props }: LinkProps & LProps) {
    return <Nui as={Link} {...props} />;
}
