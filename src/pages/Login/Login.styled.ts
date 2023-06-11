import { Button, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import styled from "styled-components";

export const LoginStyled = styled.main`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const Form = styled(Container).attrs({
  maxWidth: "xs",
  component: "form",
  sx: {
    display: "flex",
  },
})`
  flex-direction: column;
`;

export const LoginAvatar = styled(Avatar).attrs({ sx: { m: 1, bgcolor: "secondary.main" } })`
  align-self: center;
`;

export const Title = styled(Typography).attrs({ component: "h1", variant: "h5" })`
  text-align: center;
`;

export const SubmitButton = styled(Button).attrs({ variant: "contained" })`
  width: 50%;
  align-self: center;
  margin-top: 1em;
`;
