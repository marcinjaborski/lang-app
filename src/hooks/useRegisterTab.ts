import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import pb from "../util/pocketbase";

type RegisterTabFormData = {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export const useRegisterTab = () => {
  const { t } = useTranslation("translation", { keyPrefix: "login" });
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterTabFormData>();

  const mutation = useMutation((data: RegisterTabFormData) => {
    return pb.collection("users").create(data);
  });

  const onSubmit = handleSubmit((data: RegisterTabFormData) => {
    mutation.mutate(data);
  });

  return { t, register, watch, errors, onSubmit, ...mutation };
};
