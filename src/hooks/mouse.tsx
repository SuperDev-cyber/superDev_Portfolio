// useEventHandlers.ts
import { useEffect } from "react";

export const useClick = (callback: () => void) => {
  useEffect(() => {
    const handleClick = () => {
      callback();
    };

    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [callback]);
};
