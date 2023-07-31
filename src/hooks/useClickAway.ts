import { RefObject, useEffect } from "react";

export const useClickAway = (ref: RefObject<HTMLElement>, callback: () => void, deps: unknown[]) => {
  {
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          callback();
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref, ...deps]);
  }
};
