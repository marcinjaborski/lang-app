import { CircularProgress, FormControlLabel, Pagination, Radio, RadioGroup, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { QuestionPaper, Wrap } from "./QuizPage.styled";
import { useQuizPage } from "./useQuizPage";

export const QuizPage = () => {
  const { t, page, setPage, questions, result, answered, setAnswered, getAnswerColor, onEnd } = useQuizPage();

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
      <Typography variant="h3" align="center" gutterBottom visibility={result === null ? "hidden" : "visible"}>
        {t("result", { result })}
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
              sx={{ color: getAnswerColor(currentQuestion, answer) }}
              key={answer}
              control={<Radio />}
              label={answer}
              value={answer}
            />
          ))}
        </RadioGroup>
      </QuestionPaper>
      <Pagination count={questions.length} color="primary" page={page} onChange={(_, value) => setPage(value)} />
      <Button
        variant="contained"
        sx={{ mt: 3, visibility: page === questions.length ? "visible" : "hidden" }}
        onClick={onEnd}
        disabled={result !== null}
      >
        {t("endQuiz")}
      </Button>
    </Wrap>
  );
};
