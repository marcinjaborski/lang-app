import MenuIcon from "@mui/icons-material/Menu";
import SaveIcon from "@mui/icons-material/Save";
import { Fab, Grow } from "@mui/material";
import { Drawer, NoteEditor } from "@src/features/editor";
import { EditorContext } from "@src/hooks";
import { useNotePage } from "@src/pages";
import { DrawerButton, NotePageStyled } from "./NotePage.styled";

export const NotePage = () => {
  const { editor, onOpenDrawer, onSave } = useNotePage();

  return (
    <NotePageStyled>
      <EditorContext.Provider value={editor}>
        <NoteEditor />
        <DrawerButton size="large" onClick={onOpenDrawer}>
          <MenuIcon fontSize="inherit" />
        </DrawerButton>
        <Drawer />
        <Grow in>
          <Fab color="primary" onClick={onSave}>
            <SaveIcon />
          </Fab>
        </Grow>
      </EditorContext.Provider>
    </NotePageStyled>
  );
};
