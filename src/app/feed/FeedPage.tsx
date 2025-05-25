"use client";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import Feed from "./Feed";
import FeedNavbar from "./FeedNavbar";
import { toast } from "sonner";
import PostData from "@/types/post";
import LoadingFeed from "./LoadingFeed";
import CreatePost from "./CreatePost";
import FilterPosts from "./FilterPosts";

type PostType =
    | "LOCAL_UPDATE"
    | "PLACE_RECOMMENDATION"
    | "HELP"
    | "EVENT_ANNOUNCEMENT"
    | "ALL";

const FeedPage: React.FC = () => {
    const [districtState, setDistrictState] = useState("");
    const [posts, setPosts] = useState<PostData[]>([]);
    const [allPosts, setAllPosts] = useState<PostData[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPostsWithLocation = () => {
            if (!navigator.geolocation) {
                setError("Geolocation is not supported by your browser.");
                setIsLoading(false);
                return;
            }

            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    try {
                        const { latitude, longitude } = position.coords;

                        const res = await axios.post("/api/posts", {
                            location: `${latitude},${longitude}`,
                        });

                        const { districtState, posts } = res.data.data;
                        console.log(res.data.data);
                        setDistrictState(districtState);
                        setPosts(posts);
                        setAllPosts(posts);
                        localStorage.setItem("districtState", districtState);
                        localStorage.setItem(
                            "location",
                            `${latitude},${longitude}`
                        );
                    } catch (err) {
                        const error = err as AxiosError;
                        console.error(error);
                        const errorMessage =
                            (error.response?.data as { message?: string })
                                ?.message || "Something went wrong";
                        toast.error(errorMessage);
                        setError(errorMessage);
                    } finally {
                        setIsLoading(false);
                    }
                },
                (err) => {
                    setError("Permission denied or error fetching location.");
                    console.error(err);
                    setIsLoading(false);
                }
            );
        };

        fetchPostsWithLocation();
    }, []);

    const filterPost = (postType: PostType) => {
        if (postType === "ALL") return setPosts(allPosts);
        setPosts(allPosts)
        const filteredPosts = allPosts.filter((post) => post.type === postType);
        setPosts(filteredPosts);
    };

    if (error) {
        return (
            <div className="max-w-2xl mx-auto p-6">
                <div className="text-center py-12">
                    <div className="text-red-500 mb-2">⚠️</div>
                    <p className="text-gray-600">{error}</p>
                </div>
            </div>
        );
    }
    if (isLoading) return <LoadingFeed />;

    return (
        <>
            <FeedNavbar districtState={districtState} />
            <div className="pt-16">
                <CreatePost />
                <FilterPosts filterPost={filterPost} />
                <Feed posts={posts} />
            </div>
        </>
    );
};

export default FeedPage;
