import { useQuery } from "react-query";
import pb from "../util/pocketbase";
import { Module } from "../util/types";
import { useTranslation } from "react-i18next";

export const useHome = () => {
  const { t } = useTranslation("translation", { keyPrefix: "home" });
  const username = pb.authStore.model?.username;

  const query = useQuery("list-modules", () => {
    return pb.collection("modules").getFullList({
      expand: "notes",
    }) as Promise<Module[]>;
  });

  return { t, username, ...query, modules: query.data };
};
