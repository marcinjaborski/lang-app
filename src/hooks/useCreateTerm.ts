import { TermToCreate } from "@src/types";
import { pb } from "@src/util";
import { useMutation } from "react-query";

export const useCreateTerm = () => {
  const mutation = useMutation((term: Omit<TermToCreate, "owner">) => {
    const newTerm: TermToCreate = {
      ...term,
      owner: pb.authStore.model!.id,
    };
    return pb.collection("terms").create(newTerm);
  });

  return { ...mutation };
};
