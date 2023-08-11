import { showSuccess, useAppDispatch } from "@src/store";
import { StudySet, StudySetToCreate } from "@src/types";
import { pb, pbError } from "@src/util";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useStudySetRepository = () => {
  const { t } = useTranslation("feedback");
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const list = useQuery<StudySet[]>("list-studySets", () => {
    return pb.collection("studySets").getFullList<StudySet>({
      expand: "terms",
    });
  });

  const create = useMutation<StudySet, pbError, StudySetToCreate>(
    (studySet) => {
      return pb.collection("studySets").create({
        ...studySet,
        owner: pb.authStore.model!.id,
      });
    },
    {
      async onSuccess() {
        await queryClient.invalidateQueries("list-studySets");
        dispatch(showSuccess(t("created")));
      },
    },
  );
  return { list, create };
};
