"use client";

import { Code, Tooltip } from "@heroui/react";
import React, { useMemo } from "react";

export default function IndividualLink({ slug }: { slug: string }) {
    const individualUrl = useMemo(() => {
        return `${window.location.origin}/a/${slug}`;
    }, [slug]);
    return (
        <>
            Your Individual Link:{" "}
            <Tooltip content="Copy link" color="warning">
                <Code
                    color="warning"
                    size="sm"
                    className="text-wrap cursor-pointer"
                    onClick={() => {
                        navigator.clipboard.writeText(individualUrl);
                    }}>
                    {individualUrl}
                </Code>
            </Tooltip>
        </>
    );
}
