import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import pb from "../../util/pocketbase";

export const useNoteCard = () => {
  const { t } = useTranslation("home");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const openedMenu = !!anchorEl;
  const onMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const onMenuClose = () => setAnchorEl(null);

  const deleteMutation = useMutation(
    (id: string) => {
      return pb.collection("notes").delete(id);
    },
    {
      onSuccess() {
        queryClient.invalidateQueries("list-modules");
      },
    },
  );

  const onDelete = (id: string) => deleteMutation.mutate(id);

  return { t, anchorEl, openedMenu, onMenuOpen, onMenuClose, navigate, deleteMutation, onDelete };
};
