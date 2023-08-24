import { useModuleRepository, useNoteRepository } from "@src/hooks";
import { openDialog, useAppDispatch } from "@src/store";
import { pb } from "@src/util";
import { OnDragEndResponder } from "react-beautiful-dnd";
import { useTranslation } from "react-i18next";

export const useHome = () => {
  const { t } = useTranslation("home");
  const username = pb.authStore.model?.username;
  const dispatch = useAppDispatch();
  const modules = useModuleRepository();
  const notes = useNoteRepository();

  const openCreateModuleDialog = () => dispatch(openDialog({ type: "create" }));

  const onDragEnd: OnDragEndResponder = ({ draggableId, destination }) => {
    if (!destination) return;
    if (destination.droppableId === notes.list.data?.find((note) => note.id === draggableId)?.module) return;
    notes.update.mutate({ id: draggableId, record: { module: destination.droppableId } });
  };

  return { t, notes, username, openCreateModuleDialog, onDragEnd, ...modules.list, modules: modules.list.data };
};
