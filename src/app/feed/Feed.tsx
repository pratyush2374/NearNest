"use client";

import {
    Heart,
    MessageCircle,
    MapPin,
    Calendar,
    HelpCircle,
    Star,
    User,
    ThumbsDown,
} from "lucide-react";
import Image from "next/image";
import PostData from "@/types/post";
import { useRouter } from "next/navigation";

interface FeedProps {
    posts: PostData[];
}

const Feed: React.FC<FeedProps> = ({ posts }) => {
    const router = useRouter();
    const getPostTypeConfig = (type: PostData["type"]) => {
        const configs = {
            LOCAL_UPDATE: {
                icon: MapPin,
                color: "text-green-500",
                bgColor: "bg-green-50",
                borderColor: "border-green-200",
                label: "Local Update",
            },
            PLACE_RECOMMENDATION: {
                icon: Star,
                color: "text-yellow-500",
                bgColor: "bg-yellow-50",
                borderColor: "border-yellow-200",
                label: "Recommendation",
            },
            HELP: {
                icon: HelpCircle,
                color: "text-red-500",
                bgColor: "bg-red-50",
                borderColor: "border-red-200",
                label: "Help Needed",
            },
            EVENT_ANNOUNCEMENT: {
                icon: Calendar,
                color: "text-purple-500",
                bgColor: "bg-purple-50",
                borderColor: "border-purple-200",
                label: "Event",
            },
        };
        return configs[type];
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInHours = Math.floor(
            (now.getTime() - date.getTime()) / (1000 * 60 * 60)
        );

        if (diffInHours < 1) return "Just now";
        if (diffInHours < 24) return `${diffInHours}h ago`;
        if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
        return date.toLocaleDateString();
    };

    return (
        <div className="max-w-2xl mx-auto p-4 space-y-6">
            {/* Posts Feed */}
            <div className="space-y-4">
                {posts.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-xl">
                        <div className="text-gray-400 mb-2">📭</div>
                        <p className="text-gray-600">
                            No posts in your area yet. Be the first to share!
                        </p>
                    </div>
                ) : (
                    posts.map((post) => {
                        const typeConfig = getPostTypeConfig(post.type);
                        const TypeIcon = typeConfig.icon;

                        return (
                            <article
                                key={post.id}
                                className={`bg-white rounded-xl shadow-sm border ${typeConfig.borderColor} hover:shadow-md transition-all duration-200`}
                                onClick={() => {
                                    router.push(`/post/${post.id}`);
                                }}
                            >
                                {/* Post Header */}
                                <div className="p-4 pb-3">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                                <User className="w-5 h-5 text-gray-500" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">
                                                    {post.user.fullName}
                                                </h3>
                                                <p className="text-sm text-gray-500">
                                                    @{post.user.username}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div
                                                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${typeConfig.bgColor} ${typeConfig.color}`}
                                            >
                                                <TypeIcon className="w-3 h-3 mr-1" />
                                                {typeConfig.label}
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {formatDate(post.createdAt)}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Post Content */}
                                    <div className="mb-4">
                                        <p className="text-gray-800 leading-relaxed">
                                            {post.content}
                                        </p>
                                    </div>

                                    {/* Media */}
                                    {post.media && post.media.length > 0 && (
                                        <div
                                            className={`grid gap-2 mb-4 ${
                                                post.media.length === 1
                                                    ? "grid-cols-1"
                                                    : "grid-cols-2"
                                            }`}
                                        >
                                            {post.media.map(
                                                (mediaUrl, index) => (
                                                    <div
                                                        key={index}
                                                        className="relative group"
                                                    >
                                                        <Image
                                                            src={mediaUrl}
                                                            width={500}
                                                            height={500}
                                                            alt={`Post media ${
                                                                index + 1
                                                            }`}
                                                            className="w-full h-48 object-cover rounded-lg hover:opacity-95 transition-opacity cursor-pointer"
                                                        />
                                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all rounded-lg"></div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Post Actions */}
                                <div className="px-4 py-3 border-t border-gray-100 bg-gray-50/50">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-6">
                                            <button className="flex items-center space-x-1 text-gray-600  group">
                                                <Heart className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                                <span className="text-sm font-medium">
                                                    {
                                                        post.reactions.filter(
                                                            (reaction) =>
                                                                reaction.type ===
                                                                "LIKE"
                                                        ).length
                                                    }
                                                </span>
                                            </button>
                                            <button className="flex items-center space-x-1 text-gray-600  group">
                                                <ThumbsDown className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                                <span className="text-sm font-medium">
                                                    {
                                                        post.reactions.filter(
                                                            (reaction) =>
                                                                reaction.type ===
                                                                "DISLIKE"
                                                        ).length
                                                    }
                                                </span>
                                            </button>
                                            <button className="flex items-center space-x-1 text-gray-600  group">
                                                <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                                <span className="text-sm font-medium">
                                                    {post.comments.length}
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Comments Preview */}
                                {post.comments.length > 0 && (
                                    <div className="px-4 py-3 border-t border-gray-100">
                                        <div className="space-y-2">
                                            {post.comments
                                                .slice(0, 2)
                                                .map((comment) => (
                                                    <div
                                                        key={comment.id}
                                                        className="flex items-start space-x-2"
                                                    >
                                                        <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                                                            <User className="w-3 h-3 text-gray-500" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <span className="text-sm font-medium text-gray-900">
                                                                {
                                                                    comment.user
                                                                        .fullName
                                                                }
                                                            </span>
                                                            <span className="text-sm text-gray-600 ml-2">
                                                                {
                                                                    comment.content
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            {post.comments.length > 2 && (
                                                <button className="text-sm text-blue-500 hover:text-blue-600 font-medium">
                                                    View all{" "}
                                                    {post.comments.length}{" "}
                                                    comments
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </article>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default Feed;
