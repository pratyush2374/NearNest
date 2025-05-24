import { Metadata } from "next";
import SignUp from "./SignUp";
import AuthNavbar from "@/components/AuthNavbar";

export const metadata: Metadata = {
    title: "Sign Up | NearNest - Discover & Share Local Events",
    metadataBase: new URL("https://nearnest-pratyush.vercel.app"),
    description:
        "Create your NearNest account to discover and share local events, meetups, and gatherings in your community. Join now and stay connected with what's happening around you.",
    keywords:
        "NearNest sign up, create account, join NearNest, register NearNest, local events platform, community hub, discover events, post local events",
    authors: [
        { name: "Pratyush Sharma", url: "https://pratyush2374.vercel.app" },
    ],
    robots: "index, follow",

    openGraph: {
        title: "Join NearNest | Discover & Share Local Events",
        description:
            "Sign up to NearNest and become part of a vibrant local community. Find and post events, meet new people, and explore your neighborhood like never before.",
        siteName: "NearNest",
        images: [
            {
                url: "/icon.svg",
                width: 1200,
                height: 630,
                alt: "Join NearNest - Your Local Event Hub",
            },
        ],
        type: "website",
        locale: "en_US",
    },

    icons: {
        icon: "/icon.svg",
    },
};

const Page: React.FC = () => {
    return (
        <>
            <AuthNavbar page="signUp" />
            <SignUp />
        </>
    );
};

export default Page;
