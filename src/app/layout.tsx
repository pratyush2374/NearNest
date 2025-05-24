import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import { Toaster } from "sonner";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
    title: "NearNest - Discover & Share Local Events",
    metadataBase: new URL("https://nearnest-pratyush.vercel.app"),
    description:
        "NearNest is your local hub for discovering and sharing community events, gatherings, meetups, and seminars. Connect with people around you and stay in the loop.",
    keywords:
        "NearNest, local events, community gatherings, post events, discover meetups, local seminars, nearby happenings, host events, neighborhood events",
    authors: [
        { name: "Pratyush Sharma", url: "https://pratyush2374.vercel.app" },
    ],
    robots: "index, follow",

    openGraph: {
        title: "NearNest - Discover & Share Local Events",
        description:
            "Explore what's happening around you with NearNest. Share and find local events, gatherings, meetups, and more—all in one place.",
        siteName: "NearNest",
        images: [
            {
                url: "/icon.svg",
                width: 1200,
                height: 630,
                alt: "NearNest - Your Local Event Hub",
            },
        ],
        type: "website",
        locale: "en_US",
    },

    icons: {
        icon: "/icon.svg",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${montserrat.className} antialiased`}>
                <AuthProvider>{children}</AuthProvider>
                <Toaster position="bottom-center" richColors/>
            </body>
        </html>
    );
}
