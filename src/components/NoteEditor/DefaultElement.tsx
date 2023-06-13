import { ElementProps, ParagraphElement } from "@src/@types";
import { RenderElementProps } from "slate-react";

export const DefaultElement = (props: RenderElementProps) => {
  const { children, element, attributes } = props as ElementProps<ParagraphElement>;
  return (
    <div
      {...attributes}
      style={{
        textAlign: element.textAlign,
      }}
    >
      {children}
    </div>
  );
};
