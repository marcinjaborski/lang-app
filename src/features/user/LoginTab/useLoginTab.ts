import { User } from "@src/types";
import { pb, pbError } from "@src/util";
import { RecordAuthResponse } from "pocketbase";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

type LoginTabFormData = {
  username: string;
  password: string;
};

export const useLoginTab = () => {
  const { t } = useTranslation("login");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginTabFormData>();

  const mutation = useMutation<RecordAuthResponse<User>, pbError, LoginTabFormData>(
    ({ username, password }) => {
      return pb.collection("users").authWithPassword(username, password, {}, { expand: "friends" });
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

  return { t, register, errors, onSubmit, ...mutation };
};
