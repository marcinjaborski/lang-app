import { MenuItem, TextField, TextFieldProps } from "@mui/material";
import { languages } from "@src/types";
import { mapLanguageToFlag } from "@src/util";
import ReactCountryFlag from "react-country-flag";

type LanguageSelectProps = TextFieldProps;

export const LanguageSelect = (props: LanguageSelectProps) => {
  return (
    <TextField select {...props}>
      {languages.map((lng) => (
        <MenuItem key={lng} value={lng}>
          <ReactCountryFlag countryCode={mapLanguageToFlag(lng)} svg />
        </MenuItem>
      ))}
    </TextField>
  );
};
