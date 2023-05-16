import clsx from "clsx";
import React from "react";

const sizes = ["xs", "sm", "md", "lg"] as const;
type ButtonSize = (typeof sizes)[number];

const themes = [
  "primary",
  "primaryDuo",
  "accent",
  "neutral",
  "success",
  "error",
  "warning",
] as const;
type ButtonTheme = (typeof themes)[number];

const variants = ["filled", "outlined", "text"] as const;
type ButtonVariant = (typeof variants)[number];

type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  size?: ButtonSize;
  theme?: ButtonTheme;
  variant?: ButtonVariant;
  pill?: boolean;
  iconOnly?: boolean;
  disabled?: boolean;
};

export const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  iconOnly,
  leftIcon,
  rightIcon,
  pill,
  size = "md",
  theme = "primary",
  variant = "text",
  children,
  className: classNameProp,
  ...props
}) => {
  const className =
    "flex items-center font-medium justify-center gap-1 transition-all disabled:opacity-50 disabled:pointer-events-none box-border border";

  return (
    <button
      {...props}
      className={clsx(
        className,

        //#region padding
        size === "xs" ? (iconOnly ? "p-2" : "px-4 py-2") : undefined,
        size === "sm" ? (iconOnly ? "p-2.5" : "px-5 py-2.5") : undefined,
        size === "md" ? (iconOnly ? "p-3" : "px-6 py-3") : undefined,
        size === "lg" ? (iconOnly ? "p-4" : "px-8 py-4") : undefined,
        //#endregion

        //#region border
        pill || iconOnly ? "rounded-full" : "rounded-lg",
        variant === "text" || variant === "filled"
          ? "border-transparent"
          : undefined,
        //#endregion

        //#region themeing for text variant
        variant === "text" &&
          (theme === "primary" || theme === "primaryDuo") &&
          "text-info-500 hover:text-info-400 active:focus:text-info-600",
        variant === "text" &&
          theme === "neutral" &&
          "text-neutral-300 hover:text-neutral-200 active:focus:text-neutral-400",
        variant === "text" &&
          theme === "accent" &&
          "text-primary-500 hover:text-primary-400 active:focus:text-primary-700",
        variant === "text" &&
          theme === "success" &&
          "text-success-500 hover:text-success-400 active:focus:text-success-700",
        variant === "text" &&
          theme === "error" &&
          "text-error-600 hover:text-error-400 active:focus:text-error-700",
        variant === "text" &&
          theme === "warning" &&
          "text-warning-500 hover:text-warning-400 active:focus:text-warning-600",
        //#endregion

        //#region themeing for outlined variant
        variant === "outlined" &&
          (theme === "primary" || theme === "primaryDuo") &&
          "border-info-500 text-info-500 hover:border-info-400 hover:text-info-400 active:focus:border-info-600 active:focus:text-info-600",
        variant === "outlined" &&
          theme === "neutral" &&
          "border-neutral-75 text-neutral-300 hover:border-neutral-100 hover:text-neutral-100 active:focus:border-neutral-400 active:focus:text-neutral-400 disabled:border-neutral-100 disabled:text-neutral-100",
        variant === "outlined" &&
          theme === "accent" &&
          "border-primary-500 text-primary-500 hover:border-primary-400 hover:text-primary-400 active:focus:border-primary-700 active:focus:text-primary-700",
        variant === "outlined" &&
          theme === "success" &&
          "border-success-500 text-success-500 hover:border-success-400 hover:text-success-400 active:focus:border-success-700 active:focus:text-success-700",
        variant === "outlined" &&
          theme === "error" &&
          "border-error-600 text-error-600 hover:border-error-400 hover:text-error-400 active:focus:border-error-700 active:focus:text-error-700",
        variant === "outlined" &&
          theme === "warning" &&
          "border-warning-500 text-warning-500 hover:border-warning-400 hover:text-warning-400 active:focus:border-warning-600 active:focus:text-warning-600",
        //#endregion

        //#region themeing for filled variant
        variant === "filled" &&
          theme === "primary" &&
          "bg-info-500 text-white hover:bg-info-400 active:focus:bg-info-600",
        variant === "filled" &&
          theme === "primaryDuo" &&
          "bg-info-50 text-info-500 hover:bg-info-400 hover:text-white active:focus:bg-info-600 active:focus:text-white disabled:bg-info-500 disabled:text-white",
        variant === "filled" &&
          theme === "neutral" &&
          "bg-neutral-300 text-white hover:bg-neutral-200 active:focus:bg-neutral-400",
        variant === "filled" &&
          theme === "accent" &&
          "bg-primary-500 text-white hover:bg-primary-400 active:focus:bg-primary-700",
        variant === "filled" &&
          theme === "success" &&
          "bg-success-500 text-white hover:bg-success-400 active:focus:bg-success-700",
        variant === "filled" &&
          theme === "error" &&
          "bg-error-600 text-white hover:bg-error-400 active:focus:bg-error-700",
        variant === "filled" &&
          theme === "warning" &&
          "bg-warning-500 text-white hover:bg-warning-400 active:focus:bg-warning-600",
        //#endregion

        classNameProp
      )}
    >
      {leftIcon && (
        <ButtonIcon size={size} iconOnly={iconOnly}>
          {leftIcon}
        </ButtonIcon>
      )}
      {children && (
        <span
          className={clsx(
            size === "xs" && "leading-4",
            size === "sm" && "leading-5",
            size === "md" || (size === "lg" && "leading-6")
          )}
        >
          {children}
        </span>
      )}
      {rightIcon && (
        <ButtonIcon size={size} iconOnly={iconOnly}>
          {rightIcon}
        </ButtonIcon>
      )}
    </button>
  );
};

const ButtonIcon: React.FC<
  React.PropsWithChildren<{ size: ButtonSize; iconOnly?: boolean }>
> = ({ size, children, iconOnly }) => {
  return (
    <div
      className={clsx(
        size === "xs" && "h-4 w-4",
        size === "sm" && "h-5 w-5",
        size === "md" ? (iconOnly ? "h-5 w-5" : "h-6 w-6") : undefined,
        size === "lg" && "h-6 w-6"
      )}
    >
      {React.cloneElement(children as React.ReactElement, {
        className: "h-full w-full",
      })}
    </div>
  );
};
