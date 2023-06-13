import { LeafProps, SeparatorElement } from "@src/@types";

export const Separator = (props: LeafProps<SeparatorElement>) => {
  const { children, attributes } = props;
  return <span {...attributes}>{children}</span>;
};
