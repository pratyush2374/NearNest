"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Lock, Shield, CheckCircle2 } from "lucide-react";
import Gradient from "@/components/Gradient";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Loading from "@/components/Loading";

interface ResetPasswordFormData {
    password: string;
    confirmPassword: string;
}

const ResetPasswordComponent = () => {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        watch,
    } = useForm<ResetPasswordFormData>();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const password = watch("password");

    const onSubmit = async (data: ResetPasswordFormData) => {
        try {
            await axios.post("/api/reset-password", {
                password: data.password,
                token: decodeURIComponent(token || ""),
            });
            setIsSuccess(true);
        } catch (err) {
            const error = err as AxiosError;
            console.log(error);
            const errorMessage =
                (error.response?.data as { message?: string })?.message ||
                "Something went wrong";
            toast.error(errorMessage);
        }
    };

    const validateConfirmPassword = (value: string) => {
        if (!value) return "Please confirm your password";
        if (value !== password) return "Passwords do not match";
        return true;
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-background text-foreground relative flex items-center justify-center p-4">
                <Gradient />
                <div className="w-full max-w-md">
                    <div className="bg-card/50 backdrop-blur-xl border border-border rounded-2xl p-8 shadow-2xl">
                        <div className="text-center space-y-6">
                            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                                <CheckCircle2 className="w-8 h-8 text-green-500" />
                            </div>
                            <div className="space-y-2">
                                <h1 className="text-2xl font-bold">
                                    Password Reset Successful!
                                </h1>
                                <p className="text-muted-foreground">
                                    Your password has been successfully updated.
                                    You can now log in with your new password.
                                </p>
                            </div>
                            <Link
                                href="/sign-in"
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-xl transition-colors"
                            >
                                Continue to Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground relative flex items-center justify-center p-4">
            <Gradient />

            <div className="w-full max-w-md">
                <div className="bg-card/50 backdrop-blur-xl border border-border rounded-2xl p-8 shadow-2xl">
                    <div className="text-center space-y-4 mb-8">
                        <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto">
                            <Shield className="w-8 h-8 text-blue-500" />
                        </div>
                        <div className="space-y-2">
                            <h1 className="text-2xl font-bold">
                                Reset Your Password
                            </h1>
                            <p className="text-muted-foreground text-sm">
                                Create a new secure password for your NearNest
                                account
                            </p>
                        </div>
                    </div>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <div className="space-y-2">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium"
                            >
                                New Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    className={`block w-full pl-10 pr-10 py-3 bg-input border border-border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                                        errors.password ? "border-red-500" : ""
                                    }`}
                                    placeholder="Enter your new password"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 8,
                                            message:
                                                "Password must be at least 8 characters",
                                        },
                                    })}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                                    ) : (
                                        <Eye className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                                    )}
                                </button>
                            </div>

                            {errors.password && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium"
                            >
                                Confirm New Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <input
                                    id="confirmPassword"
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    className={`block w-full pl-10 pr-10 py-3 bg-input border border-border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                                        errors.confirmPassword
                                            ? "border-red-500"
                                            : ""
                                    }`}
                                    placeholder="Confirm your new password"
                                    {...register("confirmPassword", {
                                        validate: validateConfirmPassword,
                                    })}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                                    ) : (
                                        <Eye className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                                    )}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.confirmPassword.message}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Resetting Password...
                                </>
                            ) : (
                                "Reset Password"
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-xs text-muted-foreground">
                            Remember your password?{" "}
                            <Link
                                href="/sign-in"
                                className="text-blue-500 hover:text-blue-400 font-medium"
                            >
                                Sign in instead
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ResetPassword: React.FC = () => {
    return (
        <Suspense fallback={<Loading />}>
            <ResetPasswordComponent />
        </Suspense>
    );
};

export default ResetPassword;
