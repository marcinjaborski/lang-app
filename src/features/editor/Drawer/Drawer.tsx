import { MenuItem } from "@mui/material";
import { LanguageSelect } from "@src/components";
import { DrawerStyled, ExcerptTextField, ModuleSelect, SaveButton } from "./Drawer.styled";
import { useDrawer } from "./useDrawer";

export const Drawer = () => {
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
  } = useDrawer();

  return (
    <DrawerStyled anchor="right" open={open} onClose={onClose}>
      <LanguageSelect label={t("baseLang")} value={baseLang} onChange={onBaseLangChange} />
      <LanguageSelect label={t("targetLang")} value={targetLang} onChange={onTargetLangChange} />
      <ModuleSelect select label={t("module")} value={module} onChange={onModuleChange}>
        {modules?.map((module) => (
          <MenuItem key={module.id} value={module.id}>
            {module.name}
          </MenuItem>
        ))}
      </ModuleSelect>
      <ExcerptTextField
        multiline
        minRows={3}
        maxRows={8}
        label={t("excerpt")}
        value={excerpt}
        onChange={onExcerptChange}
      />
      <SaveButton variant="contained" onClick={onSave}>
        {t("save")}
      </SaveButton>
    </DrawerStyled>
  );
};
