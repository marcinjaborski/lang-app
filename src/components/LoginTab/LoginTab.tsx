import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Alert, Backdrop, CircularProgress, Slide } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { TabProps } from "@src/pages";
import React from "react";
import { useLoginTab } from "./useLoginTab";

export const LoginTab = (props: TabProps) => {
  const { t, register, errors, onSubmit, isError, error, isLoading } = useLoginTab();

  return (
    <div role="tabpanel" hidden={props.selected !== props.tabIndex}>
      <Slide in={props.selected === props.tabIndex} direction="right">
        <Container maxWidth="xs" component="form" onSubmit={onSubmit}>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t("loginTabTitle")}
          </Typography>
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
          <Button type="submit" variant="contained">
            {t("loginButton")}
          </Button>
          <Backdrop open={isLoading}>
            <CircularProgress />
          </Backdrop>
        </Container>
      </Slide>
    </div>
  );
};