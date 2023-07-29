import { TermToCreate } from "@src/types";
import { pb } from "@src/util";
import { useMutation } from "react-query";

export const useTermRepository = () => {
  const create = useMutation((term: TermToCreate) => {
    return pb.collection("terms").create({ ...term, owner: pb.authStore.model!.id });
  });

  return { create };
};
