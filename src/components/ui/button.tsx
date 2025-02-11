import { forwardRef } from "react";
import { cn } from "@/libs/tw";

const variantStyles = {
  default: "bg-brand-blue text-white hover:bg-brand-blue/70",
  destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  outline: "border border-purple-500/20 bg-background hover:bg-purple-600/20 hover:text-purple-400",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  link: "text-primary underline-offset-4 hover:underline",
} as const;

const sizeStyles = {
  default: "h-10 px-4 py-2",
  sm: "h-9 rounded-md px-3",
  lg: "h-11 rounded-md px-8",
  icon: "h-10 w-10",
} as const;

type Variant = keyof typeof variantStyles;
type Size = keyof typeof sizeStyles;

const buttonVariants = ({
  variant = "default",
  size = "default",
  className = "",
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  return cn(baseStyles, variantStyles[variant], sizeStyles[size], className);
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: Variant;
  size?: Size;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? "span" : "button";
    return <Comp className={buttonVariants({ variant, size, className })} ref={ref} {...props} />;
  }
);

Button.displayName = "Button";

export default Button
