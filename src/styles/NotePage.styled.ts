import styled from "styled-components";

export const NotePageStyled = styled.main`
  display: flex;
  justify-content: center;

  .note-editor-root {
    min-width: fit-content;
    width: 50%;
  }

  .drawer-button {
    position: fixed;
    top: 1em;
    right: 1em;
  }
`;
