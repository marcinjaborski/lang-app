import AddIcon from "@mui/icons-material/Add";
import {
  CircularProgress,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { LanguageSelect } from "@src/components";
import { TagChip } from "@src/features/settings";
import { appColors, Language } from "@src/types";
import ReactCountryFlag from "react-country-flag";

import { SaveButton, SettingsContainer, SettingsStyled, SpinnerWrap, TagsWrap } from "./Settings.styled";
import { useSettingsPage } from "./useSettingsPage";

export const Settings = () => {
  const {
    t,
    settingsRepository,
    tagsRepository,
    onCreateTag,
    onDeleteTag,
    onColorChange,
    onLangChange,
    onSave,
    ...state
  } = useSettingsPage();

  return (
    <SettingsStyled>
      <SettingsContainer component="main" elevation={5}>
        <Typography variant="h3">{t("title")}</Typography>
        {settingsRepository.view.isLoading || tagsRepository.list.isLoading ? (
          <SpinnerWrap>
            <CircularProgress />
          </SpinnerWrap>
        ) : null}
        {settingsRepository.view.data ? (
          <>
            <TextField label={t("userLanguage")} select value={state.language} onChange={onLangChange}>
              <MenuItem value="en">
                <ReactCountryFlag countryCode="GB" svg />
              </MenuItem>
              <MenuItem value="pl">
                <ReactCountryFlag countryCode="PL" svg />
              </MenuItem>
            </TextField>
            <TextField label={t("appColor")} select value={state.appColor} onChange={state.onAppColorChange}>
              {appColors.map((color) => (
                <MenuItem key={color} value={color}>
                  {t(`appColors.${color}`)}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label={t("separator")}
              value={state.separator}
              onChange={(event) => state.setSeparator(event.target.value)}
            />
            <LanguageSelect
              label={t("defaultBaseLang")}
              value={state.baseLang}
              onChange={(event) => state.setBaseLang(event.target.value as Language)}
            />
            <LanguageSelect
              label={t("defaultTargetLang")}
              value={state.targetLang}
              onChange={(event) => state.setTargetLang(event.target.value as Language)}
            />
            <FormControl>
              <InputLabel htmlFor="newTagInput">{t("newTag")}</InputLabel>
              <Input
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={onCreateTag}>
                      <AddIcon />
                    </IconButton>
                  </InputAdornment>
                }
                id="newTagInput"
                value={state.tagLabel}
                onChange={(event) => state.setTagLabel(event.target.value)}
                onKeyDown={(e) => e.key === "Enter" && onCreateTag()}
              />
            </FormControl>
            <TagsWrap>
              {state.tags.map((tag) => (
                <TagChip key={tag.label} tag={tag} onColorChange={onColorChange} onDelete={onDeleteTag} />
              ))}
            </TagsWrap>
            <SaveButton variant="contained" onClick={onSave}>
              {t("save")}
            </SaveButton>
          </>
        ) : null}
      </SettingsContainer>
    </SettingsStyled>
  );
};
