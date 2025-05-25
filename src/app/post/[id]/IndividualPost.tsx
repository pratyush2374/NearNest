"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import {
    MapPin,
    Calendar,
    Heart,
    ThumbsDown,
    MessageCircle,
    Clock,
    Users,
    AlertCircle,
    Star,
    Send,
    ArrowLeft,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface User {
    fullName: string;
    username: string;
}

interface Comment {
    id: string;
    content: string;
    userId: string;
    postId: string;
    createdAt: string;
    updatedAt: string;
    user: User;
}

interface Reaction {
    id: string;
    userId: string;
    postId: string;
    type: string;
    createdAt: string;
}

interface User {
    fullName: string;
    username: string;
}

interface PostData {
    id: string;
    content: string;
    media: string[];
    type:
        | "LOCAL_UPDATE"
        | "PLACE_RECOMMENDATION"
        | "HELP"
        | "EVENT_ANNOUNCEMENT";
    user: User;
    userId: string;
    location: string;
    hasUserLikedPost: boolean;
    hasUserDislikedPost: boolean;
    totalLikes: number;
    totalDislikes: number;
    createdAt: string;
    updatedAt: string;
    reactions: Reaction[];
    comments: Comment[];
}

interface CommentForm {
    comment: string;
}

const IndividualPost: React.FC = () => {
    const params = useParams();
    const [postData, setPostData] = useState<PostData | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CommentForm>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `/api/post-data/?postId=${params.id}`
                );
                console.log(response.data.data);
                setPostData(response.data.data);
            } catch (err) {
                const error = err as AxiosError;
                console.log(error);
                const errorMessage =
                    (error.response?.data as { message?: string })?.message ||
                    "Something went wrong";
                toast.error(errorMessage);
            }
        };

        fetchData();
    }, [params.id]);

    const handleReaction = async (type: "LIKE" | "DISLIKE") => {
        if (!postData) return;

        try {
            // Optimistic UI update
            let newPostData = { ...postData };

            if (type === "LIKE") {
                if (postData.hasUserLikedPost) {
                    // User is un-liking
                    newPostData = {
                        ...postData,
                        hasUserLikedPost: false,
                        totalLikes: postData.totalLikes - 1,
                    };
                } else {
                    // User is liking
                    newPostData = {
                        ...postData,
                        hasUserLikedPost: true,
                        hasUserDislikedPost: false, // Remove dislike if it was there
                        totalLikes: postData.totalLikes + 1,
                        totalDislikes: postData.hasUserDislikedPost
                            ? postData.totalDislikes - 1
                            : postData.totalDislikes,
                    };
                }
            } else {
                // DISLIKE
                if (postData.hasUserDislikedPost) {
                    // User is un-disliking
                    newPostData = {
                        ...postData,
                        hasUserDislikedPost: false,
                        totalDislikes: postData.totalDislikes - 1,
                    };
                } else {
                    // User is disliking
                    newPostData = {
                        ...postData,
                        hasUserDislikedPost: true,
                        hasUserLikedPost: false, // Remove like if it was there
                        totalDislikes: postData.totalDislikes + 1,
                        totalLikes: postData.hasUserLikedPost
                            ? postData.totalLikes - 1
                            : postData.totalLikes,
                    };
                }
            }

            // Update UI immediately
            setPostData(newPostData);

            // Make API call to persist the change
            await axios.post("/api/add-reaction", {
                postId: params.id,
                type: type,
            });
        } catch (err) {
            // Revert the optimistic update on error
            setPostData(postData);

            const error = err as AxiosError;
            const errorMessage =
                (error.response?.data as { message?: string })?.message ||
                `Failed to ${type.toLowerCase()} post`;
            toast.error(errorMessage);
        }
    };

    const onSubmitComment = async (data: CommentForm) => {
        setIsSubmitting(true);
        try {
            const response = await axios.post("/api/add-comment", {
                postId: params.id,
                comment: data.comment,
            });

            // Add the new comment to the current post data
            if (postData) {
                setPostData({
                    ...postData,
                    comments: [...postData.comments, response.data.data],
                });
            }

            reset();
            toast.success("Comment added successfully!");
        } catch (err) {
            const error = err as AxiosError;
            const errorMessage =
                (error.response?.data as { message?: string })?.message ||
                "Failed to add comment";
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const getPostTypeConfig = (type: PostData["type"]) => {
        switch (type) {
            case "LOCAL_UPDATE":
                return {
                    icon: <MapPin className="w-4 h-4" />,
                    label: "Local Update",
                    color: "bg-green-100 text-green-700 border-green-200",
                };
            case "PLACE_RECOMMENDATION":
                return {
                    icon: <Star className="w-4 h-4" />,
                    label: "Place Recommendation",
                    color: "bg-yellow-100 text-yellow-700 border-yellow-200",
                };
            case "HELP":
                return {
                    icon: <AlertCircle className="w-4 h-4" />,
                    label: "Help Needed",
                    color: "bg-red-100 text-red-700 border-red-200",
                };
            case "EVENT_ANNOUNCEMENT":
                return {
                    icon: <Calendar className="w-4 h-4" />,
                    label: "Event",
                    color: "bg-purple-100 text-purple-700 border-purple-200",
                };
            default:
                return {
                    icon: <MapPin className="w-4 h-4" />,
                    label: "Update",
                    color: "bg-gray-100 text-gray-700 border-gray-200",
                };
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    if (!postData) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading post...</p>
                </div>
            </div>
        );
    }

    const postTypeConfig = getPostTypeConfig(postData.type);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
                <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
                    <Link
                        href="/feed"
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </Link>
                    <h1 className="text-lg font-semibold text-gray-900">
                        Post
                    </h1>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-2xl mx-auto p-4">
                {/* Post Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    {/* Post Header */}
                    <div className="p-6 pb-4">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                    <span className="text-white font-semibold text-lg">
                                        {postData.user.fullName
                                            .slice(0, 1)
                                            .toUpperCase()}
                                    </span>
                                </div>
                                <div>
                                    <div className="font-medium text-gray-900">
                                        {postData.user.fullName}
                                    </div>
                                    <div className="text-sm text-gray-500 flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {formatDate(postData.createdAt)}
                                    </div>
                                </div>
                            </div>

                            {/* Post Type Badge */}
                            <div
                                className={`px-3 py-1 rounded-full border text-xs font-medium flex items-center gap-1 ${postTypeConfig.color}`}
                            >
                                {postTypeConfig.icon}
                                {postTypeConfig.label}
                            </div>
                        </div>

                        {/* Post Content */}
                        <div className="mb-4">
                            <p className="text-gray-900 text-lg leading-relaxed">
                                {postData.content}
                            </p>
                        </div>

                        {/* Media */}
                        {postData.media && postData.media.length > 0 && (
                            <div className="mb-4">
                                <div className="grid gap-2">
                                    {postData.media.map((mediaUrl, index) => (
                                        <div
                                            key={index}
                                            className="relative rounded-lg overflow-hidden"
                                        >
                                            <Image
                                                src={mediaUrl}
                                                alt={`Post media ${index + 1}`}
                                                height={500}
                                                width={500}
                                                className="w-full h-auto max-h-96 object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Location */}
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                            <MapPin className="w-4 h-4" />
                            <span>Near your location</span>
                        </div>

                        {/* Engagement Stats */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-6">
                                <button
                                    onClick={() => handleReaction("LIKE")}
                                    className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors"
                                >
                                    <Heart
                                        className={`w-5 h-5 ${
                                            postData.hasUserLikedPost
                                                ? "text-red-500 fill-red-500"
                                                : ""
                                        }`}
                                    />
                                    <span className="text-sm font-medium">
                                        {postData.totalLikes}
                                    </span>
                                </button>

                                <button
                                    onClick={() => handleReaction("DISLIKE")}
                                    className="flex items-center gap-2 text-gray-600 "
                                >
                                    <ThumbsDown
                                        className={`w-5 h-5 ${
                                            postData.hasUserDislikedPost
                                                ? "text-red-500"
                                                : ""
                                        }`}
                                    />
                                    <span className="text-sm font-medium">
                                        {postData.totalDislikes}
                                    </span>
                                </button>

                                <div className="flex items-center gap-2 text-gray-600">
                                    <MessageCircle className="w-5 h-5" />
                                    <span className="text-sm font-medium">
                                        {postData.comments.length}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Comments Section */}
                <div className="mt-6">
                    {/* Add Comment Form */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <MessageCircle className="w-5 h-5" />
                            Add a comment
                        </h3>

                        <form
                            onSubmit={handleSubmit(onSubmitComment)}
                            className="space-y-4"
                        >
                            <div>
                                <textarea
                                    {...register("comment", {
                                        required: "Comment cannot be empty",
                                        minLength: {
                                            value: 1,
                                            message:
                                                "Comment must be at least 1 character",
                                        },
                                    })}
                                    placeholder="Share your thoughts..."
                                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
                                    rows={3}
                                />
                                {errors.comment && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.comment.message}
                                    </p>
                                )}
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
                                >
                                    {isSubmitting ? (
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    ) : (
                                        <Send className="w-4 h-4" />
                                    )}
                                    {isSubmitting
                                        ? "Posting..."
                                        : "Post Comment"}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Comments List */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            <Users className="w-5 h-5" />
                            Comments ({postData.comments.length})
                        </h3>

                        {postData.comments.length === 0 ? (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                                <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                <p className="text-gray-500">
                                    No comments yet. Be the first to share your
                                    thoughts!
                                </p>
                            </div>
                        ) : (
                            postData.comments.map((comment) => (
                                <div
                                    key={comment.id}
                                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-white font-semibold text-sm">
                                                {comment.user.fullName.charAt(
                                                    0
                                                )}
                                            </span>
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="font-medium text-gray-900">
                                                    {comment.user.fullName}
                                                </span>
                                                <span className="text-gray-500 text-sm">
                                                    @{comment.user.username}
                                                </span>
                                                <span className="text-gray-400 text-sm">
                                                    ·{" "}
                                                    {formatDate(
                                                        comment.createdAt
                                                    )}
                                                </span>
                                            </div>

                                            <p className="text-gray-800 leading-relaxed">
                                                {comment.content}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IndividualPost;
