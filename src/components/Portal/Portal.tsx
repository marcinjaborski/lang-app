import { ReactNode } from "react";
import ReactDOM from "react-dom";

type PortalProps = {
  children: ReactNode;
};

export const Portal = ({ children }: PortalProps) => {
  return typeof document === "object" ? ReactDOM.createPortal(children, document.body) : null;
};
