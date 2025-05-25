import { MapPin, Loader2, Radio, Search } from "lucide-react";

const LoadingFeed = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="text-center max-w-md w-full">
                {/* Main Loading Animation */}
                <div className="relative mb-8">
                    {/* Pulsing Background Circle */}
                    <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto animate-pulse"></div>

                    {/* Rotating Outer Ring */}
                    <div className="absolute inset-0 w-24 h-24 mx-auto">
                        <div className="w-24 h-24 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
                    </div>

                    {/* Center Icon Container */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center">
                            <MapPin className="w-8 h-8 text-blue-500 animate-bounce" />
                        </div>
                    </div>

                    {/* Floating Icons */}
                    <div className="absolute -top-2 -right-2">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center animate-pulse">
                            <Radio className="w-4 h-4 text-green-600" />
                        </div>
                    </div>

                    <div className="absolute -bottom-2 -left-2">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center animate-pulse delay-75">
                            <Search className="w-4 h-4 text-purple-600" />
                        </div>
                    </div>
                </div>

                {/* Loading Text */}
                <div className="space-y-3">
                    <h2 className="text-xl font-semibold text-gray-900">
                        Finding your neighborhood
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                        Fetching your location and posts...
                    </p>
                </div>

                {/* Progress Steps */}
                <div className="mt-8 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                            <span className="text-gray-700">
                                Loading nearby posts
                            </span>
                        </div>
                        <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoadingFeed;
