import { LoaderCircle } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-64 w-full">
      <LoaderCircle className="animate-spin text-gray-500 w-8 h-8" />
      <span className="ml-2 text-gray-600 text-sm">Loading...</span>
    </div>
  );
};

export default Loading;
