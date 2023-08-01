import { Term, TermToCreate, UpdateRecord } from "@src/types";
import { pb, pbError } from "@src/util";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useTermRepository = () => {
  const queryClient = useQueryClient();

  const list = useQuery<Term[]>("list-terms", () => {
    return pb.collection("terms").getFullList<Term>({
      expand: "note,tags",
    });
  });

  const create = useMutation<Term, pbError, TermToCreate>(
    (term) => {
      return pb.collection("terms").create({ ...term, owner: pb.authStore.model!.id });
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
      },
    },
  );

  return { list, create, update };
};
