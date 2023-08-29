import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Alert, Backdrop, CircularProgress, Slide, TextField, Typography } from "@mui/material";
import { Form, LoginAvatar, SubmitButton, TabProps } from "@src/pages";
import { confirmPasswordValidator, emailValidator, usernameValidator } from "@src/util";
import React from "react";

import { useRegisterTab } from "./useRegisterTab";

export const RegisterTab = (props: TabProps) => {
  const { t, register, watch, errors, onSubmit, isLoading, isError, error } = useRegisterTab();

  return (
    <div hidden={props.selected !== props.tabIndex} role="tabpanel">
      <Slide direction="left" in={props.selected === props.tabIndex}>
        <Form onSubmit={onSubmit}>
          <LoginAvatar>
            <LockOutlinedIcon />
          </LoginAvatar>
          <Typography component="h1" variant="h5">
            {t("registerTabTitle")}
          </Typography>
          <TextField
            autoComplete="username"
            autoFocus
            error={!!errors.username}
            fullWidth
            helperText={errors.username?.message}
            label={t("usernameLabel")}
            margin="normal"
            {...register("username", {
              validate: (value) => usernameValidator(value, t("usernameInvalid")),
            })}
          />
          <TextField
            autoComplete="email"
            error={!!errors.email}
            fullWidth
            helperText={errors.email?.message}
            label={t("emailLabel")}
            margin="normal"
            required
            {...register("email", {
              required: t("emailRequired"),
              validate: (value) => emailValidator(value, t("emailInvalid")),
            })}
          />
          <TextField
            autoComplete="new-password"
            error={!!errors.password}
            fullWidth
            helperText={errors.password?.message}
            label={t("passwordLabel")}
            margin="normal"
            required
            type="password"
            {...register("password", {
              required: t("passwordRequired"),
              minLength: {
                value: 8,
                message: t("passwordLengthMessage"),
              },
            })}
          />
          <TextField
            autoComplete="confirm-password"
            error={!!errors.passwordConfirm}
            fullWidth
            helperText={errors.passwordConfirm?.message}
            label={t("confirmPasswordLabel")}
            margin="normal"
            required
            type="password"
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
          <SubmitButton type="submit" variant="contained">
            {t("registerButton")}
          </SubmitButton>
          <Backdrop open={isLoading}>
            <CircularProgress sx={{ ml: "80px" }} />
          </Backdrop>
        </Form>
      </Slide>
    </div>
  );
};
