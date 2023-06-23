import { pb } from "@src/util";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

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
      async onSuccess() {
        await queryClient.invalidateQueries("list-modules");
      },
    },
  );

  const onDelete = (id: string) => deleteMutation.mutate(id);

  return { t, anchorEl, openedMenu, onMenuOpen, onMenuClose, navigate, deleteMutation, onDelete };
};
