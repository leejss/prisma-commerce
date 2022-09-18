import { forwardRef, InputHTMLAttributes } from "react";
import clsx from "clsx";

type Props = InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
  return (
    <input
      ref={ref}
      type={props.type}
      {...props}
      className={clsx("w-full p-2 border-b border-black", props.className)}
    />
  );
});

Input.displayName = "Input";

export default Input;
