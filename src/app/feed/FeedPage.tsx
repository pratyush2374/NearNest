"use client";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import Feed from "./Feed";
import FeedNavbar from "./FeedNavbar";
import AddPost from "./AddPost";
import { toast } from "sonner";

const FeedPage: React.FC = () => {
    const [districtState, setDistrictState] = useState("");
    const [posts, setPosts] = useState([]);
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

                        setDistrictState(districtState);
                        setPosts(posts);
                        localStorage.setItem("districtState", districtState);
                    } catch (err) {
                        const error = err as AxiosError;
                        console.error(error);
                        const errorMessage =
                            (error.response?.data as { message?: string })?.message ||
                            "Something went wrong";
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

    if (error) return <p className="text-red-500 text-center">{error}</p>;
    if (isLoading) return <p className="text-center">Fetching your location and posts...</p>;

    return (
        <>
            <FeedNavbar districtState={districtState} />
            <AddPost />
            
        </>
    );
};

export default FeedPage;
