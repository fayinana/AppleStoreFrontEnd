import { useMutation } from "@tanstack/react-query";
import {
  updatePassword as updatePasswordApi,
  updateProfile as updateProfileApi,
  updateImage as updateImageApi,
} from "./../../services/apiAuth";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export function useChangePassword() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isPending: isChangingPassword, mutate: changePassword } = useMutation(
    {
      mutationFn: updatePasswordApi,
      mutationKey: ["user"],
      onSuccess: () => {
        toast({
          title: "Password Updated",
          description: "Your password has been updated successfully.",
        });
        navigate("/login");
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
      },
    }
  );
  return { isChangingPassword, changePassword };
}

export function useProfileChange() {
  const { toast } = useToast();

  const { isPending: isUpdatingProfile, mutate: updateProfile } = useMutation({
    mutationFn: updateProfileApi,
    mutationKey: ["user"],
    onSuccess: () => {
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
  });

  return { isUpdatingProfile, updateProfile };
}

export function useProfileImageChange() {
  const { toast } = useToast();

  const { isPending: isChangingImage, mutate: updateImage } = useMutation({
    mutationFn: updateProfileApi,
    mutationKey: ["user"],
    onSuccess: () => {
      toast({
        title: "Profile Updated",
        description: "Your profile Image has been updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
  });

  return { isChangingImage, updateImage };
}
