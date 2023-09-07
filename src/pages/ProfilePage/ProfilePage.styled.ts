import { IconButton, Paper } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";

export const ProfileCard = styled(Paper)(({ theme }) => ({
  height: "100%",
  width: "50%",
  alignSelf: "center",
  marginInline: "auto",
  padding: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(2),
}));

export const AvatarWrap = styled("label")(({}) => ({
  position: "relative",
  cursor: "pointer",
  transition: "filter 100ms ease-out",
  borderRadius: "50%",
  ":hover": {
    filter: "brightness(0.7)",
  },
}));

export const UserAvatar = styled(Avatar)(({}) => ({
  width: 100,
  height: 100,
  fontSize: 64,
}));

export const HiddenFileInput = styled("input")(() => ({
  display: "none",
}));

export const DeleteThumbnailButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(-2),
  right: theme.spacing(-2),
}));

export const FriendsWrap = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(1),
}));

export const FriendChip = styled("div")(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
  backgroundColor: theme.palette.grey.A400,
  borderRadius: "9999px",
}));
