import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import { Flashcard } from "@src/features/studying";
import { useStudySetRepository } from "@src/hooks";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Wrap } from "./FlashcardsPage.styled";

export const FlashcardsPage = () => {
  const { t } = useTranslation("study");
  const studySets = useStudySetRepository();
  const termsToLearn = studySets.view.data?.expand.terms || [];
  const [current, setCurrent] = useState(0);

  const goToPrev = () => {
    setCurrent((prevState) => (prevState === 0 ? termsToLearn.length - 1 : prevState - 1));
  };

  const goToNext = () => {
    setCurrent((prevState) => (prevState === termsToLearn.length - 1 ? 0 : prevState + 1));
  };

  return (
    <Wrap>
      {studySets.view.isLoading ? <CircularProgress /> : null}
      {studySets.view.data ? (
        <>
          <Typography variant="h4">
            {t("flashcardsHeader", { current: current + 1, all: termsToLearn.length })}
          </Typography>
          <Flashcard
            front={termsToLearn[current].base}
            back={termsToLearn[current].translation}
            key={termsToLearn[current].id}
          />
          <Box>
            <IconButton size="large" onClick={goToPrev}>
              <NavigateBeforeIcon />
            </IconButton>
            <IconButton size="large" onClick={goToNext}>
              <NavigateNextIcon />
            </IconButton>
          </Box>
        </>
      ) : null}
    </Wrap>
  );
};
