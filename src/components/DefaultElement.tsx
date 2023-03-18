import { RenderElementProps } from "slate-react";

const DefaultElement = (props: RenderElementProps) => {
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

export default DefaultElement;
