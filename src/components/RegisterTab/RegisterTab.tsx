import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Alert, Backdrop, CircularProgress, Slide } from "@mui/material";
import TextField from "@mui/material/TextField";
import { TabProps } from "@src/pages";
import { Form, LoginAvatar, SubmitButton, Title } from "@src/pages/Login/Login.styled";
import { confirmPasswordValidator, emailValidator, usernameValidator } from "@src/util";
import React from "react";
import { useRegisterTab } from "./useRegisterTab";

export const RegisterTab = (props: TabProps) => {
  const { t, register, watch, errors, onSubmit, isLoading, isError, error } = useRegisterTab();

  return (
    <div role="tabpanel" hidden={props.selected !== props.tabIndex}>
      <Slide in={props.selected === props.tabIndex} direction="left">
        <Form onSubmit={onSubmit}>
          <LoginAvatar>
            <LockOutlinedIcon />
          </LoginAvatar>
          <Title>{t("registerTabTitle")}</Title>
          <TextField
            autoComplete="username"
            fullWidth
            label={t("usernameLabel")}
            autoFocus
            margin="normal"
            error={!!errors.username}
            helperText={errors.username?.message}
            {...register("username", {
              validate: (value) => usernameValidator(value, t("usernameInvalid")),
            })}
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
              required: t("emailRequired"),
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
              required: t("passwordRequired"),
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
            error={!!errors.passwordConfirm}
            helperText={errors.passwordConfirm?.message}
            {...register("passwordConfirm", {
              required: t("confirmPasswordRequired"),
              minLength: {
                value: 8,
                message: t("passwordLengthMessage"),
              },
              validate: (value) => confirmPasswordValidator(value, watch("password"), t("confirmPasswordNoMatch")),
            })}
          />
          {isError ? <Alert severity="error">{t(error.message)}</Alert> : null}
          <SubmitButton type="submit">{t("registerButton")}</SubmitButton>
          <Backdrop open={isLoading}>
            <CircularProgress />
          </Backdrop>
        </Form>
      </Slide>
    </div>
  );
};
