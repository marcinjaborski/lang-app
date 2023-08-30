import { Fragment } from "react";

type TextWithNewLinesProps = {
  children: string;
};

export const TextWithNewLines = ({ children }: TextWithNewLinesProps) => {
  return (
    <>
      {children.split("\n").map((line, index) => (
        <Fragment key={line + index}>
          {line}
          <br />
        </Fragment>
      ))}
    </>
  );
};
