import { SelectChangeEvent } from "@mui/material";
import {
  useModuleRepository,
  useNoteRepository,
  useStudySetRepository,
  useTagsRepository,
  useTermRepository,
} from "@src/hooks";
import {
  closeStudyDialog,
  setExcludeTags,
  setIncludeTags,
  showError,
  useAppDispatch,
  useAppSelector,
} from "@src/store";
import { Term } from "@src/types";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const useStudySetCreateDialog = () => {
  const { t } = useTranslation("studySetCreate");
  const dialogState = useAppSelector((state) => state.createStudyDialog);
  const dispatch = useAppDispatch();
  const modules = useModuleRepository();
  const notes = useNoteRepository();
  const tags = useTagsRepository();
  const terms = useTermRepository();
  const studySets = useStudySetRepository();
  const [studySetTerms, setStudySetTerms] = useState<Term[]>([]);

  useEffect(() => {
    let studySetTerms = terms.list.data;
    if (!studySetTerms) return;
    if (dialogState.from === "module") {
      const selectedModule = modules.list.data?.find((module) => module.id === dialogState.fromId);
      if (!selectedModule) return;
      studySetTerms = studySetTerms.filter((term) =>
        selectedModule.expand["notes(module)"]?.find((note) => note.id === term.note),
      );
    }
    if (dialogState.from === "note") {
      const selectedNote = notes.list.data?.find((note) => note.id === dialogState.fromId);
      if (!selectedNote) return;
      studySetTerms = studySetTerms.filter((term) => term.note === selectedNote.id);
    }
    if (dialogState.includeTags.length) {
      studySetTerms = studySetTerms.filter((term) => _.intersection(term.tags, dialogState.includeTags).length > 0);
    }
    if (dialogState.excludeTags.length) {
      studySetTerms = studySetTerms.filter((term) => _.intersection(term.tags, dialogState.excludeTags).length === 0);
    }
    setStudySetTerms(studySetTerms);
  }, [dialogState.open, dialogState.from, dialogState.fromId, dialogState.includeTags, dialogState.excludeTags]);

  const onClose = () => {
    dispatch(closeStudyDialog());
  };

  const onIncludeTagsChange = (e: SelectChangeEvent<string[]>) => {
    const value = e.target.value;
    const newTags = typeof value === "string" ? value.split(",") : value;
    dispatch(setIncludeTags(newTags));
  };

  const onExcludeTagsChange = (e: SelectChangeEvent<string[]>) => {
    const value = e.target.value;
    const newTags = typeof value === "string" ? value.split(",") : value;
    dispatch(setExcludeTags(newTags));
  };

  const onCreate = () => {
    if (!dialogState.title) {
      dispatch(showError(t("emptyTitle")));
      return;
    }
    if (dialogState.from === "module") {
      const selectedModule = modules.list.data?.find((module) => module.id === dialogState.fromId);
      if (!selectedModule) {
        dispatch(showError(t("selectModule")));
        return;
      }
    }
    if (dialogState.from === "note") {
      const selectedNote = notes.list.data?.find((note) => note.id === dialogState.fromId);
      if (!selectedNote) {
        dispatch(showError(t("selectNote")));
        return;
      }
    }
    if (studySetTerms.length === 0) {
      dispatch(showError(t("noTerms")));
      return;
    }
    studySets.create.mutate(
      { title: dialogState.title, terms: studySetTerms.map((term) => term.id) },
      {
        onSuccess() {
          onClose();
        },
      },
    );
  };

  return {
    t,
    dialogState,
    dispatch,
    studySetTerms,
    notes,
    modules,
    tags,
    onClose,
    onCreate,
    onIncludeTagsChange,
    onExcludeTagsChange,
  };
};
