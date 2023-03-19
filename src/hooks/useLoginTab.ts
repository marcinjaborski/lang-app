import { useMutation } from "react-query";
import pb, { pbError } from "../util/pocketbase";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type LoginTabFormData = {
  username: string;
  password: string;
};

export const useLoginTab = () => {
  const { t } = useTranslation("translation", { keyPrefix: "login" });
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginTabFormData>();

  const mutation = useMutation(
    ({ username, password }: LoginTabFormData) => {
      return pb.collection("users").authWithPassword(username, password);
    },
    {
      onSuccess() {
        navigate("/");
        navigate(0);
      },
    },
  );

  const onSubmit = handleSubmit((data: LoginTabFormData) => {
    mutation.mutate(data);
  });

  return { t, register, errors, onSubmit, ...mutation, error: mutation.error as pbError };
};
