import AddIcon from "@mui/icons-material/Add";
import { Divider, Fab, Grow, Typography } from "@mui/material";
import { StudySetElement } from "@src/features/studying";
import { useStudySetRepository } from "@src/hooks";
import { useTranslation } from "react-i18next";
import { SetSkeleton, SetsWrap, Wrap } from "./Wrap";

export const StudyingSetGrid = () => {
  const { t } = useTranslation("study");
  const studySets = useStudySetRepository();

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
          <StudySetElement
            key={studySet.id}
            id={studySet.id}
            title={studySet.title}
            numberOfTerms={studySet.expand.terms.length}
          />
        ))}
      </SetsWrap>
      <Grow in>
        <Fab color="primary">
          <AddIcon />
        </Fab>
      </Grow>
    </Wrap>
  );
};
