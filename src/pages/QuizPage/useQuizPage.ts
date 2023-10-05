import { useQuestions, useScoreRepository, useStudySetRepository, useTermRepository } from "@src/hooks";
import { isNotNullable, Question } from "@src/types";
import { calculateScore } from "@src/util";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

export const useQuizPage = () => {
  const { t } = useTranslation("study");
  const [page, setPage] = useState(1);
  const [answered, setAnswered] = useState<Record<string, string>>({});
  const questions = useQuestions();
  const [result, setResult] = useState<number | null>(null);
  const [timeTaken, setTimeTaken] = useState(0);
  const [points, setPoints] = useState(0);
  const terms = useTermRepository();
  const studySets = useStudySetRepository();
  const scores = useScoreRepository();

  const startTime = useMemo(() => performance.now(), []);

  const onEnd = () => {
    if (!questions) return;
    const elapsedTime = performance.now() - startTime;
    const answeredCorrectly = Object.entries(answered)
      .map(([key, value]) => {
        const question = questions.find((q) => q.term.base === key);
        if (question?.term.translation === value) return question.term.id;
      })
      .filter(isNotNullable);
    const timeInSeconds = Number((Math.round(elapsedTime) / 1000).toFixed(2));
    const score = calculateScore(timeInSeconds, answeredCorrectly.length / questions.length);
    setTimeTaken(timeInSeconds);
    setResult(answeredCorrectly.length);
    setPoints(score);
    terms.updateUnderstanding.mutate(answeredCorrectly);
    if (studySets.view.data) {
      scores.create.mutate({
        game: "quiz",
        studySetSharedId: studySets.view.data.sharedId,
        score,
      });
    }
  };

  const getAnswerColor = (question: Question, answer: string) => {
    if (result === null) return null;
    if (question.term.translation === answer) return "green";
    if (answered[question.term.base] === answer) return "red";
    return null;
  };

  return { t, page, setPage, questions, result, answered, setAnswered, onEnd, getAnswerColor, timeTaken, points };
};
