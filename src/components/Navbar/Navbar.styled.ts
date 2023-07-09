import { AppBar, AppBarProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import { WithComponent } from "@src/types";

export const ToolbarWrap = styled(AppBar)<WithComponent<AppBarProps>>`
  border-radius: 0;
  height: 100vh;
  width: fit-content;
  padding: ${({ theme }) => theme.spacing(2)};
  flex-direction: column;
  justify-content: space-between;
`;
