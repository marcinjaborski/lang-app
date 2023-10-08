import { CircularProgress, FormControlLabel, Pagination, Radio, RadioGroup, Typography } from "@mui/material";
import Button from "@mui/material/Button";

import { QuestionPaper, Wrap } from "./QuizPage.styled";
import { useQuizPage } from "./useQuizPage";

export const QuizPage = () => {
  const { t, page, setPage, questions, result, answered, setAnswered, getAnswerColor, onEnd, points, timeTaken } =
    useQuizPage();

  if (questions === null)
    return (
      <Wrap>
        <CircularProgress />
      </Wrap>
    );

  const currentQuestion = questions[page - 1];
  const base = currentQuestion.term.base;

  return (
    <Wrap>
      <Typography align="center" gutterBottom variant="h3" visibility={result === null ? "hidden" : "visible"}>
        {t("result", { result })}
      </Typography>
      <Typography align="center" gutterBottom variant="h4" visibility={result === null ? "hidden" : "visible"}>
        {t("timeTaken", { timeTaken })}
      </Typography>
      <Typography align="center" gutterBottom variant="h4" visibility={result === null ? "hidden" : "visible"}>
        {t("points", { points })}
      </Typography>
      <QuestionPaper>
        <Typography variant="h4">{base}</Typography>
        <RadioGroup
          key={base}
          value={answered[base]}
          onChange={(_, value) => setAnswered((prevState) => ({ ...prevState, [base]: value }))}
        >
          {currentQuestion.answers.map((answer) => (
            <FormControlLabel
              control={<Radio />}
              key={answer}
              label={answer}
              sx={{ color: getAnswerColor(currentQuestion, answer) }}
              value={answer}
            />
          ))}
        </RadioGroup>
      </QuestionPaper>
      <Pagination color="primary" count={questions.length} page={page} onChange={(_, value) => setPage(value)} />
      <Button
        disabled={result !== null}
        sx={{ mt: 3, visibility: page === questions.length ? "visible" : "hidden" }}
        variant="contained"
        onClick={onEnd}
      >
        {t("endQuiz")}
      </Button>
    </Wrap>
  );
};
