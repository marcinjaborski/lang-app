import { Fab, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SaveIcon from "@mui/icons-material/Save";

import { NotePageStyled } from "../styles/NotePage.styled";
import NoteEditor from "../components/NoteEditor";
import NoteDrawer from "../components/NoteDrawer";
import { useNotePage } from "../hooks/useNotePage";

const NotePage = () => {
  const { editor, onOpenDrawer, onSave } = useNotePage();
  //
  // const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
  //   if (!event.ctrlKey) {
  //     return;
  //   }
  //   event.preventDefault();
  //
  //   const translateText = async () => {
  //     if (!baseLang || !targetLang) {
  //       return;
  //     }
  //     let selectedText = Editor.string(editor, editor.selection!);
  //     if (selectedText === "") {
  //       Transforms.move(editor, { distance: 1, unit: "word", reverse: true, edge: "anchor" });
  //       selectedText = Editor.string(editor, editor.selection!);
  //     }
  //     const translatedText = await translate(selectedText, baseLang, targetLang);
  //     Transforms.collapse(editor, { edge: "focus" });
  //     Transforms.insertText(editor, ` - ${translatedText}`);
  //   };

  //   const formatters = {
  //     q: () => markAsWord(editor),
  //     b: () => bold(editor),
  //     i: () => italic(editor),
  //     u: () => underline(editor),
  //     // t: () => translateText(),
  //     l: () => align(editor, "left"),
  //     e: () => align(editor, "center"),
  //     r: () => align(editor, "right"),
  //     j: () => align(editor, "justify"),
  //   };
  //
  //   (formatters as any)[event.key]?.();
  // };

  return (
    <NotePageStyled>
      <NoteEditor editor={editor} />
      <IconButton size="large" className="drawer-button" onClick={onOpenDrawer}>
        <MenuIcon fontSize="inherit" />
      </IconButton>
      <NoteDrawer />
      <Fab color="primary" onClick={onSave}>
        <SaveIcon />
      </Fab>
    </NotePageStyled>
  );
};

export default NotePage;
