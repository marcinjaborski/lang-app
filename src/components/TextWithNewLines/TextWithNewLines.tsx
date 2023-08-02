import { Fragment } from "react";

type TextWithNewLinesProps = {
  children: string;
};

export const TextWithNewLines = ({ children }: TextWithNewLinesProps) => {
  return (
    <>
      {children.split("\n").map((line) => (
        <Fragment key={line}>
          {line}
          <br />
        </Fragment>
      ))}
    </>
  );
};
