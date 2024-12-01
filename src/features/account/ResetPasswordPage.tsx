import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { ResetPasswordReq } from "@/types";
import useResetPassword from "./useResetPassword";

function ResetPasswordPage() {
  const { isPending, resetPassword } = useResetPassword();
  const { token } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ResetPasswordReq>();

  function onSubmit(data: ResetPasswordReq) {
    data.token = token;
    resetPassword(data);
  }

  return (
    <div className="min-h-screen bg-dribbble-light flex flex-col">
      <Link
        to="/"
        className="p-4 text-dribbble-primary hover:text-dribbble-secondary transition-colors inline-flex items-center"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Home
      </Link>

      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-lg">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-dribbble-heading">
              Reset Your Password
            </h2>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="password" className="text-dribbble-heading">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
                    },
                  })}
                  className="mt-1"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="passwordConfirm"
                  className="text-dribbble-heading"
                >
                  PasswordConfirm
                </Label>
                <Input
                  id="passwordConfirm"
                  type="password"
                  {...register("passwordConfirm", {
                    required: "PasswordConfirm is required",
                    validate: (value) =>
                      value === watch("password") || "Passwords don't match",
                  })}
                  className="mt-1"
                />
                {errors.passwordConfirm && (
                  <p className="text-sm text-red-500">
                    {errors.passwordConfirm.message}
                  </p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-dribbble-primary hover:bg-dribbble-secondary text-white"
              disabled={isPending}
            >
              {isPending ? "Changing..." : "Change Password"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
