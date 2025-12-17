import { type ReactNode, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface BottomTabItemProps extends HTMLAttributes<HTMLLIElement> {
  icon: ReactNode;
  label: string;
  selected?: boolean;
}

const BottomTabItem = ({
  icon,
  label,
  selected,
  className,
  ...props
}: BottomTabItemProps) => {
  return (
    <li
      className={cn(
        "flex-1 flex flex-col items-center justify-center cursor-pointer py-2",
        "text-gray-400 hover:text-gray-600 transition-colors",
        selected && "text-blue-600 hover:text-blue-700",
        className
      )}
      {...props}
    >
      <div className="w-6 h-6 mb-1">{icon}</div>
      <span className="text-[10px] font-medium">{label}</span>
    </li>
  );
};

interface BottomTabProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

const BottomTab = ({ children, className, ...props }: BottomTabProps) => {
  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50",
        "pb-[env(safe-area-inset-bottom)]", // iOS Safe Area 대응
        className
      )}
      {...props}
    >
      <ul className="flex h-14 items-center justify-around">{children}</ul>
    </nav>
  );
};

BottomTab.Item = BottomTabItem;

export default BottomTab;
