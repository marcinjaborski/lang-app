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

  .skeleton-module {
    width: 50%;
    height: 3em;
  }

  .skeleton-notes {
    display: flex;
    gap: 1em;
  }

  .skeleton-notes span {
    width: 150px;
    height: 200px;
    transform: scale(1);
  }
`;
