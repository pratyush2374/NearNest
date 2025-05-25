import React, { useState, ChangeEvent } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios, { AxiosError } from "axios";
import {
    MapPin,
    Image as ImageIcon,
    Send,
    X,
    MessageSquare,
    Heart,
    Calendar,
    AlertCircle,
    Loader2,
    LucideIcon,
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Type definitions
interface PostFormData {
    content: string;
    type: PostType;
    location: string;
    images: FileList | null;
}

type PostType =
    | "LOCAL_UPDATE"
    | "PLACE_RECOMMENDATION"
    | "HELP"
    | "EVENT_ANNOUNCEMENT";

interface PostTypeOption {
    value: PostType;
    label: string;
    icon: LucideIcon;
    color: string;
}

interface SubmitStatus {
    type: "success" | "error";
    message: string;
}

interface ApiErrorResponse {
    message?: string;
}

const CreatePost: React.FC = () => {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [submitStatus, setSubmitStatus] = useState<SubmitStatus | null>(null);
    const router = useRouter()

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<PostFormData>({
        defaultValues: {
            content: "",
            type: "LOCAL_UPDATE",
            location: "",
            images: null,
        },
    });

    const watchedContent = watch("content");
    const watchedType = watch("type");
    const contentLength: number = watchedContent
        ? watchedContent.replace(/\s/g, "").length
        : 0;

    const postTypes: PostTypeOption[] = [
        {
            value: "LOCAL_UPDATE",
            label: "Local Update",
            icon: MessageSquare,
            color: "bg-blue-500",
        },
        {
            value: "PLACE_RECOMMENDATION",
            label: "Place Recommendation",
            icon: MapPin,
            color: "bg-green-500",
        },
        { value: "HELP", label: "Help", icon: Heart, color: "bg-red-500" },
        {
            value: "EVENT_ANNOUNCEMENT",
            label: "Event",
            icon: Calendar,
            color: "bg-purple-500",
        },
    ];

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const files = e.target.files;
        if (!files) return;

        const filesArray = Array.from(files);
        if (filesArray.length > 5) {
            toast.warning("You can upload a maximum of 5 images");
            return;
        }

        setSelectedFiles(filesArray);
    };

    const removeFile = (index: number): void => {
        setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const onSubmit: SubmitHandler<PostFormData> = async (data) => {
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const formData = new FormData();
            formData.append("content", data.content);
            formData.append("type", data.type);
            const loc = localStorage.getItem("location");
            formData.append("location", loc || "");

            selectedFiles.forEach((file) => {
                formData.append("images", file);
            });

            await axios.post("/api/add-post", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setSubmitStatus({
                type: "success",
                message: "Post created successfully! Redirecting...",
            });
            reset();
            setSelectedFiles([]);
            router.push("/feed");
        } catch (error) {
            const axiosError = error as AxiosError<ApiErrorResponse>;
            const errorMessage =
                axiosError.response?.data?.message ||
                "Failed to create post. Please try again.";
            setSubmitStatus({ type: "error", message: errorMessage });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className="pt-16">
                <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Share with Your Neighborhood
                        </h2>
                        <p className="text-gray-600">
                            Connect with neighbors and build stronger
                            communities
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                Post Type
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                {postTypes.map((type) => {
                                    const IconComponent = type.icon;
                                    return (
                                        <label
                                            key={type.value}
                                            className="cursor-pointer"
                                        >
                                            <input
                                                type="radio"
                                                value={type.value}
                                                {...register("type", {
                                                    required:
                                                        "Please select a post type",
                                                })}
                                                className="sr-only"
                                            />
                                            <div
                                                className={`flex items-center p-3 border-2 border-gray-200 rounded-xl hover:border-blue-300 transition-colors peer-checked:border-blue-500 peer-checked:bg-blue-50 ${
                                                    watchedType === type.value
                                                        ? "bg-blue-300"
                                                        : ""
                                                }`}
                                            >
                                                <div
                                                    className={`p-2 rounded-lg ${type.color} text-white mr-3`}
                                                >
                                                    <IconComponent size={18} />
                                                </div>
                                                <span className="text-sm font-medium text-gray-700">
                                                    {type.label}
                                                </span>
                                            </div>
                                        </label>
                                    );
                                })}
                            </div>
                            {errors.type && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.type.message}
                                </p>
                            )}
                        </div>

                        {/* Content */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                What&apos;s happening in your neighborhood?
                            </label>
                            <textarea
                                {...register("content", {
                                    required: "Content is required",
                                    validate: (value: string) => {
                                        const trimmedLength = value.replace(
                                            /\s/g,
                                            ""
                                        ).length;
                                        if (trimmedLength > 280) {
                                            return "Content must be less than 280 characters (excluding spaces)";
                                        }
                                        return true;
                                    },
                                })}
                                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-colors"
                                rows={4}
                                placeholder="Share local insights, connect with neighbors..."
                            />
                            <div className="flex justify-between items-center mt-2">
                                {errors.content && (
                                    <p className="text-red-500 text-sm">
                                        {errors.content.message}
                                    </p>
                                )}
                                <span
                                    className={`text-sm ml-auto ${
                                        contentLength > 280
                                            ? "text-red-500"
                                            : "text-gray-500"
                                    }`}
                                >
                                    {contentLength}/280 characters
                                </span>
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                <ImageIcon size={16} className="inline mr-1" />
                                Images (Optional - Max 5)
                            </label>
                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*,video/mp4,video/mov,video/webm"
                                    onChange={handleImageChange}
                                    className="hidden"
                                    id="image-upload"
                                />
                                <label
                                    htmlFor="image-upload"
                                    className="cursor-pointer"
                                >
                                    <ImageIcon
                                        size={48}
                                        className="mx-auto text-gray-400 mb-2"
                                    />
                                    <p className="text-gray-600">
                                        Click to upload images or videos
                                    </p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        JPG, PNG, MP4, MOV, WEBM (Max 5 files)
                                    </p>
                                </label>
                            </div>
                        </div>

                        {/* Selected Files List */}
                        {selectedFiles.length > 0 && (
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">
                                    Selected Files ({selectedFiles.length})
                                </label>
                                <div className="space-y-2">
                                    {selectedFiles.map((file, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
                                        >
                                            <div className="flex items-center">
                                                <ImageIcon size={16} className="text-gray-500 mr-2" />
                                                <span className="text-sm text-gray-700 truncate">
                                                    {file.name}
                                                </span>
                                                <span className="text-xs text-gray-500 ml-2">
                                                    ({(file.size / 1024 / 1024).toFixed(2)} MB)
                                                </span>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeFile(index)}
                                                className="text-red-500 hover:text-red-700 p-1"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Status Messages */}
                        {submitStatus && (
                            <div
                                className={`p-4 rounded-xl flex items-center ${
                                    submitStatus.type === "success"
                                        ? "bg-green-50 text-green-800 border border-green-200"
                                        : "bg-red-50 text-red-800 border border-red-200"
                                }`}
                            >
                                {submitStatus.type === "error" && (
                                    <AlertCircle size={20} className="mr-2" />
                                )}
                                <span>{submitStatus.message}</span>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2
                                        size={20}
                                        className="animate-spin mr-2"
                                    />
                                    Creating Post...
                                </>
                            ) : (
                                <>
                                    <Send size={20} className="mr-2" />
                                    Share with Neighborhood
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CreatePost;