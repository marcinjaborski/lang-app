import { ElementProps, TermElement } from "@src/@types";
import { primaryColor } from "@src/util";

export const Term = (props: ElementProps<TermElement>) => {
  const { children, attributes } = props;
  return (
    <div {...attributes} style={{ caretColor: primaryColor, backgroundColor: "yellow", display: "inline-block" }}>
      {...children}
    </div>
  );
};
