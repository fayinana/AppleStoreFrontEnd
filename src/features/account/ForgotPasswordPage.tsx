import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import useForgetPassword from "./useForgetPassword";

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const { isPending, forgotPassword } = useForgetPassword();
  const onSubmit = async (data: { email: string }) => {
    forgotPassword(data);
  };

  return (
    <div className="container mx-auto py-8 px-4 min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-dribbble-heading">
            Forgot Password
          </h1>
          <p className="mt-2 text-dribbble-text">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-6 bg-white p-8 rounded-xl shadow-lg"
        >
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-dribbble-heading"
            >
              Email address
            </label>
            <Input
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
              placeholder="Enter your email"
              className="w-full"
            />
            {errors?.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-dribbble-primary hover:bg-dribbble-secondary text-white"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending Reset Link...
              </>
            ) : (
              "Send Reset Link"
            )}
          </Button>

          <div className="text-center mt-4">
            <Link
              to="/login"
              className="text-sm text-dribbble-primary hover:text-dribbble-secondary"
              data-test-id="login"
            >
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
