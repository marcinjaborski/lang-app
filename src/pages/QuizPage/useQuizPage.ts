import { useQuestions } from "@src/hooks/useQuestions";
import { Question } from "@src/types";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const useQuizPage = () => {
  const { t } = useTranslation("study");
  const [page, setPage] = useState(1);
  const [answered, setAnswered] = useState<Record<string, string>>({});
  const questions = useQuestions();
  const [result, setResult] = useState<number | null>(null);

  const onEnd = () => {
    if (!questions) return;
    setResult(
      Object.entries(answered).reduce((acc, [key, value]) => {
        const question = questions.find((q) => q.term.base === key);
        if (!question) return acc;
        return question.term.translation === value ? acc + 1 : acc;
      }, 0),
    );
  };

  const getAnswerColor = (question: Question, answer: string) => {
    if (result === null) return null;
    if (question.term.translation === answer) return "green";
    if (answered[question.term.base] === answer) return "red";
    return null;
  };

  return { t, page, setPage, questions, result, answered, setAnswered, onEnd, getAnswerColor };
};
