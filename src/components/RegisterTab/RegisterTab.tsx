import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React from "react";
import { TabProps } from "../../pages/Login/Login";
import { Alert, Backdrop, CircularProgress, Slide } from "@mui/material";
import { confirmPasswordValidator, emailValidator, usernameValidator } from "../../util/validators";
import { useRegisterTab } from "./useRegisterTab";

const RegisterTab = (props: TabProps) => {
  const { t, register, watch, errors, onSubmit, isLoading, isError, error } = useRegisterTab();

  return (
    <div role="tabpanel" hidden={props.selected !== props.tabIndex}>
      <Slide in={props.selected === props.tabIndex} direction="left">
        <Container maxWidth="xs" component="form" onSubmit={onSubmit}>
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
            error={!!errors.passwordConfirm}
            helperText={errors.passwordConfirm?.message}
            {...register("passwordConfirm", {
              required: t("confirmPasswordRequired")!,
              minLength: {
                value: 8,
                message: t("passwordLengthMessage"),
              },
              validate: (value) => confirmPasswordValidator(value, watch("password"), t("confirmPasswordNoMatch")),
            })}
          />
          {isError ? <Alert severity="error">{t(error.message)}</Alert> : null}
          <Button type="submit" variant="contained">
            {t("registerButton")}
          </Button>
          <Backdrop open={isLoading}>
            <CircularProgress />
          </Backdrop>
        </Container>
      </Slide>
    </div>
  );
};

export default RegisterTab;
