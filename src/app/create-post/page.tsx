import { Metadata } from "next";
import CreatePostPage from "./CreatePostPage";

export const metadata: Metadata = {
    title: "Create Post | NearNest - Share with Your Neighborhood",
    metadataBase: new URL("https://nearnest-pratyush.vercel.app"),
    description:
        "Create and share posts with your local community on NearNest. Announce events, ask for help, share updates, or recommend places around you.",
    keywords:
        "create post NearNest, post to community, local updates, event announcements, help requests, share with neighbors, local recommendations",
    authors: [
        { name: "Pratyush Sharma", url: "https://pratyush2374.vercel.app" },
    ],
    robots: "index, follow",

    openGraph: {
        title: "Create a Post on NearNest - Share What's Happening",
        description:
            "Use NearNest to share updates, events, or requests with your neighborhood. Connect and contribute to your local community.",
        siteName: "NearNest",
        images: [
            {
                url: "/icon.svg",
                width: 1200,
                height: 630,
                alt: "NearNest - Create Post",
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
            <CreatePostPage />
        </>
    );
};

export default Page;
