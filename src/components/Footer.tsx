import Image from "next/image";

const socialIcons = [
    {
        name: "github",
        path: "/github.svg",
        target: "https://github.com/pratyush2374",
    },
    {
        name: "linkedin",
        path: "/linkedin.svg",
        target: "https://www.linkedin.com/in/pratyush2374",
    },
    {
        name: "twitter",
        path: "/twitter.svg",
        target: "https://x.com/pratyush2374",
    },
    {
        name: "instagram",
        path: "/instagram.svg",
        target: "https://www.instagram.com/pratyush_2374",
    },
    {
        name: "portfolio",
        path: "/portfolio.svg",
        target: "https://pratyush2374.vercel.app",
    },
];

const Footer: React.FC = () => {
    return (
        <footer className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 ">
            {/* Decorative background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/10 rounded-full blur-xl"></div>
                <div className="absolute -bottom-2 -left-6 w-32 h-32 bg-indigo-500/8 rounded-full blur-2xl"></div>
            </div>

            <div className="relative container mx-auto max-w-6xl px-6 py-12">
                <div className="text-center space-y-8">
                    {/* Social icons */}

                    {/* Bottom section */}
                    <div className="pt-8 border-t border-blue-100/60">
                        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                            <p className="text-sm text-gray-500">
                                © 2024 All rights reserved
                            </p>
                            <div className="flex items-center justify-center space-x-6">
                                {socialIcons.map((icon, index) => (
                                    <a
                                        key={icon.name}
                                        href={icon.target}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative transition-all duration-300 hover:scale-110"
                                        aria-label={icon.name}
                                        style={{
                                            animationDelay: `${index * 100}ms`,
                                        }}
                                    >
                                        {/* Background glow effect */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-lg scale-150"></div>

                                        {/* Icon container */}
                                        <div className="relative w-12 h-12 bg-white rounded-xl shadow-md group-hover:shadow-xl border border-blue-100 group-hover:border-blue-200 transition-all duration-300 flex items-center justify-center">
                                            <div className="w-5 h-5 relative overflow-hidden">
                                                <Image
                                                    src={icon.path}
                                                    alt={icon.name}
                                                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                                                    fill
                                                />
                                            </div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
