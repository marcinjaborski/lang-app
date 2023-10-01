import { useUserRepository } from "@src/hooks";
import { useAppSelector } from "@src/store";
import { Score, ScoreToCreate } from "@src/types";
import { pb, pbError } from "@src/util";
import { useMutation, useQuery } from "react-query";

const COLLECTION = "scores";

export const useScoreRepository = () => {
  const { currentUser } = useUserRepository();
  const { studySetSharedId } = useAppSelector((state) => state.leaderboardsPopup);

  const list = useQuery(["list-scores", studySetSharedId], () => {
    return pb.collection(COLLECTION).getFullList<Score>({
      ...(studySetSharedId && { filter: `studySetSharedId = "${studySetSharedId}"` }),
      expand: "user",
      sort: "-score",
    });
  });

  const create = useMutation<Score, pbError, ScoreToCreate>((score) => {
    return pb.collection(COLLECTION).create({ ...score, user: currentUser?.id });
  });

  return { list, create };
};
