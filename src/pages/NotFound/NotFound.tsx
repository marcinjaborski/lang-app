import { pb } from "@src/util";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { LoginButton, LoginPrompt, NotFound404, NotFoundStyled, Number, NumbersWrap, Title } from "./NotFound.styled";

export const NotFound = () => {
  const { t } = useTranslation("notFound");
  const navigate = useNavigate();
  const isLogged = pb.authStore.isValid;

  return (
    <NotFoundStyled>
      <NotFound404>
        <Title>{t("title")}</Title>
        <NumbersWrap>
          <Number>4</Number>
          <Number>0</Number>
          <Number>4</Number>
        </NumbersWrap>
      </NotFound404>
      {!isLogged ? (
        <LoginPrompt>
          {t("notLoggedText")}
          <LoginButton onClick={() => navigate("/login")}>{t("login")}</LoginButton>
        </LoginPrompt>
      ) : null}
    </NotFoundStyled>
  );
};
