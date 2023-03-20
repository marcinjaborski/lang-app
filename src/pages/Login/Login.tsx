import React, { useState } from "react";
import { Tab, Tabs } from "@mui/material";
import Box from "@mui/material/Box";
import { LoginStyled } from "./Login.styled";
import LoginTab from "../../components/LoginTab/LoginTab";
import RegisterTab from "../../components/RegisterTab/RegisterTab";
import { useTranslation } from "react-i18next";

export type TabProps = {
  selected: number;
  tabIndex: number;
};

const Login = () => {
  const { t } = useTranslation("translation", { keyPrefix: "login" });
  const [selected, setSelected] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelected(newValue);
  };

  return (
    <LoginStyled>
      <Box className="wrap">
        <Tabs value={selected} onChange={handleChange} sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tab label={t("loginTabTitle")} />
          <Tab label={t("registerTabTitle")} />
        </Tabs>
        <LoginTab selected={selected} tabIndex={0} />
        <RegisterTab selected={selected} tabIndex={1} />
      </Box>
    </LoginStyled>
  );
};

export default Login;
