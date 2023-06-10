import { Button, MenuItem, TextField } from "@mui/material";
import { LanguageSelect } from "@src/components";
import { NoteDrawerStyled } from "./NoteDrawer.styled";
import { useNoteDrawer } from "./useNoteDrawer";

export const NoteDrawer = () => {
  const {
    t,
    open,
    onClose,
    baseLang,
    targetLang,
    onBaseLangChange,
    onTargetLangChange,
    module,
    onModuleChange,
    excerpt,
    onExcerptChange,
    onSave,
    modules,
  } = useNoteDrawer();

  return (
    <NoteDrawerStyled anchor="right" open={open} onClose={onClose}>
      <LanguageSelect label={t("baseLang")} value={baseLang} onChange={onBaseLangChange} />
      <LanguageSelect label={t("targetLang")} value={targetLang} onChange={onTargetLangChange} />
      <TextField select label={t("module")} fullWidth value={module} onChange={onModuleChange}>
        {modules?.map((module) => (
          <MenuItem key={module.id} value={module.id}>
            {module.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        multiline
        minRows={3}
        maxRows={8}
        fullWidth
        label={t("excerpt")}
        value={excerpt}
        onChange={onExcerptChange}
      />
      <Button variant="contained" onClick={onSave}>
        {t("save")}
      </Button>
    </NoteDrawerStyled>
  );
};
