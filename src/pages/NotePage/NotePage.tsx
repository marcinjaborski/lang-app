import MenuIcon from "@mui/icons-material/Menu";
import SaveIcon from "@mui/icons-material/Save";
import { Fab, Grow } from "@mui/material";
import { NoteDrawer, NoteEditor } from "@src/components";
import { useNotePage } from "@src/pages";
import { DrawerButton, NotePageStyled } from "./NotePage.styled";
import { EditorContext } from "@src/hooks/useEditorContext";

export const NotePage = () => {
  const { editor, onOpenDrawer, onSave } = useNotePage();

  return (
    <NotePageStyled>
      <EditorContext.Provider value={editor}>
        <NoteEditor />
        <DrawerButton onClick={onOpenDrawer}>
          <MenuIcon fontSize="inherit" />
        </DrawerButton>
        <NoteDrawer />
        <Grow in={true}>
          <Fab color="primary" onClick={onSave}>
            <SaveIcon />
          </Fab>
        </Grow>
      </EditorContext.Provider>
    </NotePageStyled>
  );
};
