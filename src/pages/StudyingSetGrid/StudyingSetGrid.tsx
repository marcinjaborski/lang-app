import AddIcon from "@mui/icons-material/Add";
import { Divider, Fab, Grow, Typography } from "@mui/material";
import { LeaderboardPopup, StudySetCreateDialog, StudySetElement } from "@src/features/studying";
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
      <Typography fontWeight={500} variant="h4">
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
        {studySets.list.data?.map((studySet) => <StudySetElement key={studySet.id} studySet={studySet} />)}
      </SetsWrap>
      <StudySetCreateDialog />
      <LeaderboardPopup />
      <Grow in>
        <Fab color="primary" onClick={() => dispatch(openStudyDialog())}>
          <AddIcon />
        </Fab>
      </Grow>
    </Wrap>
  );
};
