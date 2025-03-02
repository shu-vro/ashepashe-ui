"use client";
import React, { useState, useEffect, useRef, use } from "react";
import { Button, Image } from "@heroui/react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";
import { UserContext } from "@/contexts/UserContext";
import { signIn } from "next-auth/react";
import { ArrowRight, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import hero_img from "@/assets/rmvbg.png";
import step1 from "@/assets/steps/1.png";
import step2 from "@/assets/steps/2.png";
import step3 from "@/assets/steps/3.png";
import step4 from "@/assets/steps/4.png";
import step5 from "@/assets/steps/5.png";
import NextImage from "next/image";
import { useIsMobile } from "@/hooks/use-mobile";
import { FaWhatsapp } from "react-icons/fa6";
import { RiMessengerLine } from "react-icons/ri";
import { FaPhoneAlt } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

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
        icon: step1,
    },
    {
        title: "আপনার স্টোর নাম দিন",
        description: "Create Store এ ক্লিক করুন এবং আপনার স্টোর নাম দিন।",
        icon: step2,
    },
    {
        title: "আপনার স্টোরের ব্যানার ছবি আপলোড করুন",
        description:
            "আপনার স্টোরের ব্যানার ছবি আপলোড করুন এবং আপনার স্টোর এর লুক দেখান।",
        icon: step3,
    },
    {
        title: "আপনার স্টোরের তথ্য দিন",
        description:
            "আপনার স্টোরের ঠিকানা, মোবাইল নাম্বার এবং অন্যান্য তথ্য দিন।",
        icon: step4,
    },
    {
        title: "আপনার স্টোরের লিঙ্ক শেয়ার করুন",
        description:
            "অভিনন্দন আপনার স্টোর তৈরি হয়েছে, এখন আপনি আপনার স্টোর লিঙ্ক শেয়ার করতে পারেন।",
        icon: step5,
    },
];

export default function Home() {
    const useUser = use(UserContext);
    const [showVideo, setShowVideo] = useState(false);
    const isMobile_500 = useIsMobile(500);

    return (
        <div className="my-4">
            <div className="flex justify-space-between items-center max-md:flex-wrap max-md:mx-10 max-md:justify-center">
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
                            }>
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
                <div className="shrink-0">
                    <Image
                        src={hero_img.src}
                        className={cn("object-cover w-full !h-auto")}
                        isBlurred={!isMobile_500}
                        classNames={{
                            wrapper: "m-6 w-full w-[calc(100vw-4rem)]",
                        }}
                        as={NextImage}
                        alt={"Hero image"}
                        width={500}
                        height={500}
                    />
                </div>
            </div>

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
        </div>
    );
}

const Highlight = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <motion.span
            ref={ref}
            initial={{
                backgroundSize: "0% 100%",
            }}
            animate={{
                backgroundSize: isInView ? "100% 100%" : "0% 100%",
            }}
            transition={{
                duration: 1,
                ease: "linear",
                delay: 0.5,
            }}
            style={{
                backgroundRepeat: "no-repeat",
                backgroundPosition: "left center",
                display: "inline",
            }}
            className={cn(
                `relative inline-block pb-1 px-1 rounded-lg bg-gradient-to-r from-indigo-300 to-purple-300 dark:from-indigo-500 dark:to-purple-500`,
                className
            )}>
            {children}
        </motion.span>
    );
};
function StepsComponent() {
    const [activeStep, setActiveStep] = useState(0);
    const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = stepRefs.current.indexOf(
                            entry.target as HTMLDivElement
                        );
                        if (index !== -1) {
                            setActiveStep(index);
                        }
                    }
                });
            },
            { threshold: 0.5 }
        );

        stepRefs.current.forEach((ref) => {
            if (ref) {
                observer.observe(ref);
            }
        });

        return () => {
            stepRefs.current.forEach((ref) => {
                if (ref) {
                    observer.unobserve(ref);
                }
            });
        };
    }, []);
    return (
        <div className="max-w-6xl my-10 mx-auto px-6 py-12">
            <h2 className="text-5xl font-bold text-center mb-16">
                মাত্র ৫ টি ধাপে স্টোর ক্রিয়েট করুন! 😀
            </h2>
            <div className="relative flex flex-col md:flex-row">
                {/* Sliding Text Content */}
                <div className="w-full md:w-1/2 space-y-24">
                    {steps.map((step, index) => (
                        <div key={index}>
                            <div className="flex-1 flex justify-center md:hidden">
                                <div>
                                    <NextImage
                                        width={375}
                                        height={666}
                                        src={steps[index].icon}
                                        alt={steps[index].title}
                                        className="w-full"
                                    />
                                </div>
                            </div>
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.4 }}
                                transition={{
                                    duration: 0.25,
                                    delay: 0.25,
                                }}
                                className="space-y-4 md:h-screen flex justify-center items-start max-md:items-center max-md:text-center flex-col"
                                ref={(el) => {
                                    stepRefs.current[index] = el;
                                }}>
                                <Highlight className="text-2xl font-semibold px-3 py-2">
                                    Step {index + 1}
                                </Highlight>
                                <h3 className="text-4xl md:text-6xl font-bold">
                                    {step.title}
                                </h3>
                                <p className="text-neutral-400 text-2xl">
                                    {step.description}
                                </p>
                            </motion.div>
                        </div>
                    ))}
                </div>
                {/* Sticky Image Container */}
                <div className="hidden md:block w-1/2 sticky top-[6rem] h-screen">
                    <motion.div
                        key={steps[activeStep].title}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7 }}
                        className="absolute left-0 right-0 mx-auto">
                        <NextImage
                            src={steps[activeStep].icon}
                            alt={steps[activeStep].title}
                            width={375}
                            height={666}
                            className="w-fit h-[70vh] object-contain"
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

function CTAComponent({
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
                `relative bg-gradient-to-r rounded-2xl shadow-xl overflow-hidden mx-4`,
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
                    <motion.div
                        className="flex flex-col gap-4 justify-center mt-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}>
                        <div>Have a question? Contact us at</div>
                        <div className="flex gap-4 justify-center">
                            <a
                                href="https://wa.me/+8801749488497"
                                className="bg-gradient-to-tl from-green-400 to-green-500 p-2 rounded-full flex items-center gap-2 w-12 h-12">
                                <FaWhatsapp className="text-white h-8 w-8" />
                                <span className="sr-only">Whatsapp</span>
                            </a>
                            <a
                                href="https://m.me/haruncse22"
                                className="bg-gradient-to-tl from-[#00b2ff] to-[#006aff]  p-2 rounded-full flex items-center gap-2 w-12 h-12">
                                <RiMessengerLine className="text-white h-8 w-8" />
                                <span className="sr-only">Messenger</span>
                            </a>
                            <a
                                href="tel:01770383961"
                                className="bg-gradient-to-tl from-yellow-400 to-yellow-600 p-2 rounded-full flex items-center gap-2 w-12 h-12">
                                <FaPhoneAlt className="text-white h-6 w-8" />
                                <span className="sr-only">Phone Number</span>
                            </a>
                            <a
                                href="mailto:business.aamarstore@gmail.com "
                                className="bg-gradient-to-tl from-[#fb9905] to-[#ea4335] p-2 rounded-full flex items-center gap-2 w-12 h-12">
                                <SiGmail className="text-white h-6 w-8" />
                                <span className="sr-only">Email</span>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
}
