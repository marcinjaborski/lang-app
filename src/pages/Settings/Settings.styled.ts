import { Paper, PaperProps } from "@mui/material";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { WithComponent } from "@src/types";

export const SettingsStyled = styled("div")`
  display: grid;
  place-items: center;
  height: 100vh;
  flex: 1;
  padding: ${({ theme }) => theme.spacing(3)};
`;

export const SettingsContainer = styled(Paper)<WithComponent<PaperProps>>`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-inline: auto;
  padding: ${({ theme }) => theme.spacing(3)};
  gap: ${({ theme }) => theme.spacing(1)};
`;

export const SpinnerWrap = styled("div")`
  flex: 1;
  display: grid;
  place-items: center;
`;

export const TagsWrap = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(1),
  maxWidth: 300,
  position: "relative",
}));

export const SaveButton = styled(Button)`
  margin-top: auto;
  align-self: center;
`;
