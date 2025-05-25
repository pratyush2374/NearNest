"use client";

import CreatePost from "./CreatePost";
import FeedNavbar from "../feed/FeedNavbar";
import { useEffect, useState } from "react";

const CreatePostPage: React.FC = () => {
    const [districtState, setDistrictState] = useState("");
    useEffect(() => {
        const districtState = localStorage.getItem("districtState");
        setDistrictState(districtState || "");
    }, []);
    return (
        <>
            <FeedNavbar districtState={districtState} />
            <CreatePost />
        </>
    );
};

export default CreatePostPage;
