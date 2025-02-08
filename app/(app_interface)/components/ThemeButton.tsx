"use client";

import React, { useState, useEffect } from "react";
import { Switch } from "@heroui/react";
import { useTheme } from "next-themes";
import { PiMoonThin } from "react-icons/pi";
import { RxSun } from "react-icons/rx";
import { PiDeviceMobileCamera } from "react-icons/pi";

export default function ThemeSwitch() {
    const { theme, setTheme } = useTheme();
    const [currentTheme, setCurrentTheme] = useState("system");

    useEffect(() => {
        setCurrentTheme(theme || "system");
    }, [theme]);

    const cycleTheme = (e) => {
        e.stopPropagation(); // ✅ Prevents dropdown from closing

        const themes = ["light", "dark"];
        const nextTheme = themes[(themes.indexOf(currentTheme) + 1) % themes.length];
        setCurrentTheme(nextTheme);
        setTheme(nextTheme);
    };

    return (
        <div onClick={(e) => e.stopPropagation()}> {/* ✅ Prevent dropdown closure */}
            <Switch
                checked={currentTheme !== "light"}
                onChange={cycleTheme}
                className="flex items-center gap-2 cursor-pointer"
            >
                {currentTheme === "light" && <RxSun className="text-xl" />}
                {currentTheme === "dark" && <PiMoonThin className="text-xl" />}
                {/* {currentTheme === "system" && <PiDeviceMobileCamera className="text-xl" />} */}
            </Switch>
        </div>
    );
}
