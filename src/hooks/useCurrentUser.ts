import { userService } from "@/services/user";
import { storage } from "@/utils/storage";
import { useQuery } from "@tanstack/react-query";

const TOKEN_KEY = "auth_token";

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const token = await storage.getItem(TOKEN_KEY);
      if (!token) throw new Error("No token");
      const { data } = await userService.getCurrentUser();
      return data;
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};
