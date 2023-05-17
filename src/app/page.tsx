"use client";

import { Button } from "@/components/button";
import { IconPlaylistAdd } from "@tabler/icons-react";
import clsx from "clsx";
import React from "react";

export default function Home() {
  const [selectedTheme, setTheme] = React.useState<
    (typeof themes)[number] | undefined
  >("primary");
  const [selectedVariant, setVariant] =
    React.useState<(typeof variants)[number]>("text");
  const [selectedSize, setSize] = React.useState<
    (typeof sizes)[number] | undefined
  >("md");
  const [pill, setPill] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  const [iconOnly, setIconOnly] = React.useState(false);

  return (
    <main className="mx-auto flex h-screen w-full max-w-screen-sm flex-col items-start justify-center gap-8 bg-gray-950 p-4">
      <section>
        <header className="text-white">Themes</header>
        <div className="inline-flex rounded-md shadow-sm" role="group">
          {themes.map((theme) => (
            <GroupButton
              key={theme}
              selected={selectedTheme === theme}
              onClick={() => setTheme(theme)}
            >
              {theme}
            </GroupButton>
          ))}
        </div>
      </section>
      <section>
        <header className="text-white">Variants</header>
        <div className="inline-flex rounded-md shadow-sm" role="group">
          {variants.map((variant) => (
            <GroupButton
              key={variant}
              selected={selectedVariant === variant}
              onClick={() => setVariant(variant)}
            >
              {variant}
            </GroupButton>
          ))}
        </div>
      </section>
      <section>
        <header className="text-white">Sizes</header>
        <div className="inline-flex rounded-md shadow-sm" role="group">
          {sizes.map((size) => (
            <GroupButton
              key={size}
              selected={selectedSize === size}
              onClick={() => setSize(size)}
            >
              {size}
            </GroupButton>
          ))}
        </div>
      </section>
      <section className="flex gap-8">
        <Switch label="Pill shaped" onClick={() => setPill(!pill)} />
        <Switch label="Icon only" onClick={() => setIconOnly(!iconOnly)} />
        <Switch label="Disabled" onClick={() => setDisabled(!disabled)} />
      </section>

      <hr className="h-[1px] w-full bg-neutral-700 text-neutral-700" />

      <Button
        size={selectedSize}
        theme={selectedTheme}
        variant={selectedVariant}
        pill={pill}
        iconOnly={iconOnly}
        disabled={disabled}
        leftIcon={<IconPlaylistAdd />}
      >
        Button
      </Button>
    </main>
  );
}

const themes = [
  "primary",
  "primaryDuo",
  "neutral",
  "accent",
  "success",
  "error",
  "warning",
] as const;
const sizes = ["xs", "sm", "md", "lg"] as const;
const variants = ["filled", "outlined", "text"] as const;

type GroupButtonProps = {
  selected?: boolean;
  onClick: VoidFunction;
};
const GroupButton: React.FC<React.PropsWithChildren<GroupButtonProps>> = ({
  children,
  selected,
  ...props
}) => {
  return (
    <button
      type="button"
      className={clsx(
        "border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 transition-all first-of-type:rounded-l-lg last-of-type:rounded-r-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white dark:focus:text-white dark:focus:ring-blue-500",
        selected && "!bg-blue-700 !text-white"
      )}
      {...props}
    >
      {children}
    </button>
  );
};

const Switch: React.FC<{ onClick: VoidFunction; label: string }> = ({
  label,
  onClick,
}) => {
  return (
    <label className="relative inline-flex cursor-pointer items-center">
      <input
        type="checkbox"
        value=""
        className="peer sr-only"
        onClick={onClick}
      />
      <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:border-gray-600 dark:bg-gray-700"></div>
      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
        {label}
      </span>
    </label>
  );
};
