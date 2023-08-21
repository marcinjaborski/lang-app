import { showSuccess, useAppDispatch } from "@src/store";
import { FlashcardsUrlParams, StudySet, StudySetToCreate, UpdateRecord } from "@src/types";
import { pb, pbError } from "@src/util";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";

export const useStudySetRepository = () => {
  const { t } = useTranslation("feedback");
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const params = useParams<FlashcardsUrlParams>();

  const view = useQuery<StudySet>(["view-studySets", params.id], () => {
    if (!params.id) return new Promise<StudySet>(() => {});
    return pb.collection("studySets").getOne<StudySet>(params.id, {
      expand: "terms,shared",
    });
  });

  const list = useQuery<StudySet[]>("list-studySets", () => {
    return pb.collection("studySets").getFullList<StudySet>({
      expand: "terms,shared",
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

  const update = useMutation<StudySet, pbError, UpdateRecord<StudySetToCreate>>(
    ({ id, record }) => {
      return pb.collection("studySets").update(id, record);
    },
    {
      async onSuccess() {
        await queryClient.invalidateQueries("list-studySets");
        dispatch(showSuccess(t("updated")));
      },
    },
  );

  const deleteMutation = useMutation<boolean, pbError, string>(
    (id) => {
      return pb.collection("studySets").delete(id);
    },
    {
      async onSuccess() {
        await queryClient.invalidateQueries("list-studySets");
        dispatch(showSuccess(t("deleted")));
      },
    },
  );

  return { view, list, create, update, delete: deleteMutation };
};
