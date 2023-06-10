import { RenderElementProps } from "slate-react";

export const DefaultElement = (props: RenderElementProps) => {
  const { children, element, attributes } = props;
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
