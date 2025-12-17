import React, { type ComponentProps } from "react";
import { cn } from "@/lib/utils";

// div의 모든 속성(onClick, id 등)을 다 받으면서 + Flex 옵션 추가
interface FlexProps extends ComponentProps<"div"> {
  direction?: React.CSSProperties["flexDirection"];
  align?: React.CSSProperties["alignItems"];
  justify?: React.CSSProperties["justifyContent"];
  wrap?: React.CSSProperties["flexWrap"];
  gap?: React.CSSProperties["gap"];
}

const Flex = ({
  direction,
  align,
  justify,
  wrap,
  gap,
  className,
  style,
  children,
  ...props
}: FlexProps) => {
  return (
    <div
      className={cn("flex", className)}
      style={{
        flexDirection: direction,
        alignItems: align,
        justifyContent: justify,
        flexWrap: wrap,
        gap: gap,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default Flex;
