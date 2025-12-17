// @/components/keyboard-avoiding-view.tsx
import { useKeyboardHeight } from "@/hooks/use-keyboard-height";
import { type ReactNode } from "react";

interface KeyboardAvoidingViewProps {
  children: ReactNode;
  // 고민지점
  // react native 명세에서는 behavior :  'height', 'position' 까지 있음.
  // 웹에서도 필요할까?
  behavior?: "padding";
  className?: string;
}

export const KeyboardAvoidingView = ({
  children,
  behavior = "padding",
  className,
}: KeyboardAvoidingViewProps) => {
  const keyboardHeight = useKeyboardHeight();

  const style = {
    ...(behavior === "padding" && { paddingBottom: keyboardHeight }),
  };

  return (
    <div style={style} className={className}>
      {children}
    </div>
  );
};
