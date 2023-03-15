import { useForm } from "react-hook-form";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React from "react";
import { TabProps } from "../pages/Login";
import { Slide } from "@mui/material";
import { useTranslation } from "react-i18next";
import { confirmPasswordValidator, emailValidator } from "../util/validators";

type RegisterTabFormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterTab = (props: TabProps) => {
  const { t } = useTranslation("translation", { keyPrefix: "login" });
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterTabFormData>();

  const onSubmit = (data: RegisterTabFormData) => {};

  return (
    <div role="tabpanel" hidden={props.selected !== props.tabIndex}>
      <Slide in={props.selected === props.tabIndex} direction="left">
        <Container maxWidth="xs" component="form" onSubmit={handleSubmit(onSubmit)}>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t("registerTabTitle")}
          </Typography>
          <TextField
            autoComplete="username"
            fullWidth
            label={t("usernameLabel")}
            autoFocus
            margin="normal"
            {...register("username")}
          />
          <TextField
            required
            fullWidth
            label={t("emailLabel")}
            autoComplete="email"
            margin="normal"
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register("email", {
              required: t("emailRequired")!,
              validate: (value) => emailValidator(value, t("emailInvalid")),
            })}
          />
          <TextField
            required
            fullWidth
            label={t("passwordLabel")}
            type="password"
            autoComplete="new-password"
            margin="normal"
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register("password", {
              required: t("passwordRequired")!,
              minLength: {
                value: 8,
                message: t("passwordLengthMessage"),
              },
            })}
          />
          <TextField
            required
            fullWidth
            label={t("confirmPasswordLabel")}
            type="password"
            autoComplete="confirm-password"
            margin="normal"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword ? (errors.confirmPassword.message as string) : null}
            {...register("confirmPassword", {
              required: t("confirmPasswordRequired")!,
              minLength: {
                value: 8,
                message: t("passwordLengthMessage"),
              },
              validate: (value) => confirmPasswordValidator(value, watch("password"), t("confirmPasswordNoMatch")),
            })}
          />
          <Button type="submit" variant="contained">
            {t("registerButton")}
          </Button>
        </Container>
      </Slide>
    </div>
  );
};

export default RegisterTab;
