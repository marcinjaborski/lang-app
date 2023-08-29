import { pb } from "@src/util";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { LoginButton, LoginPrompt, NotFoundStyled, Number, NumbersWrap, Title } from "./NotFound.styled";

export const NotFound = () => {
  const { t } = useTranslation("notFound");
  const navigate = useNavigate();
  const isLogged = pb.authStore.isValid;

  return (
    <NotFoundStyled>
      <div>
        <Title variant="h3">{t("title")}</Title>
        <NumbersWrap variant="h1">
          <Number>4</Number>
          <Number>0</Number>
          <Number>4</Number>
        </NumbersWrap>
      </div>
      {!isLogged ? (
        <LoginPrompt>
          {t("notLoggedText")}
          <LoginButton variant="contained" onClick={() => navigate("/login")}>
            {t("login")}
          </LoginButton>
        </LoginPrompt>
      ) : null}
    </NotFoundStyled>
  );
};
