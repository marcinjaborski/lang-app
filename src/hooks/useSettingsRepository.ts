import { Settings, SettingsToCreate } from "@src/types";
import { pb } from "@src/util";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useSettingsRepository = () => {
  const queryClient = useQueryClient();

  const view = useQuery<Settings>("view-settings", () => {
    return pb.collection("settings").getFirstListItem<Settings>("");
  });

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
        await queryClient.invalidateQueries("view-settings");
      },
    },
  );

  return { view, create, update };
};
