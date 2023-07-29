import { useModuleRepository, useNoteRepository } from "@src/hooks";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const useCreateNoteDialog = (close: () => void) => {
  const { t } = useTranslation("createNoteDialog");
  const [module, setModule] = useState<string>("");
  const notes = useNoteRepository();
  const modules = useModuleRepository();
  const navigate = useNavigate();

  const onCreate = () => {
    const noteModule = modules.list.data?.find((m) => m.id === module);
    const notesInModule = noteModule?.expand["notes(module)"]?.length || 0;

    notes.create.mutate(
      {
        title: `${t("newNoteName")} #${notesInModule + 1}`,
        module,
      },
      {
        onSuccess(note) {
          close();
          navigate(`/note/${note.id}`);
        },
      },
    );
  };

  return { t, error: notes.create.error, module, setModule, onCreate, modules: modules.list.data };
};
