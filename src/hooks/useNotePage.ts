import { useAppDispatch } from "../redux/store";
import { openDrawer } from "../redux/noteDrawerSlice";

export const useNotePage = () => {
  const dispatch = useAppDispatch();
  const onOpenDrawer = () => dispatch(openDrawer());

  return { onOpenDrawer };
};
