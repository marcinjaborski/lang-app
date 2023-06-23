import { Tab, Tabs } from "@mui/material";
import { LoginTab, RegisterTab } from "@src/features/user";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { LoginStyled } from "./Login.styled";

export type TabProps = {
  selected: number;
  tabIndex: number;
};

export const Login = () => {
  const { t } = useTranslation("login");
  const [selected, setSelected] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelected(newValue);
  };

  return (
    <LoginStyled>
      <Tabs value={selected} onChange={handleChange} sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tab label={t("loginTabTitle")} />
        <Tab label={t("registerTabTitle")} />
      </Tabs>
      <LoginTab selected={selected} tabIndex={0} />
      <RegisterTab selected={selected} tabIndex={1} />
    </LoginStyled>
  );
};
