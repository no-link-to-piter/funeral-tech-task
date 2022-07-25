import React, { useEffect } from "react";

/* eslint-disable */
export const useOnClickOutside = (
    ref: React.MutableRefObject<HTMLDivElement | null>, 
    handler: () => void
) => {
    useEffect(() => {
      const listener = (event: MouseEvent | TouchEvent) => {
        if (!ref.current || ref.current.contains(event.target as Node)) {
          return;
        }
  
        handler();
      };
  
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
  
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    }, []);
}