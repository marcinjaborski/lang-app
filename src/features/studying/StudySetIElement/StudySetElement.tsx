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
import { StudySet, UNDERSTANDING } from "@src/types";
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
    progress,
    shareTo,
    shared,
    shareDialogOpen,
    deleteDialogOpen,
    optionsMenuOpen,
    terms,
    optionsAnchor,
    setOptionsAnchor,
    setShareTo,
    setShareDialogOpen,
    setDeleteDialogOpen,
    onKeyDown,
    onShare,
    onShareDialogClose,
    onMenuClose,
    onDelete,
  } = useStudySetElement(studySet);

  return (
    <Card>
      <Options onClick={(e) => setOptionsAnchor(e.currentTarget)}>
        <MoreVertIcon />
      </Options>
      <Menu anchorEl={optionsAnchor} open={optionsMenuOpen} onClick={onMenuClose} onClose={onMenuClose}>
        <MenuItem onClick={() => setShareDialogOpen(true)}>{t("shareDialog.share")}</MenuItem>
        <MenuItem onClick={() => setDeleteDialogOpen(true)}>{t("deleteDialog.delete")}</MenuItem>
      </Menu>
      <Dialog open={shareDialogOpen} onClose={onShareDialogClose}>
        <DialogTitle>{t("shareDialog.title")}</DialogTitle>
        <DialogContent>
          <FormControl sx={{ mt: 1 }}>
            <InputLabel htmlFor={`shareTo-${studySet.id}`}>{t("shareDialog.shareTo")}</InputLabel>
            <Input
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={onShare}>
                    <AddIcon />
                  </IconButton>
                </InputAdornment>
              }
              id={`shareTo-${studySet.id}`}
              value={shareTo}
              onChange={(e) => setShareTo(e.target.value)}
              onKeyDown={onKeyDown}
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
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>{t("deleteDialog.title")}</DialogTitle>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>{t("deleteDialog.cancel")}</Button>
          <Button onClick={onDelete}>{t("deleteDialog.delete")}</Button>
        </DialogActions>
      </Dialog>
      <Typography align="center" variant="h6">
        {title}
      </Typography>
      <Tooltip
        title={
          terms?.length ? (
            <Box fontSize={18}>
              {terms?.map((term) => (
                <Box
                  key={term.id}
                  sx={{
                    textDecoration: term.understanding === UNDERSTANDING.FINAL ? "line-through" : "",
                    textDecorationColor: ({ palette }) => palette.primary.main,
                    textDecorationThickness: 3,
                  }}
                >
                  {term.base}
                </Box>
              ))}
            </Box>
          ) : (
            <Typography>{t("noTerms")}</Typography>
          )
        }
      >
        <Typography align="center" variant="caption">
          {terms.length} {t("terms")}
        </Typography>
      </Tooltip>
      <LinearProgress color="secondary" value={progress} variant="determinate" />
      <Link to={`/flashcards/${id}`}>
        <Button>{t("flashcards")}</Button>
      </Link>
      <Link to={`/quiz/${id}`}>
        <Button>{t("quiz")}</Button>
      </Link>
      <Link to={`/matchGame/${id}`}>
        <Button>{t("matchGame")}</Button>
      </Link>
    </Card>
  );
};
