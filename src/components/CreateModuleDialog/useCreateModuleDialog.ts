import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../util/store";
import { changeNameValue, closeDialog } from "./createModuleDialogSlice";
import { useMutation, useQueryClient } from "react-query";
import pb, { pbError } from "../../util/pocketbase";
import { ModuleToCreate } from "../../util/types";
import { ChangeEvent } from "react";

export const useCreateModuleDialog = () => {
  const { t } = useTranslation("translation", { keyPrefix: "createModuleDialog" });
  const open = useAppSelector((state) => state.createModuleDialog.open);
  const name = useAppSelector((state) => state.createModuleDialog.name);
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    () => {
      const newModule: ModuleToCreate = {
        name,
        owner: pb.authStore.model!.id,
      };
      return pb.collection("modules").create(newModule);
    },
    {
      onSuccess() {
        queryClient.invalidateQueries("list-modules");
        dispatch(closeDialog());
      },
    },
  );

  const onClose = () => dispatch(closeDialog());
  const onCreate = () => mutation.mutate();
  const onNameChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    dispatch(changeNameValue(event.target.value));

  return { t, open, onClose, onCreate, onNameChange, ...mutation, error: mutation.error as pbError | undefined };
};
