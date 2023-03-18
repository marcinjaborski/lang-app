import { MenuItem, TextField, TextFieldProps } from "@mui/material";

import ReactCountryFlag from "react-country-flag";
import { languages } from "../util/types";

type LanguageSelectProps = TextFieldProps & {};

const LanguageSelect = (props: LanguageSelectProps) => {
  return (
    <TextField select {...props}>
      {languages.map((lng) => (
        <MenuItem value={lng} key={lng}>
          <ReactCountryFlag countryCode={lng.toUpperCase()} svg />
        </MenuItem>
      ))}
    </TextField>
  );
};

export default LanguageSelect;
