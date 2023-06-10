import MenuIcon from "@mui/icons-material/Menu";
import SaveIcon from "@mui/icons-material/Save";
import { Fab, Grow, IconButton } from "@mui/material";
import { NoteDrawer, NoteEditor } from "@src/components";
import { NotePageStyled } from "./NotePage.styled";
import { useNotePage } from "@src/pages";

export const NotePage = () => {
  const { editor, onOpenDrawer, onSave } = useNotePage();

  return (
    <NotePageStyled>
      <NoteEditor editor={editor} />
      <IconButton size="large" className="drawer-button" onClick={onOpenDrawer}>
        <MenuIcon fontSize="inherit" />
      </IconButton>
      <NoteDrawer />
      <Grow in={true}>
        <Fab color="primary" onClick={onSave}>
          <SaveIcon />
        </Fab>
      </Grow>
    </NotePageStyled>
  );
};
