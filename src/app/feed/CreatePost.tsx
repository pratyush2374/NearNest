import { useRouter } from "next/navigation";
import { Plus, MapPin, Users, Sparkles } from "lucide-react";

const CreatePost: React.FC = () => {
    const router = useRouter();

    return (
        <div className="max-w-2xl mx-auto p-4">
            <div
                onClick={() => router.push("/create-post")}
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 text-white cursor-pointer group hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
                {/* Animated background elements */}
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12 group-hover:scale-125 transition-transform duration-700"></div>

                <div className="relative p-8">
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4 group-hover:bg-white/30 transition-colors duration-300">
                                    <Plus className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold mb-1">
                                        Share with your community
                                    </h2>
                                    <p className="text-blue-100 text-sm">
                                        What&apos;s happening in your
                                        neighborhood?
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-6">
                                <div className="flex items-center text-blue-200">
                                    <MapPin className="w-4 h-4 mr-2" />
                                    <span className="text-sm">
                                        Location-based
                                    </span>
                                </div>
                                <div className="flex items-center text-blue-200">
                                    <Users className="w-4 h-4 mr-2" />
                                    <span className="text-sm">
                                        Community-driven
                                    </span>
                                </div>
                                <div className="flex items-center text-blue-200">
                                    <Sparkles className="w-4 h-4 mr-2" />
                                    <span className="text-sm">
                                        Instant sharing
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="hidden sm:block ml-8">
                            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
                                <Plus className="w-8 h-8 text-white group-hover:rotate-180 transition-transform duration-500" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Subtle bottom gradient line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 group-hover:h-2 transition-all duration-300"></div>
            </div>
        </div>
    );
};

export default CreatePost;
