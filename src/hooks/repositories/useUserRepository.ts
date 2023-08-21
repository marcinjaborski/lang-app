import { User } from "@src/types";
import { pb } from "@src/util";

export const useUserRepository = () => {
  const getByUsername = (username: string) =>
    pb.collection("users").getFirstListItem<User>(`username="${username}" && id!="${pb.authStore.model?.id}"`);

  return { getByUsername };
};
