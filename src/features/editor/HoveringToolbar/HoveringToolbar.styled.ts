import { theme } from "@src/util";
import styled from "styled-components";

export const HoveringToolbarStyled = styled.div`
  position: absolute;
  top: -10000px;
  left: -10000px;
  opacity: 0;
  background-color: ${theme.palette.text.primary};
  border-radius: 4px;
  transition: opacity 500ms ease;
`;
