import { useLoginTab } from "@src/features/user/LoginTab/useLoginTab";
import { User } from "@src/types";
import { pb, pbError } from "@src/util";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";

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

  const mutation = useMutation<User, pbError, RegisterTabFormData>(
    (data) => {
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

  return { t, register, watch, errors, onSubmit, ...mutation };
};
