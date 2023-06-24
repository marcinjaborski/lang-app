import { useModuleRepository } from "@src/hooks";
import { changeNameValue, closeDialog, useAppDispatch, useAppSelector } from "@src/store";
import { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

export const useCreateDialog = () => {
  const { t } = useTranslation("createModuleDialog");
  const open = useAppSelector((state) => state.createModuleDialog.open);
  const dispatch = useAppDispatch();
  const modules = useModuleRepository();

  const onClose = () => dispatch(closeDialog());
  const onCreate = () => modules.create.mutate();
  const onNameChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    dispatch(changeNameValue(event.target.value));

  return {
    t,
    open,
    onClose,
    onCreate,
    onNameChange,
    ...modules.create,
  };
};
