import { Button, Typography } from "@mui/material";
import { backgroundColor } from "@src/util";
import styled from "styled-components";

export const NotFoundStyled = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

export const NotFound404 = styled.div``;

export const Title = styled(Typography).attrs({
  variant: "h3",
  sx: {
    fontSize: "1.2em",
    fontWeight: 700,
  },
})`
  text-transform: uppercase;
  letter-spacing: 3px;
  padding-left: 6px;
`;

export const NumbersWrap = styled(Typography).attrs({
  variant: "h1",
  sx: {
    fontSize: "16em",
    fontWeight: 900,
    ml: 3,
    lineHeight: 0.8,
  },
})`
  text-transform: uppercase;
  letter-spacing: -40px;
`;

export const Number = styled.span`
  text-shadow: -8px 0 0 ${backgroundColor};
`;

export const LoginPrompt = styled(Typography)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LoginButton = styled(Button).attrs({ variant: "contained" })`
  width: fit-content;
`;
