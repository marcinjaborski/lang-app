import { Box, Button, LinearProgress, Tooltip, Typography } from "@mui/material";
import { Term } from "@src/types";
import { FINAL_UNDERSTANDING } from "@src/util";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Card } from "./StudySetElement.styled";

type StudySetElementProps = {
  id: string;
  title: string;
  terms: Term[];
};

export const StudySetElement = ({ id, title, terms }: StudySetElementProps) => {
  const { t } = useTranslation("study");

  return (
    <Card>
      <Typography variant="h6" align="center">
        {title}
      </Typography>
      <Tooltip
        title={
          <Box fontSize={18}>
            {terms.map((term) => (
              <Box
                sx={{
                  textDecoration: term.understanding === FINAL_UNDERSTANDING ? "line-through" : "",
                  textDecorationColor: ({ palette }) => palette.primary.main,
                  textDecorationThickness: 3,
                }}
              >
                {term.base}
              </Box>
            ))}
          </Box>
        }
      >
        <Typography variant="caption" align="center">
          {terms.length} {t("terms")}
        </Typography>
      </Tooltip>
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
