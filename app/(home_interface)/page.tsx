"use client";
import React, { use, useState, useEffect } from "react";
import { Button, Image } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { UserContext } from "@/contexts/UserContext";
import { signIn } from "next-auth/react";
import { ArrowRight, Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface CTAProps {
    title: string;
    subtitle?: string;
    buttons?: {
        text: string;
        href: string;
        onClick?: () => void;
        variant?: "primary" | "secondary";
    }[];
    theme?: "blue" | "emerald" | "orange";
}

const steps = [
    {
        title: "জিমেইল দিয়ে সাইন ইন করুন",
        description:
            "আপনার জিমেইল একাউন্ট দিয়ে সাইন ইন করুন এবং আপনার অনলাইন স্টোর তৈরি করুন।",
        icon: "/steps/1.png",
    },
    {
        title: "আপনার স্টোর নাম দিন",
        description: "Create Store এ ক্লিক করুন এবং আপনার স্টোর নাম দিন।",
        icon: "/steps/2.png",
    },
    {
        title: "আপনার স্টোরের ব্যানার ছবি আপলোড করুন",
        description:
            "আপনার স্টোরের ব্যানার ছবি আপলোড করুন এবং আপনার স্টোর এর লুক দেখান।",
        icon: "/steps/3.png",
    },
    {
        title: "আপনার স্টোরের তথ্য দিন",
        description:
            "আপনার স্টোরের ঠিকানা, মোবাইল নাম্বার এবং অন্যান্য তথ্য দিন।",
        icon: "/steps/4.png",
    },
    {
        title: "আপনার স্টোরের লিঙ্ক শেয়ার করুন",
        description:
            "অভিনন্দন আপনার স্টোর তৈরি হয়েছে, এখন আপনি আপনার স্টোর লিঙ্ক শেয়ার করতে পারেন।",
        icon: "/steps/5.png",
    },
];

export default function Home() {
    const useUser = use(UserContext);
    const [showVideo, setShowVideo] = useState(false);
    // const [isVisible, setIsVisible] = useState(false);
    // const [activeStep, setActiveStep] = useState<number | null>(null);

    // const { products, companies } = await getAllProducts();
    return (
        <div className="my-4">
            <div className="flex justify-space-between items-center max-md:flex-wrap max-md:mx-10">
                <div className="items-center">
                    <h2 className="text-5xl font-bold my-3 leading-tight">
                        অনলাইন স্টোর বা রেডিমেড ওয়েবসাইট বানান
                        <span className="text-blue-400"> ৩০ সেকেন্ডে</span>
                    </h2>
                    <p className="">
                        অনলাইন স্টোর বা রেডিমেড ওয়েবসাইট বানান ৩০ সেকেন্ডে কোন
                        ধরনের টেক স্কিল ছাড়াই একটি অনলাইন স্টোর ম্যানেজ করুন
                        ,নিজের স্টোর লিংক আপনার প্রোফাইল বা পেজে শেয়ার করুন
                    </p>
                    <div className="my-5 flex items-center space-x-2">
                        <Button
                            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 transition-opacity"
                            as={useUser?.user ? Link : Button}
                            onPress={async () => {
                                if (!useUser?.user)
                                    await signIn("google", {
                                        redirectTo:
                                            location.href + "/my-store/create",
                                        redirect: false,
                                    });
                            }}
                            href={
                                useUser?.user
                                    ? `/my-store/${
                                          useUser?.userCompany
                                              ? "update"
                                              : "create"
                                      }`
                                    : "/"
                            }
                            // size="large"
                        >
                            {useUser?.user
                                ? useUser.userCompany
                                    ? "Update Your Store"
                                    : "Create Your Store"
                                : "Get Started"}
                        </Button>
                        <Button
                            className="ml-4 border border-gray-500 hover:border-gray-400"
                            onPress={() => setShowVideo(true)}>
                            <Play className="mr-2 h-5 w-5" />
                            Watch Demo
                        </Button>
                    </div>
                </div>
                <div>
                    {/* <img src="/final.png"  alt="hero" /> */}
                    <Image
                        isBlurred
                        alt="NextUI Album Cover"
                        className="m-5"
                        src="/rmvbg.png"
                        width={1000}
                    />
                </div>
            </div>

            {/* Video Modal */}
            <AnimatePresence>
                {showVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowVideo(false)}>
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            className="aspect-video w-full max-w-4xl bg-card rounded-lg overflow-hidden shadow-2xl"
                            onClick={(e) => e.stopPropagation()}>
                            <iframe
                                width="100%"
                                height="100%"
                                src="https://www.youtube.com/embed/dwtfKSw1Fxs?si=1dOg_56l6Wd8EcP4"
                                title="Website Builder Tutorial"
                                frameBorder="0"
                                allow="accelerometer; autoplay=true; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen></iframe>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <StepsComponent />

            <CTAComponent
                title="আজই আপনার স্বপ্নের সাইট তৈরি করা শুরু করুন"
                subtitle="হাজার হাজার সন্তুষ্ট গ্রাহকদের সাথে যোগ দিন এবং মিনিটের মধ্যে আপনার অনলাইন স্টোর চালু করুন"
                theme="blue"
                buttons={[
                    {
                        text: "Get Started Free",
                        href: "/signup",
                        variant: "primary",
                        onClick: async () => {
                            if (!useUser?.user)
                                await signIn("google", {
                                    redirectTo:
                                        location.href + "/my-store/create",
                                    redirect: false,
                                });
                            else {
                                window.location.href = "/my-store/create";
                            }
                        },
                    },
                    {
                        text: "Watch Demo",
                        href: "/demo",
                        variant: "secondary",
                        onClick: () => setShowVideo(true),
                    },
                ]}
            />

            <div></div>
        </div>
    );
}

export function StepsComponent() {
    return (
        <div className="max-w-5xl my-2 mx-auto px-4 py-12">
            <h2 className="text-5xl font-bold text-center mb-16">
                মাত্র ৫ টি ধাপে স্টোর ক্রিয়েট করুন! 😀
            </h2>
            <div className="space-y-24">
                {steps.map((step, index) => {
                    const isEven = index % 2 === 0;

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: isEven ? -100 : 100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className={cn(
                                `flex flex-col md:flex-row items-center gap-4`,
                                isEven ? "md:flex-row" : "md:flex-row-reverse"
                            )}>
                            {/* Icon/Image Container */}
                            <div className="flex-1 flex justify-center">
                                <div className="">
                                    <img
                                        src={step.icon}
                                        alt={step.title}
                                        className="w-full"
                                    />
                                </div>
                            </div>

                            {/* Text Content */}
                            <div className="flex-1 md:text-left">
                                <div className="space-y-4">
                                    <span className="inline-block text-sm font-semibold text-blue-600 dark:text-blue-300">
                                        Step {index + 1}
                                    </span>
                                    <h3 className="text-4xl font-bold">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 text-lg">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}

export function CTAComponent({
    title,
    subtitle,
    buttons = [],
    theme = "blue",
}: CTAProps) {
    const themeColors = {
        blue: {
            bg: "from-gray-700 to-blue-900",
            primary: "bg-white text-blue-600 hover:bg-blue-50",
            secondary:
                "bg-transparent border-white text-white hover:bg-white/10",
        },
        emerald: {
            bg: "from-emerald-600 to-emerald-400",
            primary: "bg-white text-emerald-600 hover:bg-emerald-50",
            secondary:
                "bg-transparent border-white text-white hover:bg-white/10",
        },
        orange: {
            bg: "from-orange-600 to-orange-400",
            primary: "bg-white text-orange-600 hover:bg-orange-50",
            secondary:
                "bg-transparent border-white text-white hover:bg-white/10",
        },
    };

    return (
        <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className={cn(
                `relative bg-gradient-to-r rounded-2xl shadow-xl overflow-hidden`,
                themeColors[theme].bg
            )}>
            <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <div className="text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl font-bold text-white mb-6">
                        {title}
                    </motion.h2>

                    {subtitle && (
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                            {subtitle}
                        </motion.p>
                    )}

                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}>
                        {buttons.map((button, index) => (
                            <motion.button
                                key={index}
                                onClick={button.onClick}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={cn(
                                    `px-8 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center gap-2 justify-center border-2`,
                                    button.variant === "secondary"
                                        ? themeColors[theme].secondary
                                        : themeColors[theme].primary
                                )}>
                                {button.text}
                                <ArrowRight className="w-4 h-4" />
                            </motion.button>
                        ))}
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
}
