import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface SpacingProps extends HTMLAttributes<HTMLDivElement> {
  size: number;
  direction?: "vertical" | "horizontal";
}

const Spacing = ({
  size,
  direction = "vertical",
  className,
  ...props
}: SpacingProps) => {
  return (
    <div
      style={{
        [direction === "vertical" ? "height" : "width"]: `${size}px`,
      }}
      className={cn("flex-none", className)}
      {...props}
    />
  );
};

export default Spacing;
