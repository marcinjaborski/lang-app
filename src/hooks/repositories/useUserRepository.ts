import { showError, showSuccess, useAppDispatch } from "@src/store";
import { User } from "@src/types";
import { pb, pbError } from "@src/util";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";

export const useUserRepository = () => {
  const currentUser = pb.authStore.model as unknown as User | null;
  const { t } = useTranslation("feedback");
  const dispatch = useAppDispatch();

  const getByUsername = (username: string) => pb.collection("users").getFirstListItem<User>(`username="${username}"`);

  const updateAvatar = useMutation(
    (file: File) => {
      const formData = new FormData();
      formData.append("avatar", file);
      return pb.collection("users").update(currentUser?.id || "", formData, { expand: "friends" });
    },
    {
      onSuccess() {
        dispatch(showSuccess(t("avatarChanged")));
      },
      onError() {
        dispatch(showError(t("avatarError")));
      },
    },
  );

  const updateUser = useMutation<void, pbError, Partial<User>>(
    (user) => {
      return pb.collection("users").update(currentUser?.id || "", user, { expand: "friends" });
    },
    {
      onSuccess() {
        dispatch(showSuccess(t("profileUpdate")));
      },
      onError() {
        dispatch(showError(t("profileError")));
      },
    },
  );

  return { currentUser, getByUsername, updateAvatar, updateUser };
};
