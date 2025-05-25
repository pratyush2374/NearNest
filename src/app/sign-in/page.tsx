import AuthNavbar from "@/components/AuthNavbar";
import { Metadata } from "next";
import SignIn from "./SignIn";

export const metadata: Metadata = {
    title: "Sign In | NearNest - Discover & Share Local Events",
    metadataBase: new URL("https://nearnest-pratyush.vercel.app"),
    description:
        "Sign in to your NearNest account to explore and share local events, meetups, and community gatherings. Stay updated with what’s happening nearby.",
    keywords:
        "NearNest login, sign in NearNest, access NearNest account, NearNest events, local event platform login, community gatherings, discover local meetups",
    authors: [
        { name: "Pratyush Sharma", url: "https://pratyush2374.vercel.app" },
    ],
    robots: "index, follow",

    openGraph: {
        title: "Sign In to NearNest | Discover & Share Local Events",
        description:
            "Log in to NearNest and reconnect with your community. Explore and share local events, gatherings, and meetups in your area.",
        siteName: "NearNest",
        images: [
            {
                url: "/icon.svg",
                width: 1200,
                height: 630,
                alt: "Sign In - NearNest Local Events",
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
            <AuthNavbar page="signIn" />
            <SignIn />
        </>
    );
};

export default Page;
