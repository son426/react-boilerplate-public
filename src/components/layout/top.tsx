import { type ReactNode, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface TopProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  title: ReactNode;
  subtitle?: ReactNode;
  left?: ReactNode;
  right?: ReactNode;
}

const Top = ({
  title,
  subtitle,
  left,
  right,
  className,
  ...props
}: TopProps) => {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 grid grid-cols-3 items-center bg-white px-5 py-3",
        className
      )}
      {...props}
    >
      <div className="flex justify-start">{left}</div>

      {/* 가운데 */}
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2">{title}</div>
        {subtitle && <div className="mt-1">{subtitle}</div>}
      </div>

      {/* 오른쪽 */}
      <div className="flex justify-end">{right}</div>
    </header>
  );
};

interface TitleTextProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  color?: string;
}

const TitleText = ({
  children,
  color,
  className,
  style,
  ...props
}: TitleTextProps) => {
  return (
    <h1
      className={cn("text-xl font-bold text-gray-900", className)}
      style={{ color, ...style }}
      {...props}
    >
      {children}
    </h1>
  );
};

Top.TitleText = TitleText;

export default Top;
