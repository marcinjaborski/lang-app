import { CircularProgress, MenuItem, TextField, Typography } from "@mui/material";
import { LanguageSelect } from "@src/components";
import { Language } from "@src/types";
import ReactCountryFlag from "react-country-flag";
import { SaveButton, SettingsContainer, SettingsStyled, SpinnerWrap } from "./Settings.styled";
import { useSettingsPage } from "./useSettingsPage";

export const Settings = () => {
  const { t, settings, settingsRepository, onLangChange, onSave, ...state } = useSettingsPage();

  return (
    <SettingsStyled>
      <SettingsContainer elevation={5} component="main">
        <Typography variant="h3">{t("title")}</Typography>
        {settingsRepository.view.isLoading ? (
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
            <SaveButton variant="contained" onClick={onSave}>
              {t("save")}
            </SaveButton>
          </>
        ) : null}
      </SettingsContainer>
    </SettingsStyled>
  );
};