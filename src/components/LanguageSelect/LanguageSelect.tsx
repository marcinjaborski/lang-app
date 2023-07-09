import { MenuItem, TextField, TextFieldProps } from "@mui/material";
import { languages } from "@src/types";
import ReactCountryFlag from "react-country-flag";

type LanguageSelectProps = TextFieldProps & {};

export const LanguageSelect = (props: LanguageSelectProps) => {
  return (
    <TextField select {...props}>
      {languages.map((lng) => (
        <MenuItem value={lng} key={lng}>
          <ReactCountryFlag countryCode={(lng === "en" ? "gb" : lng).toUpperCase()} svg />
        </MenuItem>
      ))}
    </TextField>
  );
};
