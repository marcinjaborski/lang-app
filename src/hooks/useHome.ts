import { useQuery } from "react-query";
import pb from "../util/pocketbase";
import { Module } from "../util/types";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../redux/store";
import { openDialog } from "../redux/createModuleDialogSlice";

export const useHome = () => {
  const { t } = useTranslation("translation", { keyPrefix: "home" });
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
