import { Button, Typography } from "@mui/material";
import classNames from "classnames";
import Draggable from "react-draggable";

import { GameBoard, GameWrap, Term } from "./MatchGamePage.styled";
import { useMatchGame } from "./useMatchGame";

export const MatchGamePage = () => {
  const { t, result, valid, words, overlapped, boardRef, buttonDisabled, randomizePosition, handleOverlap, onEnd } =
    useMatchGame();

  return (
    <GameWrap>
      <Typography align="center" variant="h3">
        {result === null ? t("matchGame") : t("result", { result })}
      </Typography>
      <GameBoard elevation={5} ref={boardRef}>
        {words && boardRef.current
          ? words.map((word) => (
              <Draggable bounds="parent" defaultPosition={randomizePosition()} key={word} onStop={handleOverlap}>
                <Term
                  className={classNames({
                    "overlap-valid": result === null && overlapped[word] === 1,
                    "overlap-invalid": result === null && overlapped[word] > 1,
                    correct: result !== null && valid[word],
                    incorrect: result !== null && !valid[word],
                  })}
                >
                  {word}
                </Term>
              </Draggable>
            ))
          : null}
      </GameBoard>
      <Button disabled={buttonDisabled} sx={{ alignSelf: "center" }} variant="contained" onClick={onEnd}>
        {t("endQuiz")}
      </Button>
    </GameWrap>
  );
};
