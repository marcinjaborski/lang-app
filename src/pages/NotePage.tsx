import { Fab, Grow, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SaveIcon from "@mui/icons-material/Save";

import { NotePageStyled } from "../styles/NotePage.styled";
import NoteEditor from "../components/NoteEditor";
import NoteDrawer from "../components/NoteDrawer";
import { useNotePage } from "../hooks/useNotePage";

const NotePage = () => {
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

export default NotePage;
