import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { pb } from "@src/util";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { NotFoundStyled } from "./NotFound.styled";

export const NotFound = () => {
  const { t } = useTranslation("notFound");
  const navigate = useNavigate();
  const isLogged = pb.authStore.isValid;

  return (
    <NotFoundStyled>
      <div className="notfound">
        <div className="notfound-404">
          <Typography variant="h3">{t("title")}</Typography>
          <Typography variant="h1">
            <span>4</span>
            <span>0</span>
            <span>4</span>
          </Typography>
        </div>
        {!isLogged ? (
          <Typography className="bottom">
            {t("notLoggedText")}
            <Button variant="contained" onClick={() => navigate("/login")}>
              {t("login")}
            </Button>
          </Typography>
        ) : null}
      </div>
    </NotFoundStyled>
  );
};
