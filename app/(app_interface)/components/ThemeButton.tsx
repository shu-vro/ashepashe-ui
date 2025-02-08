"use client";

import React from "react";
import { Tab, Tabs, Tooltip } from "@heroui/react";
import { useTheme } from "next-themes";
import { PiMoonThin } from "react-icons/pi";
import { RxSun } from "react-icons/rx";
import { PiDeviceMobileCamera } from "react-icons/pi";

export default function ThemeSwitch({ ...rest }) {
    const { theme, setTheme } = useTheme();

    return (
        <Tabs
            size="sm"
            {...rest}
            selectedKey={theme}
            onSelectionChange={(val) => {
                setTheme(val as string);
            }}>
            <Tab
                key="light"
                title={
                    <Tooltip content="Light Theme" showArrow color="secondary">
                        <RxSun className="text-xl" />
                    </Tooltip>
                }></Tab>
            <Tab
                key="dark"
                title={
                    <Tooltip content="Dark Theme" showArrow color="secondary">
                        <PiMoonThin className="text-xl" />
                    </Tooltip>
                }></Tab>
            <Tab
                key="system"
                title={
                    <Tooltip
                        content="Device Default"
                        showArrow
                        color="secondary">
                        <PiDeviceMobileCamera className="text-xl" />
                    </Tooltip>
                }></Tab>
        </Tabs>
    );
}
