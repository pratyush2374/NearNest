"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    MapPin,
    Calendar,
    CheckCircle,
    Heart,
    MessageCircle,
    ThumbsDown,
    Loader2,
    User,
} from "lucide-react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ProfileNavbar from "./ProfileNavbar";

interface Reaction {
    id: string;
    userId: string;
    postId: string;
    type: "LIKE" | "DISLIKE";
    createdAt: string;
}

interface Comment {
    id: string;
    content: string;
    userId: string;
    postId: string;
    createdAt: string;
    updatedAt: string;
}

interface Post {
    id: string;
    content: string;
    media: string[];
    type:
        | "EVENT_ANNOUNCEMENT"
        | "LOCAL_UPDATE"
        | "PLACE_RECOMMENDATION"
        | "HELP";
    userId: string;
    location: string;
    createdAt: string;
    updatedAt: string;
    comments: Comment[];
    reactions: Reaction[];
}

interface UserData {
    id: string;
    fullName: string;
    email: string;
    username: string;
    bio: string | null;
    location: string;
    lastLocationUpdatedAt: string;
    isVerified: boolean;
    createdAt: string;
    updatedAt: string;
    posts: Post[];
}

interface ApiResponse {
    success: boolean;
    message: string;
    data: UserData;
}

const ProfileSection: React.FC = () => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                setLoading(true);
                const response = await axios.get<ApiResponse>(
                    "/api/profile-data"
                );
                if (response.data.success) {
                    setUserData(response.data.data);
                } else {
                    setError("Failed to fetch profile data");
                }
            } catch (err) {
                setError("Error fetching profile data");
                console.error("Profile fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, []);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const getPostTypeColor = (type: string) => {
        switch (type) {
            case "EVENT_ANNOUNCEMENT":
                return "bg-purple-100 text-purple-800 border-purple-200";
            case "LOCAL_UPDATE":
                return "bg-green-100 text-green-800 border-green-200";
            case "PLACE_RECOMMENDATION":
                return "bg-blue-100 text-blue-800 border-blue-200";
            case "HELP":
                return "bg-red-100 text-red-800 border-red-200";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    const getPostTypeLabel = (type: string) => {
        switch (type) {
            case "EVENT_ANNOUNCEMENT":
                return "Event";
            case "LOCAL_UPDATE":
                return "Update";
            default:
                return "Post";
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600 text-lg">Loading profile...</p>
                </div>
            </div>
        );
    }

    if (error || !userData) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <User className="w-8 h-8 text-red-500" />
                    </div>
                    <p className="text-gray-600 text-lg">
                        {error || "Unable to load profile"}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <>
            <ProfileNavbar />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 ">
                <div >
                    <div className="container mx-auto px-4 py-16 md:max-w-4xl">
                        {/* Hero Profile Header */}
                        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
                            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-32 relative">
                                <div className="absolute inset-0 bg-black/10"></div>
                            </div>

                            <div className="relative px-8 pb-8">
                                {/* Profile Avatar */}
                                <div className="absolute -top-16 left-8">
                                    <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full border-6 border-white shadow-xl flex items-center justify-center">
                                        <User className="w-16 h-16 text-white" />
                                    </div>
                                </div>

                                {/* Profile Info */}
                                <div className="pt-20">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                        <div className="mb-4 md:mb-0">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h1 className="text-3xl font-bold text-gray-900">
                                                    {userData.fullName}
                                                </h1>
                                                {userData.isVerified && (
                                                    <CheckCircle className="w-7 h-7 text-blue-500" />
                                                )}
                                            </div>
                                            <p className="text-gray-600 text-lg mb-3">
                                                @{userData.username}
                                            </p>
                                            {userData.bio && (
                                                <p className="text-gray-700 mb-4">
                                                    {userData.bio}
                                                </p>
                                            )}

                                            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="w-4 h-4" />
                                                    <span>
                                                        Location updated{" "}
                                                        {formatDate(
                                                            userData.lastLocationUpdatedAt
                                                        )}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4" />
                                                    <span>
                                                        Joined{" "}
                                                        {formatDate(
                                                            userData.createdAt
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <div className="bg-blue-50 px-4 py-2 rounded-lg text-center">
                                                <div className="text-2xl font-bold text-blue-600">
                                                    {userData.posts.length}
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    Posts
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Posts Section */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                Recent Posts
                            </h2>

                            {userData.posts.length === 0 ? (
                                <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <MessageCircle className="w-8 h-8 text-gray-400" />
                                    </div>
                                    <p className="text-gray-600 text-lg">
                                        No posts yet
                                    </p>
                                </div>
                            ) : (
                                userData.posts.map((post) => (
                                    <div
                                        className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                                        key={post.id}
                                        onClick={() =>
                                            router.push(`/post/${post.id}`)
                                        }
                                    >
                                        <div className="p-6">
                                            {/* Post Header */}
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                                                        <User className="w-5 h-5 text-white" />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-900">
                                                            {userData.fullName}
                                                        </p>
                                                        <p className="text-sm text-gray-500">
                                                            {formatDate(
                                                                post.createdAt
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>

                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-medium border ${getPostTypeColor(
                                                        post.type
                                                    )}`}
                                                >
                                                    {getPostTypeLabel(
                                                        post.type
                                                    )}
                                                </span>
                                            </div>

                                            {/* Post Content */}
                                            <p className="text-gray-800 mb-4 leading-relaxed">
                                                {post.content}
                                            </p>

                                            {/* Post Media */}
                                            {post.media.length > 0 && (
                                                <div className="mb-4">
                                                    <Carousel>
                                                        <CarouselContent>
                                                            {post.media.map(
                                                                (mediaUrl) => (
                                                                    <CarouselItem
                                                                        key={
                                                                            mediaUrl
                                                                        }
                                                                    >
                                                                        <Image
                                                                            src={
                                                                                mediaUrl
                                                                            }
                                                                            alt="Post Media"
                                                                            width={
                                                                                500
                                                                            }
                                                                            height={
                                                                                500
                                                                            }
                                                                            className="w-[90%] mx-auto object-cover"
                                                                        />
                                                                    </CarouselItem>
                                                                )
                                                            )}
                                                        </CarouselContent>
                                                        {post.media.length >
                                                            1 && (
                                                            <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10" />
                                                        )}
                                                        {post.media.length >
                                                            1 && (
                                                            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10" />
                                                        )}
                                                    </Carousel>
                                                </div>
                                            )}

                                            {/* Post Interactions */}
                                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                                <div className="flex items-center gap-6">
                                                    <div className="flex items-center gap-2 text-gray-600">
                                                        <Heart className="w-5 h-5" />
                                                        <span className="text-sm font-medium">
                                                            {
                                                                post.reactions.filter(
                                                                    (r) =>
                                                                        r.type ===
                                                                        "LIKE"
                                                                ).length
                                                            }
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center gap-2 text-gray-600 ">
                                                        <MessageCircle className="w-5 h-5" />
                                                        <span className="text-sm font-medium">
                                                            {
                                                                post.comments
                                                                    .length
                                                            }
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center gap-2 text-gray-600 ">
                                                        <ThumbsDown className="w-5 h-5" />
                                                        <span className="text-sm font-medium">
                                                            {
                                                                post.reactions.filter(
                                                                    (r) =>
                                                                        r.type ===
                                                                        "DISLIKE"
                                                                ).length
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileSection;
