import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Avatar,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { showError } from "@src/store";
import { getAvatarColor, PB_FILES } from "@src/util";

import {
  AvatarWrap,
  DeleteThumbnailButton,
  FriendChip,
  FriendsWrap,
  HiddenFileInput,
  ProfileCard,
  UserAvatar,
} from "./ProfilePage.styled";
import { useProfilePage } from "./useProfilePage";

export const ProfilePage = () => {
  const {
    t,
    getPoints,
    dispatch,
    currentUser,
    friendValue,
    setFriendValue,
    onPublicChange,
    onFileUpload,
    onKeyDown,
    onAddFriend,
    onDeleteThumbnail,
    onDeleteFriend,
  } = useProfilePage();

  if (!currentUser) {
    dispatch(showError(t("error")));
    return null;
  }

  return (
    <ProfileCard>
      <AvatarWrap>
        <UserAvatar
          src={currentUser.avatar ? `${PB_FILES}/users/${currentUser.id}/${currentUser.avatar}` : undefined}
          sx={{ bgcolor: getAvatarColor(currentUser.username) }}
        >
          {currentUser.username.at(0)?.toUpperCase()}
        </UserAvatar>
        <HiddenFileInput type="file" onChange={onFileUpload} />
        {currentUser.avatar ? (
          <DeleteThumbnailButton onClick={onDeleteThumbnail}>
            <CloseIcon />
          </DeleteThumbnailButton>
        ) : null}
      </AvatarWrap>
      <Typography align="center" variant="h3">
        {currentUser.username}
      </Typography>
      <Typography align="center" variant="h5">
        {t("points", { points: getPoints(currentUser?.id) })}
      </Typography>
      <FormControlLabel
        control={<Switch checked={currentUser.public} onChange={onPublicChange} />}
        label={t("public")}
      />
      <Divider sx={{ alignSelf: "stretch" }} />
      <FormControl sx={{ mt: 1 }}>
        <InputLabel htmlFor="friend-input">{t("newFriend")}</InputLabel>
        <Input
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={onAddFriend}>
                <AddIcon />
              </IconButton>
            </InputAdornment>
          }
          id="friend-input"
          value={friendValue}
          onChange={(e) => setFriendValue(e.target.value)}
          onKeyDown={onKeyDown}
        />
      </FormControl>
      <FriendsWrap>
        {currentUser.expand.friends?.map((friend) => (
          <FriendChip key={friend.id}>
            <Avatar
              src={friend.avatar ? `${PB_FILES}/users/${friend.id}/${friend.avatar}` : undefined}
              sx={{ bgcolor: getAvatarColor(friend.username) }}
            >
              {friend.username.at(0)?.toUpperCase()}
            </Avatar>
            <Stack>
              <Typography>{friend.username}</Typography>
              <Typography variant="body2">{t("points", { points: getPoints(friend.id) })}</Typography>
            </Stack>
            <IconButton onClick={() => onDeleteFriend(friend.id)}>
              <DeleteIcon />
            </IconButton>
          </FriendChip>
        ))}
      </FriendsWrap>
    </ProfileCard>
  );
};
