import { Alert, Snackbar } from "@mui/material";
import { closeSnackbar, useAppDispatch, useAppSelector } from "@src/store";

export const FeedbackSnackbar = () => {
  const dispatch = useAppDispatch();
  const message = useAppSelector((state) => state.feedback.message);
  const severity = useAppSelector((state) => state.feedback.severity);

  return (
    <Snackbar autoHideDuration={5000} open={message !== ""} onClose={() => dispatch(closeSnackbar())}>
      <Alert severity={severity} onClose={() => dispatch(closeSnackbar())}>
        {message}
      </Alert>
    </Snackbar>
  );
};
