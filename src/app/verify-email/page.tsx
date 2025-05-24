"use client";

import React, { useState, useEffect, Suspense } from "react";
import axios, { AxiosError } from "axios";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { CheckCircle, XCircle, Loader2, ArrowRight } from "lucide-react";
import Gradient from "@/components/Gradient";
import Link from "next/link";
import Loading from "@/components/Loading";
const VerifyEmailComponent: React.FC = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const [verificationState, setVerificationState] = useState<
        "loading" | "success" | "error"
    >("loading");
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
        const verifyEmail = async () => {
            if (!token) {
                setVerificationState("error");
                setErrorMessage("No verification token provided");
                toast.error("No verification token provided");
                return;
            }

            try {
                await axios.post("/api/verify-email", { token });
                setVerificationState("success");
                toast.success("Email verified successfully!");
            } catch (err) {
                const error = err as AxiosError;
                const errorMessage =
                    (error.response?.data as { message?: string })?.message ||
                    "Something went wrong";
                setVerificationState("error");
                setErrorMessage(errorMessage);
                toast.error(errorMessage);
            }
        };

        verifyEmail();
    }, [token]);

    const renderContent = () => {
        switch (verificationState) {
            case "loading":
                return (
                    <div className="text-center space-y-6">
                        <div className="mx-auto w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center">
                            <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
                        </div>
                        <div className="space-y-3">
                            <h1 className="text-3xl font-bold text-foreground">
                                Verifying Your Email
                            </h1>
                            <p className="text-muted-foreground text-lg">
                                Please wait while we verify your email
                                address...
                            </p>
                        </div>
                        <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                            <div
                                className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
                                style={{ animationDelay: "0.2s" }}
                            ></div>
                            <div
                                className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
                                style={{ animationDelay: "0.4s" }}
                            ></div>
                        </div>
                    </div>
                );

            case "success":
                return (
                    <div className="text-center space-y-6">
                        <div className="mx-auto w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-10 h-10 text-green-500" />
                        </div>
                        <div className="space-y-3">
                            <h1 className="text-3xl font-bold text-foreground">
                                Email Verified Successfully!
                            </h1>
                            <p className="text-muted-foreground text-lg">
                                Your email has been verified
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/dashboard"
                                className="inline-flex items-center justify-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200"
                            >
                                <span>Continue to Dashboard</span>
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </div>
                    </div>
                );

            case "error":
                return (
                    <div className="text-center space-y-6">
                        <div className="mx-auto w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center">
                            <XCircle className="w-10 h-10 text-red-500" />
                        </div>
                        <div className="space-y-3">
                            <h1 className="text-3xl font-bold text-foreground">
                                Verification Failed
                            </h1>
                            <p className="text-muted-foreground text-lg">
                                {errorMessage ||
                                    "We encountered an issue verifying your email address."}
                            </p>
                        </div>
                        <div className="bg-card border border-border rounded-lg p-6 text-left space-y-4">
                            <h3 className="font-semibold text-foreground">
                                What you can do:
                            </h3>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li>
                                    • Check if the verification link has expired
                                </li>
                                <li>• Request a new verification email</li>
                                <li>
                                    • Contact our support team if the issue
                                    persists
                                </li>
                            </ul>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-background relative flex items-center justify-center p-4">
            <Gradient />
            <div className="w-full max-w-md mt-14">
                
                <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 shadow-lg">
                    {renderContent()}
                </div>

                
                
            </div>
        </div>
    );
};

const VerifyEmail: React.FC = () => {
    return (
        <Suspense fallback={<Loading />}>
            <VerifyEmailComponent />
        </Suspense>
    );
};

export default VerifyEmail;
