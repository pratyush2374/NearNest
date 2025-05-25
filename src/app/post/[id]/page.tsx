import { Metadata } from "next";
import IndividualPost from "./IndividualPost";

export const metadata: Metadata = {
    title: "Post | NearNest - Discover & Share Local Events",
    metadataBase: new URL("https://nearnest.vercel.app"),
    description:
        "Explore this local post on NearNest. Stay connected with your community by discovering updates, events, and insights shared by people around you.",
    keywords:
        "NearNest post, community post, local updates, neighborhood events, NearNest individual post, community sharing, local platform",
    authors: [
        { name: "Pratyush Sharma", url: "https://pratyush2374.vercel.app" },
    ],
    robots: "index, follow",

    openGraph: {
        title: "Post on NearNest | Discover & Share Local Stories",
        description:
            "Read this post on NearNest to stay in the loop with your neighborhood. Discover what's happening nearby and engage with your local community.",
        siteName: "NearNest",
        images: [
            {
                url: "/icon.svg",
                width: 1200,
                height: 630,
                alt: "Individual Post - NearNest",
            },
        ],
        type: "article",
        locale: "en_US",
    },

    icons: {
        icon: "/icon.svg",
    },
};


const Page : React.FC = () => {
  return (
    <>
      <IndividualPost />
    </>
  );
}

export default Page;