import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import pb, { pbError } from "../../util/pocketbase";
import { useLoginTab } from "../LoginTab/useLoginTab";

type RegisterTabFormData = {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export const useRegisterTab = () => {
  const { t } = useTranslation("login");
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterTabFormData>();
  const { mutate: login } = useLoginTab();

  const mutation = useMutation(
    (data: RegisterTabFormData) => {
      return pb.collection("users").create(data);
    },
    {
      onSuccess: (_data, variables) => {
        login({ username: variables.email, password: variables.password });
      },
    },
  );

  const onSubmit = handleSubmit((data: RegisterTabFormData) => {
    mutation.mutate(data);
  });

  return { t, register, watch, errors, onSubmit, ...mutation, error: mutation.error as pbError };
};
