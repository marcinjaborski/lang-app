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
import { Language } from "@src/types";
import ReactCountryFlag from "react-country-flag";
import { SaveButton, SettingsContainer, SettingsStyled, SpinnerWrap, TagsWrap } from "./Settings.styled";
import { useSettingsPage } from "./useSettingsPage";

export const Settings = () => {
  const {
    t,
    settings,
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
      <SettingsContainer elevation={5} component="main">
        <Typography variant="h3">{t("title")}</Typography>
        {settingsRepository.view.isLoading || tagsRepository.list.isLoading ? (
          <SpinnerWrap>
            <CircularProgress />
          </SpinnerWrap>
        ) : null}
        {settingsRepository.view.data ? (
          <>
            <TextField select label={t("userLanguage")} value={state.language} onChange={onLangChange}>
              <MenuItem value="en">
                <ReactCountryFlag countryCode="GB" svg />
              </MenuItem>
              <MenuItem value="pl">
                <ReactCountryFlag countryCode="PL" svg />
              </MenuItem>
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
                id="newTagInput"
                value={state.tagLabel}
                onChange={(event) => state.setTagLabel(event.target.value)}
                onKeyDown={(e) => e.key === "Enter" && onCreateTag()}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={onCreateTag}>
                      <AddIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <TagsWrap>
              {state.tags.map((tag) => (
                <TagChip key={tag.label} tag={tag} onDelete={onDeleteTag} onColorChange={onColorChange} />
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
