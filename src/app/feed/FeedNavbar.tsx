"use client";

import { ChevronRight, User, LogOut, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { signOut } from "next-auth/react";

interface NavbarProps {
    districtState: string;
}

const FeedNavbar: React.FC<NavbarProps> = ({ districtState }) => {
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll effect for navbar
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed w-full z-50 transition-all duration-300 ${
                scrolled
                    ? "bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-200/50"
                    : "bg-transparent"
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <Link href="/" className="block">
                            <div className="relative w-44 h-12 hover:opacity-80 transition-opacity">
                                <Image
                                    src="/logo.svg"
                                    alt="NearNest Logo"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        </Link>
                    </div>

                    <div className="flex items-center md:gap-2 ">
                        {districtState && (
                            <div className="hidden md:flex items-center md:pace-x-2">
                                <MapPin className="w-6 h-6 text-blue-600" />
                                <span className="text-sm">{districtState}</span>
                            </div>
                        )}
                        <Popover>
                            <PopoverTrigger asChild>
                                <button className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                    <User className="w-6 h-6 text-gray-700" />
                                    <span className="sr-only">
                                        Open user menu
                                    </span>
                                </button>
                            </PopoverTrigger>
                            <PopoverContent
                                className="w-56 p-2 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg"
                                align="end"
                                sideOffset={8}
                            >
                                <div className="space-y-1">
                                    <div className="md:hidden flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors duration-150 cursor-pointer group">
                                        <div className="flex-shrink-0">
                                            <MapPin className="w-5 h-5 text-gray-500 group-hover:text-gray-700" />
                                        </div>
                                        <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                                            {districtState}
                                        </span>
                                    </div>
                                    <Link href="/profile">
                                        <div className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors duration-150 cursor-pointer group">
                                            <div className="flex-shrink-0">
                                                <User className="w-5 h-5 text-gray-500 group-hover:text-gray-700" />
                                            </div>
                                            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                                                Profile
                                            </span>
                                            <ChevronRight className="w-4 h-4 text-gray-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    </Link>

                                    <div className="border-t border-gray-100 my-1"></div>

                                    <button
                                        onClick={() =>
                                            signOut({
                                                redirect: true,
                                                callbackUrl: "/",
                                            })
                                        }
                                        className="w-full flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-red-50 transition-colors duration-150 group"
                                    >
                                        <div className="flex-shrink-0">
                                            <LogOut className="w-5 h-5 text-gray-500 group-hover:text-red-600" />
                                        </div>
                                        <span className="text-sm font-medium text-gray-700 group-hover:text-red-600">
                                            Logout
                                        </span>
                                    </button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default FeedNavbar;
