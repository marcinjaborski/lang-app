import { changeNameValue, closeDialog, useAppDispatch, useAppSelector } from "@src/store";
import { ModuleToCreate, pb, pbError } from "@src/util";
import { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";

export const useCreateModuleDialog = () => {
  const { t } = useTranslation("createModuleDialog");
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
      async onSuccess() {
        await queryClient.invalidateQueries("list-modules");
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
