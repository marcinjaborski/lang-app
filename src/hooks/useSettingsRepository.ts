import { showSuccess, useAppDispatch } from "@src/store";
import { Settings, SettingsToCreate } from "@src/types";
import { pb } from "@src/util";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useSettingsRepository = () => {
  const { t } = useTranslation("settings");
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const view = useQuery<Settings>(
    "view-settings",
    () => {
      return pb.collection("settings").getFirstListItem<Settings>("");
    },
    {
      retry: 0,
    },
  );

  const create = useMutation(
    (settings: SettingsToCreate) => {
      return pb.collection("settings").create({
        ...settings,
        user: pb.authStore.model!.id,
      });
    },
    {
      async onSuccess() {
        await queryClient.invalidateQueries("view-settings");
      },
    },
  );

  const update = useMutation(
    (settings: SettingsToCreate) => {
      return pb.collection("settings").update(view.data!.id, settings);
    },
    {
      async onSuccess() {
        dispatch(showSuccess(t("updated")));
        await queryClient.invalidateQueries("view-settings");
      },
    },
  );

  return { view, create, update };
};
