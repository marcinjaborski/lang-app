import styled from "styled-components";

export const HomeStyled = styled.main`
  padding: 1em;
  display: flex;
  flex-direction: column;

  .empty-message {
    flex-grow: 1;
    display: grid;
    align-content: center;
    justify-items: center;
  }
`;
