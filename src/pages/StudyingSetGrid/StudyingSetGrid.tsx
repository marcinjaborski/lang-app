import AddIcon from "@mui/icons-material/Add";
import { Divider, Fab, Grow, Typography } from "@mui/material";
import { StudySetCreateDialog, StudySetElement } from "@src/features/studying";
import { useStudySetRepository } from "@src/hooks";
import { openStudyDialog, useAppDispatch } from "@src/store";
import { useTranslation } from "react-i18next";
import { SetSkeleton, SetsWrap, Wrap } from "./StudyingSetGrid.styled";

export const StudyingSetGrid = () => {
  const { t } = useTranslation("study");
  const studySets = useStudySetRepository();
  const dispatch = useAppDispatch();

  return (
    <Wrap>
      <Typography variant="h4" fontWeight={500}>
        {t("title")}
      </Typography>
      <Divider />
      <SetsWrap>
        {studySets.list.isLoading ? (
          <>
            <SetSkeleton />
            <SetSkeleton />
            <SetSkeleton />
          </>
        ) : null}
        {studySets.list.data?.map((studySet) => (
          <StudySetElement key={studySet.id} studySet={studySet} />
        ))}
      </SetsWrap>
      {studySets.listShared.isLoading || studySets.listShared.data.length > 0 ? (
        <>
          <Typography variant="h5">{t("shared")}</Typography>
          <Divider />
        </>
      ) : null}
      <SetsWrap>
        {studySets.listShared.isLoading ? (
          <>
            <SetSkeleton />
            <SetSkeleton />
            <SetSkeleton />
          </>
        ) : null}
        {studySets.listShared.data?.map((studySet) => (
          <StudySetElement key={studySet.id} studySet={studySet} isShared />
        ))}
      </SetsWrap>
      <StudySetCreateDialog />
      <Grow in>
        <Fab color="primary" onClick={() => dispatch(openStudyDialog())}>
          <AddIcon />
        </Fab>
      </Grow>
    </Wrap>
  );
};
