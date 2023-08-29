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

  @media (max-width: 600px) {
    width: 100vw;
    height: fit-content;
    flex-direction: row;
    justify-content: center;
    position: fixed;
    top: 100dvh;
    transform: translateY(-100%);
  }
`;
