import { useMutation } from "react-query";
import pb from "../util/pocketbase";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";

type LoginTabFormData = {
  username: string;
  password: string;
  rememberMe: boolean;
};

export const useLoginTab = () => {
  const { t } = useTranslation("translation", { keyPrefix: "login" });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginTabFormData>();

  const mutation = useMutation(({ username, password }: LoginTabFormData) => {
    return pb.collection("users").authWithPassword(username, password);
  });

  const onSubmit = handleSubmit((data: LoginTabFormData) => {
    mutation.mutate(data);
  });

  return { t, register, errors, onSubmit, ...mutation };
};
