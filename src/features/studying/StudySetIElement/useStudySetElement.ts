import { useStudySetRepository, useUserRepository } from "@src/hooks";
import { setLeaderboardsStudySetId, useAppDispatch } from "@src/store";
import { StudySet, TermUnderstanding } from "@src/types";
import { getProgress } from "@src/util";
import { KeyboardEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const useStudySetElement = (studySet: StudySet) => {
  const { t } = useTranslation("study");
  const [optionsAnchor, setOptionsAnchor] = useState<HTMLElement | null>(null);
  const optionsMenuOpen = !!optionsAnchor;
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [shareTo, setShareTo] = useState("");
  const studySets = useStudySetRepository();
  const { getByUsername } = useUserRepository();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id, title } = studySet;
  const terms = studySet.expand.terms || [];
  const shared = studySet.expand.shared || [];
  const progress = getProgress(terms);

  const mapColorUnderstanding: Record<TermUnderstanding, string> = {
    0: "tomato",
    "1": "orange",
    "2": "yellow",
    "3": "lime",
  };

  const onMenuClose = () => setOptionsAnchor(null);

  const onShareDialogClose = () => {
    setShareDialogOpen(false);
    setShareTo("");
  };

  const onShare = async () => {
    const user = await getByUsername(shareTo);
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

  const onDelete = () => {
    studySets.delete.mutate(id);
  };

  const openLeaderboardsPopup = () => {
    dispatch(setLeaderboardsStudySetId(studySet.sharedId));
  };

  return {
    t,
    id,
    title,
    progress,
    shareTo,
    optionsMenuOpen,
    shareDialogOpen,
    deleteDialogOpen,
    terms,
    shared,
    optionsAnchor,
    navigate,
    mapColorUnderstanding,
    setOptionsAnchor,
    setShareDialogOpen,
    setDeleteDialogOpen,
    setShareTo,
    onShare,
    onShareDialogClose,
    onMenuClose,
    onKeyDown,
    onDelete,
    openLeaderboardsPopup,
  };
};
