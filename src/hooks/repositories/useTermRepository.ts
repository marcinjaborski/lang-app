import { showSuccess, useAppDispatch } from "@src/store";
import { Term, TermToCreate, UpdateRecord } from "@src/types";
import { pb, pbError } from "@src/util";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useTermRepository = () => {
  const { t } = useTranslation("feedback");
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const list = useQuery<Term[]>("list-terms", () => {
    return pb.collection("terms").getFullList<Term>({
      expand: "note,tags",
    });
  });

  const create = useMutation<Term, pbError, TermToCreate>(
    (term) => {
      return pb.collection("terms").create({ ...term, understanding: 1, owner: pb.authStore.model!.id });
    },
    {
      async onSuccess() {
        await queryClient.invalidateQueries("list-terms");
      },
    },
  );

  const update = useMutation<Term, pbError, UpdateRecord<TermToCreate>>(
    ({ id, record }) => {
      return pb.collection("terms").update(id, record);
    },
    {
      async onSuccess() {
        await queryClient.invalidateQueries("list-terms");
        dispatch(showSuccess(t("updatedTags")));
      },
    },
  );

  const deleteMutation = useMutation<boolean, pbError, string>(
    (id) => {
      return pb.collection("terms").delete(id);
    },
    {
      async onSuccess() {
        await queryClient.invalidateQueries("list-terms");
        dispatch(showSuccess(t("deleted")));
      },
    },
  );

  return { list, create, update, delete: deleteMutation };
};