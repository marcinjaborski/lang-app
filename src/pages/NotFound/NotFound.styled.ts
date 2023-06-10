import styled from "styled-components";
import { backgroundColor } from "@src/util";

export const NotFoundStyled = styled.main`
  display: grid;
  place-items: center;

  .bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .bottom button {
    width: fit-content;
  }

  .notfound {
    width: 100%;
    text-align: center;
  }

  .notfound .notfound-404 h1 {
    font-size: 16em;
    font-weight: 900;
    margin-left: -20px;
    text-transform: uppercase;
    letter-spacing: -40px;
    line-height: 0.8;
  }

  .notfound .notfound-404 h1 > span {
    text-shadow: -8px 0 0 ${backgroundColor};
  }

  .notfound .notfound-404 h3 {
    font-size: 1.2em;
    font-weight: 700;
    text-transform: uppercase;
    margin: 0;
    letter-spacing: 3px;
    padding-left: 6px;
  }
`;
