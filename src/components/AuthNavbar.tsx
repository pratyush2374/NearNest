"use client";

import React, { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface AuthNavbarProps {
    page: "signUp" | "signIn";
}

const AuthNavbar: React.FC<AuthNavbarProps> = ({ page }) => {
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

                    <div className="flex items-center space-x-8">
                        <Link
                            href={page === "signUp" ? "/sign-in" : "/sign-up"}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-all"
                        >
                            {page === "signUp" ? "Sign In" : "Sign Up"}
                            <ChevronRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AuthNavbar;
