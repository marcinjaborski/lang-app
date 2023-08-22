import { useStudySetRepository, useUserRepository } from "@src/hooks";
import { showError, useAppDispatch } from "@src/store";
import { StudySet, User } from "@src/types";
import { KeyboardEvent, useState } from "react";
import { useTranslation } from "react-i18next";

export const useStudySetElement = (studySet: StudySet) => {
  const { t } = useTranslation("study");
  const [optionsAnchor, setOptionsAnchor] = useState<HTMLElement | null>(null);
  const optionsMenuOpen = !!optionsAnchor;
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [shareTo, setShareTo] = useState("");
  const studySets = useStudySetRepository();
  const { getByUsername } = useUserRepository();
  const dispatch = useAppDispatch();
  const { id, title } = studySet;
  const terms = studySet.expand.terms || [];
  const shared = studySet.expand.shared || [];

  const onMenuClose = () => setOptionsAnchor(null);

  const onShareDialogClose = () => {
    setShareDialogOpen(false);
    setShareTo("");
  };

  const onShare = async () => {
    let user: User | null = null;
    try {
      user = await getByUsername(shareTo);
    } catch (e) {
      dispatch(showError("noUser"));
    }
    if (!user) return;
    const newShared = [...shared.map((user) => user.id), user.id];
    studySets.update.mutate({ id, record: { shared: newShared } });
    studySets.share.mutate({ user: user.id, studySet: id });
    setShareTo("");
  };

  const onKeyDown = async (e: KeyboardEvent) => {
    if (e.key !== "Enter") return;
    await onShare();
  };

  return {
    t,
    id,
    title,
    shareTo,
    optionsMenuOpen,
    shareDialogOpen,
    terms,
    shared,
    optionsAnchor,
    setOptionsAnchor,
    setShareDialogOpen,
    setShareTo,
    onShare,
    onShareDialogClose,
    onMenuClose,
    onKeyDown,
  };
};
