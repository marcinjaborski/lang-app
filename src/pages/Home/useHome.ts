import { openDialog, useAppDispatch } from "@src/store";
import { Module } from "@src/types";
import { pb } from "@src/util";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";

export const useHome = () => {
  const { t } = useTranslation("home");
  const username = pb.authStore.model?.username;
  const dispatch = useAppDispatch();

  const query = useQuery("list-modules", () => {
    return pb.collection("modules").getFullList({
      expand: "notes(module)",
    }) as Promise<Module[]>;
  });

  const openCreateModuleDialog = () => dispatch(openDialog());

  return { t, username, openCreateModuleDialog, ...query, modules: query.data };
};
