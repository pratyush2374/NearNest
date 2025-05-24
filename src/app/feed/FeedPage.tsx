"use client";
import axios, { AxiosError } from "axios";
import {  useEffect, useState } from "react";
import Feed from "./Feed";
import FeedNavbar from "./FeedNavbar";
import AddPost from "./AddPost";

const FeedPage: React.FC = () => {
    const [districtState, setDistrictState] = useState("");
    const [location, setLocation] = useState<{
        lat: number;
        lng: number;
    } | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getAndUpdateLocation = () => {
            if (!navigator.geolocation) {
                setError("Geolocation is not supported by your browser.");
                return;
            }

            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    setLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                    try {
                        const res = await axios.post("/api/update-location", {
                            location: `${position.coords.latitude},${position.coords.longitude}`,
                        });
                        const disState = res.data.data.districtState;
                        setDistrictState(disState as string);
                        localStorage.setItem(
                            "districtState",
                            res.data.districtState ?? ""
                        );
                    } catch (err) {
                        const error = err as AxiosError;
                        console.error(error);
                    }
                },
                (err) => {
                    setError("Permission denied or error fetching location.");
                    console.error(err);
                }
            );
        };
        getAndUpdateLocation();
    }, []);

    if (error) return <p>{error}</p>;
    if (!location) return <p>Fetching your location...</p>;

    return (
        <>
            <FeedNavbar districtState={districtState} />
            <AddPost />
            <Feed />
        </>
    );
};

export default FeedPage;
