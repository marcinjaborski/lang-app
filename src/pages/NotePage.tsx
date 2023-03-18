import { Fab, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SaveIcon from "@mui/icons-material/Save";

import { NotePageStyled } from "../styles/NotePage.styled";
import NoteEditor from "../components/NoteEditor";
import NoteDrawer from "../components/NoteDrawer";
import { useNotePage } from "../hooks/useNotePage";

type Params = {
  id?: string;
};

const NotePage = () => {
  const { onOpenDrawer } = useNotePage();
  //
  // useEffect(() => {
  //   if (params.id) {
  //     dispatch(getNoteById(params.id));
  //   }
  //   dispatch(getAllModules());
  // }, [dispatch, params.id]);
  //
  // useEffect(() => {
  //   if (!note) {
  //     return;
  //   }
  //   title!.current = note.title;
  //   setBaseLang(note.baseLang);
  //   setTargetLang(note.targetLang);
  //   setExcerpt(note.excerpt);
  //   editor.children = JSON.parse(note.content);
  // }, [note, editor]);
  //
  // useEffect(() => {
  //   const noteModule = modules.find((module) => module.notesIds.includes(note?.id!));
  //   setSelectedModule(noteModule?.id);
  // }, [modules, note]);
  //
  // const handleTitleChange = (event: ContentEditableEvent) => {
  //   title.current = event.target.value;
  // };
  //

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

  // const saveNote = () => {
  //   const newNote: Note = {
  //     title: title.current,
  //     content: JSON.stringify(editor.children),
  //     excerpt: editor.children.map((n) => Node.string(n)).join(" "),
  //     words: 0,
  //     progress: 0,
  //     baseLang: baseLang,
  //     targetLang: targetLang,
  //   };
  //   if (note) {
  //     newNote.id = note.id;
  //     dispatch(editNote(newNote));
  //     return;
  //   }
  //   dispatch(postNote(newNote));
  // };

  return (
    <NotePageStyled>
      <NoteEditor />
      <IconButton size="large" className="drawer-button" onClick={onOpenDrawer}>
        <MenuIcon fontSize="inherit" />
      </IconButton>
      <NoteDrawer />
      <Fab color="primary">
        <SaveIcon />
      </Fab>
    </NotePageStyled>
  );
};

export default NotePage;
