import {
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { MailCheck, AlertCircle, ArrowRight, Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

const ForgotPassword: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<{ email: string }>();
    const [isSuccess, setIsSuccess] = useState(false);

    const onSubmit = async (data: { email: string }) => {
        try {
            await axios.post("/api/forgot-password", data);
            setIsSuccess(true);
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong, Re-try");
        }
    };

    return (
        <>
            <DialogHeader className="space-y-2 mb-6">
                <DialogTitle className="text-2xl font-bold text-foreground">
                    Reset your password
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">
                    Enter your email address and we&apos;ll send you a link to
                    reset your password.
                </DialogDescription>
            </DialogHeader>

            <div className="px-1">
                {isSuccess ? (
                    <div className="text-center space-y-4 py-4">
                        <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400">
                            <MailCheck size={24} />
                        </div>
                        <h3 className="font-medium text-lg">
                            Check your inbox
                        </h3>
                        <p className="text-muted-foreground text-sm">
                            We&apos;ve sent you a password reset link. Please
                            check your email to continue.
                        </p>
                    </div>
                ) : (
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <div className="space-y-1">
                            <label
                                htmlFor="email"
                                className="text-sm font-medium block text-foreground"
                            >
                                Email address
                            </label>
                            <div className="relative">
                                <input
                                    id="email"
                                    type="email"
                                    className={`w-full p-2 bg-input border ${
                                        errors.email
                                            ? "border-destructive"
                                            : "border-input"
                                    } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    placeholder="you@example.com"
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
                                    {errors.email.message as string}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            <span>Send reset link</span>
                            {isSubmitting ? (
                                <Loader2 size={18} className="animate-spin" />
                            ) : (
                                <ArrowRight size={18} />
                            )}
                        </button>
                    </form>
                )}
            </div>
        </>
    );
};

export default ForgotPassword;
