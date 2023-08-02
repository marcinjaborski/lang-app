import { useModuleRepository } from "@src/hooks";
import { changeNameValue, closeDialog, useAppDispatch, useAppSelector } from "@src/store";
import { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

export const useCreateDialog = () => {
  const { t } = useTranslation("createModuleDialog");
  const state = useAppSelector((state) => state.createModuleDialog);
  const dispatch = useAppDispatch();
  const modules = useModuleRepository();

  const onClose = () => dispatch(closeDialog());

  const onCreate = () => {
    if (state.type === "create") {
      modules.create.mutate({ name: state.name });
    }
    if (state.type === "update" && state.moduleId) {
      modules.update.mutate({ id: state.moduleId, record: { name: state.name } });
    }
  };

  const onNameChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    dispatch(changeNameValue(event.target.value));

  return {
    t,
    state,
    onClose,
    onCreate,
    onNameChange,
    ...modules.create,
  };
};
