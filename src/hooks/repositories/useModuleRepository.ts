import { closeDialog, showSuccess, useAppDispatch } from "@src/store";
import { Module, ModuleToCreate, UpdateRecord } from "@src/types";
import { pb, pbError } from "@src/util";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useModuleRepository = () => {
  const { t } = useTranslation("feedback");
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const list = useQuery<Module[]>("list-modules", () => {
    return pb.collection("modules").getFullList<Module>({
      expand: "notes(module)",
    });
  });

  const create = useMutation<Module, pbError, ModuleToCreate>(
    (module) => {
      return pb.collection("modules").create({
        ...module,
        owner: pb.authStore.model!.id,
      });
    },
    {
      async onSuccess() {
        await queryClient.invalidateQueries("list-modules");
        dispatch(closeDialog());
        dispatch(showSuccess(t("created")));
      },
    },
  );

  const update = useMutation<Module, pbError, UpdateRecord<ModuleToCreate>>(
    ({ id, record }) => {
      return pb.collection("modules").update(id, record);
    },
    {
      async onSuccess() {
        await queryClient.invalidateQueries("list-modules");
        dispatch(closeDialog());
        dispatch(showSuccess(t("updated")));
      },
    },
  );

  const deleteMutation = useMutation<boolean, pbError, string>(
    (id: string) => {
      return pb.collection("modules").delete(id);
    },
    {
      async onSuccess() {
        await queryClient.invalidateQueries("list-modules");
        dispatch(showSuccess(t("deleted")));
      },
    },
  );

  return { list, create, update, delete: deleteMutation };
};
