import { Typography } from "@mui/material";
import { useState } from "react";

import { Container, Side } from "./Flashcard.styled";

type FlashcardProps = {
  front: string;
  back: string;
};

export const Flashcard = ({ front, back }: FlashcardProps) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <Container onClick={() => setFlipped((prevState) => !prevState)}>
      <Side className={`front ${flipped ? "flipped" : ""}`} elevation={5}>
        <Typography variant="h2">{front}</Typography>
      </Side>
      <Side className={flipped ? "flipped" : ""} elevation={5}>
        <Typography variant="h2">{back}</Typography>
      </Side>
    </Container>
  );
};
