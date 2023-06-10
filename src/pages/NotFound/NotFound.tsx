import { NotFoundStyled } from "./NotFound.styled";
import { useTranslation } from "react-i18next";
import pb from "../../util/pocketbase";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

const NotFound = () => {
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

export default NotFound;
