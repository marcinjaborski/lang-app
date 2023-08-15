import { Button, LinearProgress, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Card } from "./StudySetElement.styled";

type StudySetElementProps = {
  id: string;
  title: string;
  numberOfTerms: number;
};

export const StudySetElement = ({ id, title, numberOfTerms }: StudySetElementProps) => {
  const { t } = useTranslation("study");

  return (
    <Card>
      <Typography variant="h6" align="center">
        {title}
      </Typography>
      <Typography variant="caption" align="center">
        {numberOfTerms} {t("terms")}
      </Typography>
      <LinearProgress variant="determinate" value={50} color="secondary" />
      <Link to={`/flashcards/${id}`}>
        <Button>{t("flashcards")}</Button>
      </Link>
      <Link to={`/quiz/${id}`}>
        <Button>{t("quiz")}</Button>
      </Link>
    </Card>
  );
};
