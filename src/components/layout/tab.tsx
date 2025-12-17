import React, {
  type ReactElement,
  type ReactNode,
  type HTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

// --- Tab.Item ---
interface TabItemProps extends HTMLAttributes<HTMLLIElement> {
  value: string;
  selected?: boolean;
  children: ReactNode;
}

const TabItem = ({
  value,
  selected,
  children,
  className,
  onClick, // 부모로부터 주입받음
  ...props
}: TabItemProps) => {
  return (
    <li
      role="tab"
      aria-selected={selected}
      onClick={onClick}
      data-value={value}
      className={cn(
        "flex-1 flex items-center justify-center py-3 cursor-pointer transition-colors relative",
        "text-gray-500 font-medium",
        selected && "text-gray-900 font-bold",
        className
      )}
      {...props}
    >
      {children}

      {selected && (
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-black" />
      )}
    </li>
  );
};

interface TabProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  children: ReactNode;
  onChange: (value: string) => void;
}

const Tab = ({ children, onChange, className, ...props }: TabProps) => {
  const items = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return null;

    const childProps = child.props as TabItemProps;

    return React.cloneElement(child as ReactElement<any>, {
      onClick: (e: React.MouseEvent<HTMLLIElement>) => {
        childProps.onClick?.(e);
        onChange(childProps.value);
      },
    });
  });

  return (
    <nav className={cn("w-full bg-white", className)} {...props}>
      <ul className="flex w-full border-b border-gray-100">{items}</ul>
    </nav>
  );
};

Tab.Item = TabItem;

export default Tab;
