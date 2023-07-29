import { closeDialog, showSuccess, useAppDispatch, useAppSelector } from "@src/store";
import { Module } from "@src/types";
import { pb, pbError } from "@src/util";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useModuleRepository = () => {
  const { t } = useTranslation("feedback");
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const name = useAppSelector((state) => state.createModuleDialog.name);

  const list = useQuery<Module[]>("list-modules", () => {
    return pb.collection("modules").getFullList<Module>({
      expand: "notes(module)",
    });
  });

  const create = useMutation<Module, pbError>(
    () => {
      return pb.collection("modules").create({
        name,
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

  return { list, create, delete: deleteMutation };
};
