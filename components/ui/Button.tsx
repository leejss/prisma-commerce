import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";
import clsx from "clsx";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  theme?: "green" | "blue";
};

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ theme = "green", ...props }, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        className={clsx(
          props.className,
          "px-3 py-1 rounded-md text-white font-bold",
          theme === "green" && "summer",
          theme === "blue" && "cold"
        )}
      >
        {props.children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
