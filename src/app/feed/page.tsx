import { Metadata } from "next";
import FeedPage from "./FeedPage";

export const metadata: Metadata = {
    title: "Feed | NearNest - What's Happening Around You",
    metadataBase: new URL("https://nearnest-pratyush.vercel.app"),
    description:
        "Stay updated with the latest posts from your local community on NearNest. Discover events, ask for help, share updates, and connect with neighbors in real-time.",
    keywords:
        "NearNest feed, local posts, community updates, neighborhood feed, local recommendations, event announcements, help requests, discover local happenings",
    authors: [
        { name: "Pratyush Sharma", url: "https://pratyush2374.vercel.app" },
    ],
    robots: "index, follow",

    openGraph: {
        title: "NearNest Feed - Discover Local Updates Around You",
        description:
            "Explore your personalized community feed on NearNest. View and engage with posts, updates, and local news shared by neighbors near you.",
        siteName: "NearNest",
        images: [
            {
                url: "/icon.svg",
                width: 1200,
                height: 630,
                alt: "NearNest - Community Feed",
            },
        ],
        type: "website",
        locale: "en_US",
    },

    icons: {
        icon: "/icon.svg",
    },
};


const Page : React.FC = () => {
  return (
    <>
      <FeedPage />
    </>
  );
}

export default Page;