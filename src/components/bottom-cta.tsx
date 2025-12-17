import React from "react";
import Button from "./ui/button";
import { cn } from "@/lib/utils";
import { useKeyboardHeight } from "@/hooks/use-keyboard-height";

type SecondaryAction = {
  label: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
};

type BottomCTAProps = React.ComponentProps<typeof Button> & {
  secondaryAction?: SecondaryAction;
  adjustOnKeyboard?: boolean;
};

const BottomCTA: React.FC<BottomCTAProps> = ({
  className,
  children,
  secondaryAction,
  adjustOnKeyboard = true,
  ...props
}) => {
  const keyboardHeight = useKeyboardHeight();
  const wrapperStyle = {
    transform: adjustOnKeyboard
      ? `translateY(-${keyboardHeight}px)`
      : "translateY(0)",
    transition: "transform 0.2s ease-out",
  };

  console.log("bottomCTA keyboardHeight : ", keyboardHeight);

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-10 w-full bg-white pb-4 max-w-7xl mx-auto px-4 lg:px-8"
      style={wrapperStyle}
    >
      {secondaryAction ? (
        <div className="flex flex-col w-full items-center gap-2">
          <Button size="lg" {...props} className={cn("w-full", className)}>
            {children}
          </Button>
          <Button
            size="lg"
            variant="secondary"
            onClick={secondaryAction.onClick}
            disabled={secondaryAction.disabled}
            className={cn("w-full", className)}
          >
            {secondaryAction.label}
          </Button>
        </div>
      ) : (
        <Button size="lg" {...props} className={cn("w-full", className)}>
          {children}
        </Button>
      )}
    </div>
  );
};

export default BottomCTA;
