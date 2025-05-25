import { useState } from "react";
import {
    MapPin,
    Calendar,
    AlertCircle,
    Star,
    Grid3X3,
    ChevronDown,
} from "lucide-react";

type PostType =
    | "ALL"
    | "LOCAL_UPDATE"
    | "PLACE_RECOMMENDATION"
    | "HELP"
    | "EVENT_ANNOUNCEMENT";

interface FilterPostsProps {
    filterPost: (postType: PostType) => void;
}

const FilterPosts: React.FC<FilterPostsProps> = ({ filterPost }) => {
    const [selectedFilter, setSelectedFilter] = useState<PostType>("ALL");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const filterOptions = [
        {
            value: "ALL" as PostType,
            label: "All Posts",
            icon: <Grid3X3 className="w-4 h-4" />,
            color: "bg-gray-100 text-gray-700 border-gray-200",
            count: "",
        },
        {
            value: "LOCAL_UPDATE" as PostType,
            label: "Local Updates",
            icon: <MapPin className="w-4 h-4" />,
            color: "bg-green-100 text-green-700 border-green-200",
            count: "",
        },
        {
            value: "PLACE_RECOMMENDATION" as PostType,
            label: "Recommendations",
            icon: <Star className="w-4 h-4" />,
            color: "bg-yellow-100 text-yellow-700 border-yellow-200",
            count: "",
        },
        {
            value: "HELP" as PostType,
            label: "Help Needed",
            icon: <AlertCircle className="w-4 h-4" />,
            color: "bg-red-100 text-red-700 border-red-200",
            count: "",
        },
        {
            value: "EVENT_ANNOUNCEMENT" as PostType,
            label: "Events",
            icon: <Calendar className="w-4 h-4" />,
            color: "bg-purple-100 text-purple-700 border-purple-200",
            count: "",
        },
    ];

    const handleFilterChange = (type: PostType) => {
        setSelectedFilter(type);
        filterPost(type);
        setIsDropdownOpen(false);
    };

    const selectedOption = filterOptions.find(
        (option) => option.value === selectedFilter
    );

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6 max-w-2xl mx-auto">
            {/* Header */}
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Posts</h1>

            {/* Filter Buttons - Desktop */}
            <div className="hidden md:flex flex-wrap gap-3 mb-4">
                {filterOptions.map((option) => (
                    <button
                        key={option.value}
                        onClick={() => handleFilterChange(option.value)}
                        className={`px-4 py-2 rounded-full border text-sm font-medium flex items-center gap-2 transition-all duration-200 hover:shadow-md ${
                            selectedFilter === option.value
                                ? option.color + " shadow-sm"
                                : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                        }`}
                    >
                        {option.icon}
                        {option.label}
                    </button>
                ))}
            </div>

            {/* Filter Dropdown - Mobile */}
            <div className="md:hidden relative">
                <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`w-full px-4 py-3 rounded-lg border text-sm font-medium flex items-center justify-between gap-2 transition-all duration-200 ${
                        selectedOption
                            ? selectedOption.color
                            : "bg-white text-gray-600 border-gray-300"
                    }`}
                >
                    <div className="flex items-center gap-2">
                        {selectedOption?.icon}
                        {selectedOption?.label}
                    </div>
                    <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                            isDropdownOpen ? "rotate-180" : ""
                        }`}
                    />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">
                        {filterOptions.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => handleFilterChange(option.value)}
                                className={`w-full px-4 py-3 text-left text-sm font-medium flex items-center gap-3 transition-colors hover:bg-gray-50 ${
                                    selectedFilter === option.value
                                        ? "bg-blue-50 text-blue-600"
                                        : "text-gray-700"
                                }`}
                            >
                                <div
                                    className={`p-1 rounded ${
                                        option.color.split(" ")[0]
                                    } ${option.color.split(" ")[1]}`}
                                >
                                    {option.icon}
                                </div>
                                {option.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Active Filter Indicator */}
            {selectedFilter !== "ALL" && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-blue-700 text-sm">
                            {selectedOption?.icon}
                            <span>
                                Showing {selectedOption?.label.toLowerCase()}
                            </span>
                        </div>
                        <button
                            onClick={() => handleFilterChange("ALL")}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                        >
                            Clear filter
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterPosts;
