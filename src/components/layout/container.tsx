import { type ElementType, type ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const containerVariants = cva("w-full mx-auto px-4 md:px-6", {
  variants: {
    size: {
      sm: "max-w-screen-sm",
      md: "max-w-screen-md",
      lg: "max-w-screen-lg",
      xl: "max-w-screen-xl",
      "2xl": "max-w-screen-2xl",
      fluid: "max-w-full",
    },

    centerContent: {
      true: "flex flex-col items-center justify-center",
    },
  },
  defaultVariants: {
    size: "xl",
  },
});

type ContainerProps<C extends ElementType> = {
  as?: C;
} & ComponentProps<C> &
  VariantProps<typeof containerVariants>;

const Container = <C extends ElementType = "div">({
  as,
  className,
  size,
  centerContent,
  children,
  ...props
}: ContainerProps<C>) => {
  const Component = as || "div";

  return (
    <Component
      className={cn(containerVariants({ size, centerContent }), className)}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Container;
