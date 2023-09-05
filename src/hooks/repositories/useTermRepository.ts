import { showSuccess, useAppDispatch } from "@src/store";
import { Term, TermToCreate, UNDERSTANDING, UpdateRecord } from "@src/types";
import { pb, PB_CUSTOM_ROUTES, pbError } from "@src/util";
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
      return pb
        .collection("terms")
        .create({ ...term, understanding: UNDERSTANDING.INITIAL, owner: pb.authStore.model!.id });
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

  const updateUnderstanding = useMutation<void, pbError, string[]>(
    (terms) => {
      return pb.send(`${PB_CUSTOM_ROUTES}/updateUnderstanding`, { method: "POST", body: { terms } });
    },
    {
      onSuccess() {
        dispatch(showSuccess(t("understandingUpdated")));
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

  return { list, create, update, updateUnderstanding, delete: deleteMutation };
};
