import { useQuestions, useTermRepository } from "@src/hooks";
import { isNotNullable, Question } from "@src/types";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const useQuizPage = () => {
  const { t } = useTranslation("study");
  const [page, setPage] = useState(1);
  const [answered, setAnswered] = useState<Record<string, string>>({});
  const questions = useQuestions();
  const [result, setResult] = useState<number | null>(null);
  const terms = useTermRepository();

  const onEnd = () => {
    if (!questions) return;
    const answeredCorrectly = Object.entries(answered)
      .map(([key, value]) => {
        const question = questions.find((q) => q.term.base === key);
        if (question?.term.translation === value) return question.term.id;
      })
      .filter(isNotNullable);
    setResult(answeredCorrectly.length);
    terms.updateUnderstanding.mutate(answeredCorrectly);
  };

  const getAnswerColor = (question: Question, answer: string) => {
    if (result === null) return null;
    if (question.term.translation === answer) return "green";
    if (answered[question.term.base] === answer) return "red";
    return null;
  };

  return { t, page, setPage, questions, result, answered, setAnswered, onEnd, getAnswerColor };
};
