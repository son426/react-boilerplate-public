import { useEffect, useState } from "react";

const getKeyboardHeight = () => {
  const visualViewport = window.visualViewport;
  if (!visualViewport) {
    return 0;
  }

  return window.innerHeight - visualViewport.height;
};

export const useKeyboardHeight = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const visualViewport = window.visualViewport;
    if (!visualViewport) return;

    const handleResize = () => {
      const newKeyboardHeight = getKeyboardHeight();

      setKeyboardHeight(newKeyboardHeight > 0 ? newKeyboardHeight : 0);
    };

    const handleFocusIn = () => {
      setTimeout(handleResize, 100);
    };

    const handleFocusOut = () => {
      setTimeout(() => setKeyboardHeight(0), 0);
    };

    visualViewport.addEventListener("resize", handleResize);
    window.addEventListener("focusin", handleFocusIn);
    window.addEventListener("focusout", handleFocusOut);

    return () => {
      visualViewport.removeEventListener("resize", handleResize);
      window.removeEventListener("focusin", handleFocusIn);
      window.removeEventListener("focusout", handleFocusOut);
    };
  }, []);

  return keyboardHeight;
};
