import { useQuestions, useScoreRepository, useStudySetRepository, useTermRepository } from "@src/hooks";
import { areElementsOverlapping, calculateScore, pairs } from "@src/util";
import _ from "lodash";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export const useMatchGame = () => {
  const { t } = useTranslation("study");
  const boardRef = useRef<HTMLDivElement>(null);
  const questions = useQuestions(false);
  const words = questions && _.flatten(questions.map(({ term }) => [term.base, term.translation]));
  const [overlapped, setOverlapped] = useState<Record<string, number>>({});
  const [valid, setValid] = useState<Record<string, boolean>>({});
  const [result, setResult] = useState<number | null>(null);
  const [timeTaken, setTimeTaken] = useState(0);
  const [points, setPoints] = useState(0);
  const [mounted, setMounted] = useState(false);
  const buttonDisabled = !Object.values(overlapped).every((value) => value === 1) || result !== null;
  const terms = useTermRepository();
  const scores = useScoreRepository();
  const studySets = useStudySetRepository();

  const startTime = useMemo(() => performance.now(), []);

  const [maxX, maxY] = useMemo(() => {
    if (!boardRef.current) return [0, 0];
    const computedStyle = getComputedStyle(boardRef.current);
    const termWidth = 150;
    const termHeight = 54;

    const boardHeight =
      boardRef.current.clientHeight - parseFloat(computedStyle.paddingTop) - parseFloat(computedStyle.paddingBottom);
    const boardWidth =
      boardRef.current.clientWidth - parseFloat(computedStyle.paddingLeft) - parseFloat(computedStyle.paddingRight);

    return [boardWidth - termWidth, boardHeight - termHeight];
  }, [boardRef.current]);

  const randomizePosition = () => {
    return { x: _.random(0, maxX, false), y: _.random(0, maxY, false) };
  };

  const handleOverlap = () => {
    if (!boardRef.current) return;
    const words = [...boardRef.current.children];
    const wordsPairs = pairs(words);
    const newOverlapped: Record<string, number> = {};
    words.forEach((word) => (newOverlapped[word.innerHTML] = 0));
    wordsPairs.forEach(([word1, word2]) => {
      if (!areElementsOverlapping(word1, word2)) return;
      newOverlapped[word1.innerHTML]++;
      newOverlapped[word2.innerHTML]++;
    });
    setOverlapped(newOverlapped);
  };

  useEffect(() => {
    if (!mounted && words && boardRef.current) {
      setTimeout(() => {
        handleOverlap();
        setMounted(true);
      }, 200);
    }
  }, [words, boardRef.current, mounted]);

  const onEnd = () => {
    if (!boardRef.current || !questions) return;
    const elapsedTime = performance.now() - startTime;
    let right = 0;
    const newValid: Record<string, boolean> = {};
    const words = [...boardRef.current.children];
    const wordsPairs = pairs(words);
    const termsToUpdate: string[] = [];
    wordsPairs.forEach(([word1, word2]) => {
      if (!areElementsOverlapping(word1, word2)) return;
      const term = questions.find(({ term }) => term.base === word1.innerHTML)?.term;
      if (!term) return;
      const isCorrect =
        (term.base === word1.innerHTML && term.translation === word2.innerHTML) ||
        (term.base === word2.innerHTML && term.translation === word1.innerHTML);
      if (isCorrect) {
        right++;
        termsToUpdate.push(term.id);
      }
      newValid[word1.innerHTML] = isCorrect;
      newValid[word2.innerHTML] = isCorrect;
    });
    const timeInSeconds = Number((Math.round(elapsedTime) / 1000).toFixed(2));
    const score = calculateScore(timeInSeconds, termsToUpdate.length / questions.length);
    setResult(right);
    setTimeTaken(timeInSeconds);
    setValid(newValid);
    setPoints(score);
    terms.updateUnderstanding.mutate(termsToUpdate);
    if (studySets.view.data) {
      scores.create.mutate({
        game: "match",
        studySetSharedId: studySets.view.data.sharedId,
        score,
      });
    }
  };

  return {
    t,
    result,
    words,
    overlapped,
    boardRef,
    valid,
    buttonDisabled,
    randomizePosition,
    handleOverlap,
    onEnd,
    timeTaken,
    points,
  };
};
