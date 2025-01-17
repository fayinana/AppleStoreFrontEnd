// module import
// third party import
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// project import
import useLogin from "./useLogin";
import { LoginReq } from "@/types";

function LoginPage() {
  const { isPending, login } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginReq>();

  function onSubmit(data: LoginReq) {
    login(data);
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
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-dribbble-text">
              Or {"  "}
              <Link
                to="/signup"
                className="font-medium text-dribbble-primary hover:text-dribbble-secondary"
                data-test-id="signup"
              >
                create a new account
              </Link>
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-dribbble-heading">
                  Email address
                </Label>
                <Input
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                  className="mt-1"
                />
                {errors?.email && (
                  <p className="text-red-500 text-sm">
                    {errors?.email?.message}
                  </p>
                )}
              </div>

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
                {errors?.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-dribbble-primary hover:text-dribbble-secondary"
                data-test-id="forgot-password"
              >
                Forgot your password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-dribbble-primary hover:bg-dribbble-secondary text-white"
              disabled={isPending}
            >
              {isPending ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
