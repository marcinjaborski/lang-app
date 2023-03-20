import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import pb from "../../util/pocketbase";
import { Module } from "../../util/types";

export const useNoteShelf = () => {
  const { t } = useTranslation("translation", { keyPrefix: "home" });
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const openedMenu = !!anchorEl;
  const queryClient = useQueryClient();

  const onMenuOpen = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => setAnchorEl(event.currentTarget);
  const onMenuClose = () => setAnchorEl(null);

  const deleteMutation = useMutation(
    (id: string) => {
      return pb.collection("modules").delete(id);
    },
    {
      onSuccess() {
        queryClient.invalidateQueries("list-modules");
      },
    },
  );

  const onDelete = (module: Module) => {
    const numberOfNotes = module.expand["notes(module)"]?.length;
    if (numberOfNotes && numberOfNotes > 0) {
      return;
    }
    deleteMutation.mutate(module.id);
  };

  return { t, anchorEl, openedMenu, onMenuOpen, onMenuClose, onDelete };
};
