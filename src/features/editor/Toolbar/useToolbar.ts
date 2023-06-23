import { useFormatters, useInsertTerm, useTranslateText } from "@src/hooks";
import { useTranslation } from "react-i18next";

export const useToolbar = () => {
  const { t } = useTranslation("noteToolbar");
  const translate = useTranslateText();
  const insertTerm = useInsertTerm();
  const formatters = useFormatters();

  return { t, translate, insertTerm, formatters };
};
