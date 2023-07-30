import { Tag, TagToCreate } from "@src/types";
import { pb, pbError } from "@src/util";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useTagsRepository = () => {
  const queryClient = useQueryClient();

  const list = useQuery<Tag[], pbError>("list-tags", () => {
    return pb.collection("tags").getFullList<Tag>();
  });

  const create = useMutation<Tag, pbError, TagToCreate>(
    (tag) => {
      return pb.collection("tags").create({ ...tag, owner: pb.authStore.model!.id });
    },
    {
      async onSuccess() {
        await queryClient.invalidateQueries("list-tags");
      },
    },
  );

  const deleteMutation = useMutation<boolean, pbError, string>(
    (id) => {
      return pb.collection("tags").delete(id);
    },
    {
      async onSuccess() {
        await queryClient.invalidateQueries("list-tags");
      },
    },
  );

  return { list, create, delete: deleteMutation };
};