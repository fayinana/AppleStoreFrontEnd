import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { SignupReq } from "@/types";
import useSignUp from "./useSignup";

function SignUpPage() {
  const { isPending, signup } = useSignUp();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignupReq>();

  function onSubmit(data: SignupReq) {
    signup(data);
  }

  return (
    <>
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
                Create your account
              </h2>
              <p className="mt-2 text-sm text-dribbble-text">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-dribbble-primary hover:text-dribbble-secondary"
                  data-test-id="login"
                >
                  Sign in here
                </Link>
              </p>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="firstName" className="text-dribbble-heading">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                    className="mt-1"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="lastName" className="text-dribbble-heading">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                    className="mt-1"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>

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
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
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
                    Confirm Password
                  </Label>
                  <Input
                    id="passwordConfirm"
                    type="password"
                    {...register("passwordConfirm", {
                      required: "Password confirmation is required",
                      validate: (value) =>
                        value === watch("password") || "Passwords don't match",
                    })}
                    className="mt-1"
                  />
                  {errors.passwordConfirm && (
                    <p className="text-red-500 text-sm">
                      {errors.passwordConfirm.message}
                    </p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                disabled={isPending}
                className="w-full bg-dribbble-primary hover:bg-dribbble-secondary"
              >
                {isPending ? "Signing up..." : "Sign Up"}
              </Button>
            </form>
          </div>
        </div>
      </div>
      <div />
    </>
  );
}
export default SignUpPage;
