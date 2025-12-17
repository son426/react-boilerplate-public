import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AppContainerProps {
  children: ReactNode;
  hasHeader?: boolean;
  hasBottomTab?: boolean;
  className?: string;
}

const AppContainer = ({
  children,
  hasHeader,
  hasBottomTab,
  className,
}: AppContainerProps) => {
  return (
    <div
      className={cn(
        "min-h-screen w-full bg-gray-50",
        hasHeader && "pt-[60px]",
        hasBottomTab && "pb-[calc(56px+env(safe-area-inset-bottom))]",
        className
      )}
    >
      {children}
    </div>
  );
};

export default AppContainer;
