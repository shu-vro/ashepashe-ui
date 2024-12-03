"use client";

import { Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";

type InputOrTextarea = typeof Input | typeof Textarea;

type WritableFieldProps<T extends InputOrTextarea> = {
    children: React.ReactNode;
    component: T;
    props: {
        inputProps: React.ComponentProps<T>;
        textProps?: React.ComponentProps<"div">;
    };
};

export function WritableField<T extends InputOrTextarea>({
    children,
    component: Component,
    props: { inputProps, textProps = {} },
}: WritableFieldProps<T>) {
    const [isActivated, setIsActivated] = useState(false);
    return isActivated ? (
        <Component
            {...(inputProps as any)}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Escape") {
                    setIsActivated(false);
                }
            }}
            onBlur={() => {
                setIsActivated(false);
            }}
            autoFocus
        />
    ) : (
        <span
            onClick={() => {
                setIsActivated(true);
            }}
            {...textProps}>
            {children || inputProps.label}
            <CiEdit className="inline ml-2" />
        </span>
    );
}

export function WritableSelect<T extends typeof Select>({
    children,
    options,
    props: { inputProps, textProps = {} },
}: {
    children: React.ReactNode;
    options: string[];
    props: {
        inputProps: Partial<React.ComponentProps<T>>;
        textProps?: React.ComponentProps<"div">;
    };
}) {
    const [isActivated, setIsActivated] = useState(false);
    return isActivated ? (
        <Select
            {...(inputProps as any)}
            className="min-w-32"
            autoFocus
            variant="bordered"
            onSelectionChange={(val) => {
                setIsActivated(false);
                inputProps.onSelectionChange!(val);
            }}>
            {options.map((option) => (
                <SelectItem key={option} value={option}>
                    {option}
                </SelectItem>
            ))}
        </Select>
    ) : (
        <span
            onClick={() => {
                setIsActivated(true);
            }}
            {...textProps}>
            {children || inputProps.label}
            <CiEdit className="inline ml-2" />
        </span>
    );
}
