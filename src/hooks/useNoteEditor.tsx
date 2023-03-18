import React, { useCallback } from "react";
import { RenderElementProps, RenderLeafProps } from "slate-react";
import { Descendant } from "slate";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { changeTitle } from "../redux/noteEditorSlice";
import Leaf from "../components/Leaf";
import DefaultElement from "../components/DefaultElement";

export const useNoteEditor = () => {
  const dispatch = useAppDispatch();
  const title = useAppSelector((state) => state.noteEditor.title);
  const initialValue: Descendant[] = [
    {
      type: "paragraph",
      children: [{ text: "Start Typing..." }],
    },
  ];

  const renderLeaf = useCallback((props: RenderLeafProps) => <Leaf {...props}>{props.children}</Leaf>, []);
  const renderElement = useCallback(
    (props: RenderElementProps) => <DefaultElement {...props}>{props.children}</DefaultElement>,
    [],
  );

  const onTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    dispatch(changeTitle(event.target.value));
  };

  return { initialValue, renderLeaf, renderElement, title, onTitleChange };
};
