import Logo from "@/app/(app_interface)/components/Sidebar/Logo";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FaPhoneAlt } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { RiFacebookCircleLine, RiMessengerLine } from "react-icons/ri";

const links = [
    {
        group: "Email",
        items: [
            {
                title: "business.aamarstore@gmail.com",
                href: "mailto:business.aamarstore@gmail.com",
                outside: true,
            },
        ],
    },
];

export interface SocialLinkProps {
    href: string;
    ariaLabel: string;
    children: React.ReactNode;
    textSize?: string;
}

export function SocialLink({
    href,
    ariaLabel,
    children,
    textSize = "text-2xl",
}: SocialLinkProps) {
    return (
        <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={ariaLabel}
            className={cn(
                "text-muted-foreground hover:text-primary block",
                textSize
            )}>
            {children}
        </Link>
    );
}

export default function FooterSection() {
    return (
        <footer className="bg-white border-t pt-12 mt-8 dark:bg-transparent">
            <div className="mb-8 md:mb-12">
                <div className="mx-auto flex max-w-5xl flex-wrap items-end justify-between gap-6 px-6 pb-6">
                    <Link
                        href="/"
                        aria-label="go home"
                        className="block size-fit">
                        <Logo />
                    </Link>
                </div>
            </div>
            <div className="mx-auto max-w-5xl px-6">
                <div className="grid gap-12 grid-cols-3 max-lg:grid-cols-1">
                    <div className="border-b pb-8 text-sm md:border-none">
                        <div className="space-y-4">
                            <Label htmlFor="mail" className="block font-medium">
                                Address
                            </Label>
                            <div className="flex gap-2">
                                Vodra R/A, Road No 1 , Rajshahi Sadar , Rajshahi
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-6">
                        {links.map((link, index) => (
                            <div key={index} className="space-y-4 text-sm">
                                <span className="block font-medium">
                                    {link.group}
                                </span>
                                {link.items.map((item, index) => (
                                    <Link
                                        key={index}
                                        href={item.href}
                                        target={item.outside ? "_blank" : ""}
                                        rel={
                                            item.outside
                                                ? "noopener noreferrer"
                                                : ""
                                        }
                                        className="text-muted-foreground hover:text-primary block duration-150">
                                        <span>{item.title}</span>
                                    </Link>
                                ))}
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-row justify-end max-lg:justify-start gap-6 text-sm">
                        <SocialLink
                            href="https://wa.me/+8801749488497"
                            ariaLabel="Whatsapp"
                            textSize="text-2xl">
                            <FaWhatsapp />
                        </SocialLink>
                        <SocialLink
                            href="https://m.me/haruncse22"
                            ariaLabel="Messenger"
                            textSize="text-2xl">
                            <RiMessengerLine />
                        </SocialLink>
                        <SocialLink
                            href="tel:01770383961"
                            ariaLabel="Phone"
                            textSize="text-xl">
                            <FaPhoneAlt />
                        </SocialLink>
                        <SocialLink
                            href="mailto:business.aamarstore@gmail.com"
                            ariaLabel="Gmail"
                            textSize="text-xl">
                            <MdOutlineAlternateEmail />
                        </SocialLink>
                        <SocialLink
                            href="https://www.facebook.com/page.aamarstore"
                            ariaLabel="Facebook">
                            <RiFacebookCircleLine />
                        </SocialLink>
                    </div>
                </div>
                <div className="mt-12 flex flex-wrap items-end justify-between gap-6 border-t py-6">
                    <small className="text-muted-foreground order-last block text-center text-sm md:order-first">
                        © {new Date().getFullYear()} Aamarstore.com, All rights
                        reserved
                    </small>
                </div>
            </div>
        </footer>
    );
}
