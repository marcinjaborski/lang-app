import { useModuleRepository } from "@src/hooks";
import { openDialog, useAppDispatch } from "@src/store";
import { pb } from "@src/util";
import { useTranslation } from "react-i18next";

export const useHome = () => {
  const { t } = useTranslation("home");
  const username = pb.authStore.model?.username;
  const dispatch = useAppDispatch();
  const modules = useModuleRepository();

  const openCreateModuleDialog = () => dispatch(openDialog({ type: "create" }));

  return { t, username, openCreateModuleDialog, ...modules.list, modules: modules.list.data };
};
