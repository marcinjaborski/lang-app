import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Alert, Backdrop, CircularProgress, Slide, TextField, Typography } from "@mui/material";
import { Form, LoginAvatar, SubmitButton, TabProps } from "@src/pages";
import React from "react";

import { useLoginTab } from "./useLoginTab";

export const LoginTab = (props: TabProps) => {
  const { t, register, errors, onSubmit, isError, error, isLoading } = useLoginTab();

  return (
    <div hidden={props.selected !== props.tabIndex} role="tabpanel">
      <Slide direction="right" in={props.selected === props.tabIndex}>
        <Form onSubmit={onSubmit}>
          <LoginAvatar>
            <LockOutlinedIcon />
          </LoginAvatar>
          <Typography component="h1" variant="h5">
            {t("loginTabTitle")}
          </Typography>
          <TextField
            autoComplete="email"
            autoFocus
            error={!!errors.username}
            fullWidth
            helperText={errors.username?.message}
            label={t("usernameOrEmailLabel")}
            margin="normal"
            required
            {...register("username", {
              required: t("usernameOrEmailRequired"),
            })}
          />
          <TextField
            autoComplete="current-password"
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
          {isError ? <Alert severity="error">{t(error.message)}</Alert> : null}
          <SubmitButton type="submit" variant="contained">
            {t("loginButton")}
          </SubmitButton>
          <Backdrop open={isLoading}>
            <CircularProgress sx={{ ml: "80px" }} />
          </Backdrop>
        </Form>
      </Slide>
    </div>
  );
};
