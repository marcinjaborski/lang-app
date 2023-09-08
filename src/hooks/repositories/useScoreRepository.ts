import { useUserRepository } from "@src/hooks";
import { Score, ScoreToCreate } from "@src/types";
import { pb, pbError } from "@src/util";
import { useMutation } from "react-query";

export const useScoreRepository = () => {
  const { currentUser } = useUserRepository();

  const create = useMutation<Score, pbError, ScoreToCreate>((score) => {
    return pb.collection("scores").create({ ...score, user: currentUser?.id });
  });

  return { create };
};
