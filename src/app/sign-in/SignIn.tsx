"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import {
    Eye,
    EyeOff,
    Lock,
    ChevronRight,
    AlertCircle,
    UserRound,
} from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Link from "next/link";
import { toast } from "sonner";
import ForgotPassword from "./ForgotPassword";
import { useRouter } from "next/navigation";
import Gradient from "@/components/Gradient";
import { signIn } from "next-auth/react";

interface FormValues {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>();
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const onSubmit = async (data: FormValues) => {
        try {
            const response = await signIn("credentials", {
                redirect: false,
                ...data,
            });
            if (response?.ok) {
                toast.success("Signed in successfully!");
                router.push("/dashboard");
            } else {
                toast.error(response?.error || "Invalid credentials!");
            }
        } catch (error) {
            console.log(error);
            const errorMessage =
                (error as Error).message || "Something went wrong";
            toast.error(errorMessage);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center px-4 py-12 relative">
            <Gradient />

            <div className="w-full max-w-md mt-8">
                <div className="bg-card border border-border shadow-lg rounded-lg p-8">
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold text-foreground">
                            Welcome Back
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            Sign in to explore and share events around you
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <div className="space-y-1">
                            <label
                                htmlFor="email"
                                className="text-sm font-medium block text-foreground"
                            >
                                Email or Username
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                                    <UserRound size={18} />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    className={`w-full pl-10 pr-4 py-2 bg-input border ${
                                        errors.email
                                            ? "border-destructive"
                                            : "border-input"
                                    } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    placeholder=""
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address",
                                        },
                                    })}
                                />
                            </div>
                            {errors.email && (
                                <p className="text-destructive text-xs flex items-center mt-1">
                                    <AlertCircle size={12} className="mr-1" />
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="space-y-1">
                            <div className="flex justify-between items-center">
                                <label
                                    htmlFor="password"
                                    className="text-sm font-medium block text-foreground"
                                >
                                    Password
                                </label>
                                <Dialog>
                                    <DialogTrigger>
                                        <span className="text-xs text-blue-500 hover:text-blue-600 cursor-pointer">
                                            Forgot password?
                                        </span>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <ForgotPassword />
                                    </DialogContent>
                                </Dialog>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                                    <Lock size={18} />
                                </div>
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    className={`w-full pl-10 pr-12 py-2 bg-input border ${
                                        errors.password
                                            ? "border-destructive"
                                            : "border-input"
                                    } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    placeholder="••••••••"
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
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-destructive text-xs flex items-center mt-1">
                                    <AlertCircle size={12} className="mr-1" />
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            <span>Sign In</span>
                            {isSubmitting ? (
                                <svg
                                    className="animate-spin h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                            ) : (
                                <ChevronRight size={18} />
                            )}
                        </button>
                    </form>

                    {/* Already have account */}
                    <p className="text-center text-sm text-muted-foreground mt-6">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/sign-up"
                            className="text-blue-500 hover:underline font-medium"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
