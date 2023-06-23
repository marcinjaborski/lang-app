import { primaryColor } from "@src/util";
import { Editable } from "slate-react";
import styled from "styled-components";

export const NoteEditorStyled = styled.div`
  width: 50%;
  margin-top: 1em;
  display: flex;
  flex-direction: column;
`;

export const EditableStyled = styled(Editable)`
  background: whitesmoke;
  padding: 1em;
  flex-grow: 1;
  border: 2px dotted ${primaryColor};
`;
