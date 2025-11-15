import { IUser } from "@/interface/user.interface";
import authRepo from "@/repositories/authRepo";
import { LoginFormValues } from "@/schemas/auth.schema";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: LoginFormValues) => {
      return await authRepo.login(data);
    },
    onSuccess: (response) => {
      if (response.error) {
        throw new Error(response.error);
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: IUser) => {
      return await authRepo.register(data);
    },
    onSuccess: ({ response, error }) => {
      if (error || response.error) {
        throw new Error(response.error || error);
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: async (refreshToken: string) => {
      return await authRepo.logout(refreshToken);
    },
    onSuccess: ({ response, error }) => {
      if (error || response.error) {
        throw new Error(response.error || error);
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export const useRefreshToken = () => {
  return useMutation({
    mutationFn: async (refreshToken: string) => {
      return await authRepo.refreshToken(refreshToken);
    },
    onSuccess: ({ response, error }) => {
      if (error || response.error) {
        throw new Error(response.error || error);
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export const useGetMe = () => {
  return useMutation({
    mutationFn: async () => {
      return await authRepo.me();
    },
    onSuccess: ({ response, error }) => {
      if (error || response.error) {
        throw new Error(response.error || error);
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: async (data: IUser) => {
      return await authRepo.changePassword(data);
    },
    onSuccess: ({ response, error }) => {
      if (error || response.error) {
        throw new Error(response.error || error);
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
