import { useForm } from "react-hook-form";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import React from "react";
import { TabProps } from "../pages/Login";
import { Slide } from "@mui/material";
import { useTranslation } from "react-i18next";

type LoginTabFormData = {
  username: string;
  password: string;
  rememberMe: boolean;
};

const LoginTab = (props: TabProps) => {
  const { t } = useTranslation("translation", { keyPrefix: "login" });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginTabFormData>();

  const onSubmit = (data: LoginTabFormData) => {};

  return (
    <div role="tabpanel" hidden={props.selected !== props.tabIndex}>
      <Slide in={props.selected === props.tabIndex} direction="right">
        <Container maxWidth="xs" component="form" onSubmit={handleSubmit(onSubmit)}>
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
              required: t("usernameOrEmailRequired")!,
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
              required: t("passwordRequired")!,
              minLength: {
                value: 8,
                message: t("passwordLengthMessage"),
              },
            })}
          />
          <FormControlLabel
            control={<Checkbox color="primary" {...register("rememberMe")} />}
            label={t("rememberMe")}
          />
          <Button type="submit" variant="contained">
            {t("loginButton")}
          </Button>
        </Container>
      </Slide>
    </div>
  );
};

export default LoginTab;
