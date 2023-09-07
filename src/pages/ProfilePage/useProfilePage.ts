import { useUserRepository } from "@src/hooks";
import { useAppDispatch } from "@src/store";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { useTranslation } from "react-i18next";

export const useProfilePage = () => {
  const { currentUser, updateAvatar, updateUser, getByUsername } = useUserRepository();
  const { t } = useTranslation("profile");
  const dispatch = useAppDispatch();
  const [friendValue, setFriendValue] = useState("");

  const onFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    updateAvatar.mutate(file);
  };

  const onDeleteThumbnail = () => {
    updateUser.mutate({ avatar: null });
  };

  const onPublicChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateUser.mutate({ public: e.target.checked });
  };

  const onAddFriend = async () => {
    const newFriend = await getByUsername(friendValue);
    updateUser.mutate(
      { "friends+": newFriend.id },
      {
        onSuccess() {
          setFriendValue("");
        },
      },
    );
  };

  const onDeleteFriend = (id: string) => {
    updateUser.mutate({ "friends-": id });
  };

  const onKeyDown = async (e: KeyboardEvent) => {
    if (e.key === "Enter") await onAddFriend();
  };

  return {
    t,
    currentUser,
    friendValue,
    setFriendValue,
    dispatch,
    onFileUpload,
    onDeleteThumbnail,
    onPublicChange,
    onAddFriend,
    onDeleteFriend,
    onKeyDown,
  };
};
