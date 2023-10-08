import { useScoreRepository, useUserRepository } from "@src/hooks";
import { useAppDispatch } from "@src/store";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { useTranslation } from "react-i18next";

export const useProfilePage = () => {
  const { currentUser, updateAvatar, updateUser, getByUsername } = useUserRepository();
  const { t } = useTranslation("profile");
  const dispatch = useAppDispatch();
  const [friendValue, setFriendValue] = useState("");
  const scores = useScoreRepository();

  const getPoints = (userId: string = "") =>
    scores.list.data?.reduce((acc, score) => {
      if (score.user !== userId) return acc;
      return acc + score.score;
    }, 0);

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
    if (!newFriend) return;
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
    getPoints,
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
