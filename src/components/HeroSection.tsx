import React from "react";
import {
    ArrowRight,
    MapPin,
    Users,
    Heart,
    Zap,
    Smartphone,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const HeroSection: React.FC = () => {
    return (
        <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden ">
            <div className="relative z-10 container mx-auto px-6 py-20 max-w-7xl">
                <div className="grid lg:grid-cols-2 gap-8 min-h-[80vh]">
                    <div>
                        <Image
                            alt="Local Image"
                            src="/local.svg"
                            width={450}
                            height={0}
                            className="mt-10"
                        />
                    </div>

                    {/* Right side - Content */}
                    <div className="space-y-8 lg:pl-8">
                        {/* Badge */}
                        <div className="inline-flex items-center space-x-2 bg-blue-500/10 text-blue-600 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm border border-blue-500/20">
                            <Zap className="w-4 h-4" />
                            <span>Connect Locally</span>
                        </div>

                        <div className="space-y-4">
                            <h1 className="text-4xl lg:text-7xl font-black text-slate-900 leading-tight">
                                Your
                                <span className="block bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
                                    Neighborhood
                                </span>
                                <span className="block">Awaits</span>
                            </h1>

                            <p className="text-lg lg:text-2xl text-slate-600 leading-relaxed max-w-xl">
                                Discover what&apos;s happening around you. Share
                                local insights, connect with neighbors, and
                                build stronger communities.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <MapPin className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <span className="font-semibold text-slate-800">
                                        Location-Based
                                    </span>
                                </div>
                                <p className="text-slate-600 text-sm">
                                    Posts from your area
                                </p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                        <Users className="w-4 h-4 text-green-600" />
                                    </div>
                                    <span className="font-semibold text-slate-800">
                                        Community
                                    </span>
                                </div>
                                <p className="text-slate-600 text-sm">
                                    Connect with neighbors
                                </p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                        <Smartphone className="w-4 h-4 text-purple-600" />
                                    </div>
                                    <span className="font-semibold text-slate-800">
                                        Mobile Ready
                                    </span>
                                </div>
                                <p className="text-slate-600 text-sm">
                                    Access on any device
                                </p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                                        <Heart className="w-4 h-4 text-pink-600" />
                                    </div>
                                    <span className="font-semibold text-slate-800">
                                        Engage
                                    </span>
                                </div>
                                <p className="text-slate-600 text-sm">
                                    Like, share, reply
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Link
                                href="/sign-up"
                                className="group bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center space-x-2"
                            >
                                <span>Get Started</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
        </section>
    );
};

export default HeroSection;
