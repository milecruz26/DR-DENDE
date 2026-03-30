import { User } from "@/interfaces";
import { userService } from "@/services/user";
import { storage } from "@/utils/storage";
import { STORAGE_KEYS } from "@/constants/storageKeys";
import { mapEstablishmentToUser } from "@/mappers/establishmentToUser";
import { useQuery } from "@tanstack/react-query";

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async (): Promise<User> => {
      const token = await storage.getItem(STORAGE_KEYS.TOKEN);
      if (!token) throw new Error("No token");

      const userType = await storage.getItem(STORAGE_KEYS.USER_TYPE);

      switch (userType) {
        case "common": {
          const { data } = await userService.getCurrentUser();
          return data;
        }
        case "establishment": {
          const { data } = await userService.getCurrentEstablishment();
          return mapEstablishmentToUser(data);
        }
        case "staff": {
          const cached = await storage.getItem(STORAGE_KEYS.STAFF_USER);
          if (!cached) throw new Error("No cached staff user data");
          const parsed: unknown = JSON.parse(cached);
          if (
            typeof parsed === "object" &&
            parsed !== null &&
            "id" in parsed &&
            "username" in parsed
          ) {
            return parsed as User;
          }
          throw new Error("Invalid cached staff user data");
        }
        default:
          throw new Error(`Unknown user_type: ${userType}`);
      }
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};
