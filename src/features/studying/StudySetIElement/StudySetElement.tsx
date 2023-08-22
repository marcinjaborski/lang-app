import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  LinearProgress,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { StudySet } from "@src/types";
import { FINAL_UNDERSTANDING } from "@src/util";
import { Link } from "react-router-dom";
import { Card, Options } from "./StudySetElement.styled";
import { useStudySetElement } from "./useStudySetElement";

type StudySetElementProps = {
  studySet: StudySet;
};

export const StudySetElement = ({ studySet }: StudySetElementProps) => {
  const {
    t,
    id,
    title,
    shareTo,
    shared,
    shareDialogOpen,
    optionsMenuOpen,
    terms,
    optionsAnchor,
    setOptionsAnchor,
    setShareTo,
    setShareDialogOpen,
    onKeyDown,
    onShare,
    onShareDialogClose,
    onMenuClose,
  } = useStudySetElement(studySet);

  return (
    <Card>
      <Options onClick={(e) => setOptionsAnchor(e.currentTarget)}>
        <MoreVertIcon />
      </Options>
      <Menu open={optionsMenuOpen} onClose={onMenuClose} onClick={onMenuClose} anchorEl={optionsAnchor}>
        <MenuItem onClick={() => setShareDialogOpen(true)}>{t("shareDialog.share")}</MenuItem>
      </Menu>
      <Dialog open={shareDialogOpen} onClose={onShareDialogClose}>
        <DialogTitle>{t("shareDialog.title")}</DialogTitle>
        <DialogContent>
          <FormControl sx={{ mt: 1 }}>
            <InputLabel htmlFor={`shareTo-${studySet.id}`}>{t("shareDialog.shareTo")}</InputLabel>
            <Input
              id={`shareTo-${studySet.id}`}
              value={shareTo}
              onChange={(e) => setShareTo(e.target.value)}
              onKeyDown={onKeyDown}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={onShare}>
                    <AddIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Box sx={{ display: "flex", flexWrap: "wrap", mt: 1 }}>
            {shared.map((shared) => (
              <Chip key={shared.id} label={shared.username} />
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onShareDialogClose}>{t("shareDialog.close")}</Button>
        </DialogActions>
      </Dialog>
      <Typography variant="h6" align="center">
        {title}
      </Typography>
      <Tooltip
        title={
          <Box fontSize={18}>
            {terms?.map((term) => (
              <Box
                key={term.id}
                sx={{
                  textDecoration: term.understanding === FINAL_UNDERSTANDING ? "line-through" : "",
                  textDecorationColor: ({ palette }) => palette.primary.main,
                  textDecorationThickness: 3,
                }}
              >
                {term.base}
              </Box>
            ))}
          </Box>
        }
      >
        <Typography variant="caption" align="center">
          {terms.length} {t("terms")}
        </Typography>
      </Tooltip>
      <LinearProgress variant="determinate" value={50} color="secondary" />
      <Link to={`/flashcards/${id}`}>
        <Button>{t("flashcards")}</Button>
      </Link>
      <Link to={`/quiz/${id}`}>
        <Button>{t("quiz")}</Button>
      </Link>
    </Card>
  );
};
