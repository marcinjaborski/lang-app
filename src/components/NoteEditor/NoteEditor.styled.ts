import styled from "styled-components";
import { primaryColor } from "@src/util";

export const NoteEditorStyled = styled.div`
  margin-top: 1em;
  display: flex;
  flex-direction: column;

  .editor {
    background: whitesmoke;
    padding: 1em;
    flex-grow: 1;
    border: 2px dotted ${primaryColor};
  }
`;
