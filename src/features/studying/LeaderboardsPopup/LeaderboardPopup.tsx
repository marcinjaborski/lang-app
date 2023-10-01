import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useScoreRepository } from "@src/hooks";
import { closeLeaderboardsPopup, useAppDispatch, useAppSelector } from "@src/store";
import { useTranslation } from "react-i18next";

export const LeaderboardPopup = () => {
  const { t } = useTranslation("leaderboards");
  const { open } = useAppSelector((state) => state.leaderboardsPopup);
  const dispatch = useAppDispatch();
  const scores = useScoreRepository();
  const dateTimeFormat = new Intl.DateTimeFormat(undefined, {
    day: "numeric",
    month: "numeric",
  });

  const onClose = () => {
    dispatch(closeLeaderboardsPopup());
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t("title")}</DialogTitle>
      <DialogContent sx={{ overflowX: "hidden" }}>
        {scores.list.isLoading ? (
          <CircularProgress />
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t("user")}</TableCell>
                <TableCell>{t("game")}</TableCell>
                <TableCell>{t("date")}</TableCell>
                <TableCell align="right">{t("score")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {scores.list.data?.map(({ id, expand: { user }, score, game, created }) => (
                <TableRow key={id}>
                  <TableCell>{user?.username}</TableCell>
                  <TableCell>{game}</TableCell>
                  <TableCell>{dateTimeFormat.format(new Date(created))}</TableCell>
                  <TableCell align="right">{score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </DialogContent>
    </Dialog>
  );
};
