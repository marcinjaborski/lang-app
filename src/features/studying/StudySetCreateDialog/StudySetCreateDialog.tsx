import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { createStudySetFrom, CreateStudySetFrom, setFrom, setFromId, setTitle } from "@src/store";
import { useStudySetCreateDialog } from "./useStudySetCreateDialog";

export const StudySetCreateDialog = () => {
  const {
    t,
    dialogState,
    dispatch,
    studySetTerms,
    tags,
    notes,
    modules,
    onCreate,
    onClose,
    onExcludeTagsChange,
    onIncludeTagsChange,
  } = useStudySetCreateDialog();

  return (
    <Dialog open={dialogState.open} onClose={onClose}>
      <DialogTitle>{t("title")}</DialogTitle>
      <DialogContent>
        <TextField
          sx={{ mt: 1 }}
          value={dialogState.title}
          fullWidth
          label={t("setTitle")}
          onChange={(e) => dispatch(setTitle(e.target.value))}
        />
        <RadioGroup
          row
          value={dialogState.from}
          onChange={(e) => dispatch(setFrom(e.target.value as CreateStudySetFrom))}
        >
          {Object.values(createStudySetFrom).map((value) => (
            <FormControlLabel key={value} control={<Radio />} label={t(value)} value={value} />
          ))}
        </RadioGroup>
        {dialogState.from === "module" || dialogState.from === "note" ? (
          <TextField
            select
            fullWidth
            value={dialogState.fromId}
            onChange={(e) => {
              dispatch(setFromId(e.target.value));
            }}
          >
            {dialogState.from === "module" &&
              modules.list.data?.map((module) => (
                <MenuItem key={module.id} value={module.id}>
                  {module.name}
                </MenuItem>
              ))}
            {dialogState.from === "note" &&
              notes.list.data?.map((note) => (
                <MenuItem key={note.id} value={note.id}>
                  {note.title}
                </MenuItem>
              ))}
          </TextField>
        ) : null}

        <Typography>{t("includeTags")}</Typography>
        <Select multiple value={dialogState.includeTags} fullWidth onChange={onIncludeTagsChange}>
          {tags.list.data?.map((tag) => (
            <MenuItem key={tag.id} value={tag.id}>
              {tag.label}
            </MenuItem>
          ))}
        </Select>

        <Typography>{t("excludeTags")}</Typography>
        <Select multiple value={dialogState.excludeTags} fullWidth onChange={onExcludeTagsChange}>
          {tags.list.data?.map((tag) => (
            <MenuItem key={tag.id} value={tag.id}>
              {tag.label}
            </MenuItem>
          ))}
        </Select>
        <Typography align="center" variant="h6" sx={{ mt: 2 }}>
          {t("summary", { terms: studySetTerms.length })}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t("cancel")}</Button>
        <Button onClick={onCreate} variant="contained">
          {t("create")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
