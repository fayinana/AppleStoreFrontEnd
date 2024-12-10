// module import
import { useRef, useState } from "react";
// third party import
import { useForm } from "react-hook-form";
import { PencilIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// project import
import { useAuth } from "@/contexts/AuthContext";
import { PasswordChangeData, User } from "@/types";
import {
  useChangePassword,
  useProfileChange,
  useProfileImageChange,
} from "./useAccountManagmant";

export default function Profile() {
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { user } = useAuth();

  const { isChangingPassword, changePassword } = useChangePassword();
  const { isUpdatingProfile, updateProfile } = useProfileChange();
  const { isChangingImage, updateImage } = useProfileImageChange();

  const {
    register: accountRegister,
    handleSubmit: handleAccountSubmit,
    formState: { errors: accountError },
  } = useForm<User>();

  const {
    register: passwordRegister,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordError },
    watch,
  } = useForm<{
    passwordCurrent: string;
    password: string;
    passwordConfirm: string;
  }>();

  function onProfileChange(data: User) {
    updateProfile(data);
  }

  function onPasswordSubmit(data: PasswordChangeData) {
    changePassword(data);
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      const urlImage = URL.createObjectURL(selectedFile);
      setImagePreview(urlImage);
    }
  }

  function handleIconClick() {
    fileInputRef.current.click();
  }

  function onImageSubmit(event) {
    event.preventDefault();
    const form = new FormData();
    if (fileInputRef.current.files.length > 0) {
      const file = fileInputRef.current.files[0];
      form.append("image", file);
    } else {
      console.error("No file selected");
    }
    updateImage(form);
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-dribbble-heading mb-8 text-center sm:text-4xl">
        Profile Settings
      </h1>
      <div className="flex flex-col md:flex-row flex-wrap w-full justify-center gap-12 md:gap-20 items-center">
        <div className="mb-8 max-w-full sm:max-w-[400px] md:max-w-[500px] w-full">
          <Card>
            <CardHeader>
              <CardTitle className="text-center md:text-left">
                Profile Picture
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <form onSubmit={onImageSubmit}>
                <div className="relative flex flex-col items-center">
                  <Avatar className="h-28 w-28 rounded-full border-4 border-gray-200 shadow-md overflow-hidden">
                    {imagePreview || user?.image ? (
                      <img
                        src={imagePreview || user?.image}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <AvatarFallback className="bg-gray-200 text-gray-600">
                        {user?.firstName?.charAt(0) || "U"}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <label
                    onClick={handleIconClick}
                    htmlFor="imageInput"
                    className="absolute bottom-2 right-2 bg-gray-700 text-white p-2 rounded-full cursor-pointer hover:bg-gray-800"
                  >
                    <PencilIcon className="h-3 w-3" />
                  </label>
                  <Input
                    ref={fileInputRef}
                    id="imageInput"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </div>
                {imagePreview && (
                  <div className="flex gap-4 mt-4 justify-center">
                    <Button type="submit" disabled={isChangingImage}>
                      {isChangingImage ? "Uploading..." : "Save"}
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setImagePreview(null)}
                      variant="secondary"
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>

        <Tabs
          defaultValue="profile"
          className="space-y-4 max-w-full md:max-w-[500px] w-full"
        >
          <TabsList className="flex justify-center md:justify-start gap-2">
            <TabsTrigger value="profile" data-test-id="profile">
              Update Profile
            </TabsTrigger>
            <TabsTrigger value="password" data-test-id="password">
              Change Password
            </TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Update Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={handleAccountSubmit(onProfileChange)}
                  className="space-y-4"
                >
                  <div>
                    <Input
                      placeholder="First Name"
                      defaultValue={user?.firstName}
                      {...accountRegister("firstName", {
                        required: "First Name is required",
                      })}
                    />
                    {accountError.firstName && (
                      <p className="text-red-500 text-sm">
                        {accountError.firstName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Input
                      placeholder="Last Name"
                      defaultValue={user?.lastName}
                      {...accountRegister("lastName", {
                        required: "Last Name is required",
                      })}
                    />
                    {accountError.lastName && (
                      <p className="text-red-500 text-sm">
                        {accountError.lastName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Input
                      placeholder="Email"
                      defaultValue={user?.email}
                      {...accountRegister("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Please enter a valid email address",
                        },
                      })}
                      className="mt-1"
                    />
                    {accountError.email && (
                      <p className="text-red-500 text-sm">
                        {accountError.email.message}
                      </p>
                    )}
                  </div>
                  <Button type="submit">
                    {isUpdatingProfile ? "Updating..." : "Update Profile"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={handlePasswordSubmit(onPasswordSubmit)}
                  className="space-y-4"
                >
                  <div>
                    <Input
                      type="password"
                      placeholder="Current Password"
                      {...passwordRegister("passwordCurrent", {
                        required: "Current Password is required",
                      })}
                      className="mt-1"
                    />
                    {passwordError.passwordCurrent && (
                      <p className="text-red-500 text-sm">
                        {passwordError.passwordCurrent.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Input
                      type="password"
                      placeholder="New Password"
                      {...passwordRegister("password", {
                        required: "New Password is required",
                        minLength: {
                          value: 8,
                          message:
                            "Password must be at least 8 characters long",
                        },
                      })}
                      className="mt-1"
                    />
                    {passwordError.password && (
                      <p className="text-red-500 text-sm">
                        {passwordError.password.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Input
                      type="password"
                      placeholder="Confirm New Password"
                      {...passwordRegister("passwordConfirm", {
                        required: "Password Confirm is required",
                        validate: (value) =>
                          value === watch("password") ||
                          "Passwords don't match",
                      })}
                      className="mt-1"
                    />
                    {passwordError.passwordConfirm && (
                      <p className="text-red-500 text-sm">
                        {passwordError.passwordConfirm.message}
                      </p>
                    )}
                  </div>
                  <Button type="submit" disabled={isChangingPassword}>
                    {isChangingPassword ? "Updating..." : "Update Password"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
