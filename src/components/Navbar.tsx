"use client";

import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
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
                    ? "bg-card/80 backdrop-blur-md shadow-md"
                    : "bg-transparent"
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div>
                        <Link href="/">
                            <div className="relative w-44 h-12">
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

                    {/* Desktop Navigation */}
                    <div className="flex items-center space-x-8">
                        <Link
                            href="/sign-up"
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-all"
                        >
                            Get Started
                            <ChevronRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
