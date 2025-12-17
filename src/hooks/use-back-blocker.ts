import { useEffect, useRef, useCallback } from "react";
import { useBlocker, type BlockerFunction } from "react-router";
import { overlay } from "overlay-kit";

interface UseBackBlockerOptions {
  when: boolean | BlockerFunction;
  overlayElement: (actions: {
    isOpen: boolean;
    close: () => void;
    confirm: () => void;
    cancel: () => void;
  }) => React.ReactNode;
}

export const useBackBlocker = ({
  when,
  overlayElement,
}: UseBackBlockerOptions) => {
  const blocker = useBlocker(when);
  const overlayIdRef = useRef<string | null>(null);

  const closeOverlay = useCallback(() => {
    if (overlayIdRef.current) {
      overlay.close(overlayIdRef.current);
      overlayIdRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (blocker.state === "blocked") {
      if (overlayIdRef.current) return;

      const id = overlay.open(({ isOpen, close }) =>
        overlayElement({
          isOpen,
          close,
          confirm: () => {
            close();
            blocker.proceed?.();
            overlayIdRef.current = null;
          },
          cancel: () => {
            close();
            blocker.reset?.();
            overlayIdRef.current = null;
          },
        })
      );

      overlayIdRef.current = id;
    } else {
      // blocked 상태가 아니면 overlay 정리
      closeOverlay();
    }

    return () => {
      closeOverlay();
    };
  }, [blocker, overlayElement, closeOverlay]);

  return blocker;
};
