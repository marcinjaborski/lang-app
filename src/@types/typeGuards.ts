import { ElementProps, LeafProps, SeparatorElement, TermElement } from "@src/@types";
import { RenderElementProps, RenderLeafProps } from "slate-react";

export const isSeparatorProps = (props: RenderLeafProps): props is LeafProps<SeparatorElement> => {
  return props.leaf.type === "separator";
};

export const isTermProps = (props: RenderElementProps): props is ElementProps<TermElement> => {
  return props.element.type === "term";
};
