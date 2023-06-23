import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Alert, Backdrop, CircularProgress, Slide, TextField } from "@mui/material";
import { Form, LoginAvatar, SubmitButton, TabProps, Title } from "@src/pages";
import React from "react";
import { useLoginTab } from "./useLoginTab";

export const LoginTab = (props: TabProps) => {
  const { t, register, errors, onSubmit, isError, error, isLoading } = useLoginTab();

  return (
    <div role="tabpanel" hidden={props.selected !== props.tabIndex}>
      <Slide in={props.selected === props.tabIndex} direction="right">
        <Form onSubmit={onSubmit}>
          <LoginAvatar>
            <LockOutlinedIcon />
          </LoginAvatar>
          <Title>{t("loginTabTitle")}</Title>
          <TextField
            margin="normal"
            required
            fullWidth
            label={t("usernameOrEmailLabel")}
            autoComplete="email"
            autoFocus
            error={!!errors.username}
            helperText={errors.username?.message}
            {...register("username", {
              required: t("usernameOrEmailRequired"),
            })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label={t("passwordLabel")}
            type="password"
            autoComplete="current-password"
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
          {isError ? <Alert severity="error">{t(error.message)}</Alert> : null}
          <SubmitButton type="submit">{t("loginButton")}</SubmitButton>
          <Backdrop open={isLoading}>
            <CircularProgress />
          </Backdrop>
        </Form>
      </Slide>
    </div>
  );
};
