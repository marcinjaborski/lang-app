import styled from "styled-components";

export const LoginStyled = styled.main`
  display: grid;
  justify-content: center;
  grid-template-columns: 1fr;

  .wrap {
    overflow: hidden;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  form .MuiAvatar-root {
    align-self: center;
  }

  form h1 {
    text-align: center;
  }

  form button {
    width: 50%;
    align-self: center;
    margin-top: 1em;
  }
`;
