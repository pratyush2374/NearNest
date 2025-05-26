import { Mail, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

const Page = () => {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white border border-gray-200 rounded-lg shadow-lg p-8">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                        <Mail className="w-8 h-8 text-blue-500" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        Check Your Email
                    </h1>
                </div>

                <div className="space-y-4 mb-8">
                    <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center mt-0.5">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                            We have sent a verification link to your email
                        </p>
                    </div>

                    <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center mt-0.5">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                            Please check your inbox and click the verification
                            link
                        </p>
                    </div>

                    <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-5 h-5 bg-red-100 rounded-full flex items-center justify-center mt-0.5">
                            <Clock className="w-3 h-3 text-red-500" />
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                            <span className="font-medium text-red-600">
                                Important:
                            </span>{" "}
                            Unverified accounts will be terminated in 3 days
                        </p>
                    </div>
                </div>

                <div className="space-y-3">
                    <Link href="/feed" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors">
                        <span>Go to Feed</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>

                    <p className="text-center text-sm text-gray-500">
                        Didn&apos;t receive the email? Check your spam folder or
                        contact support: pratyushsharma2374@gmail.com
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Page;
