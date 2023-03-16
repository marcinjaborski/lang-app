import styled from "styled-components";

export const HomeStyled = styled.div`
  padding: 1em;
  display: flex;
  flex-direction: column;
  width: 100%;

  .empty-message {
    flex-grow: 1;
    display: grid;
    align-content: center;
    justify-items: center;
  }
`;
