import type { Meta, StoryObj } from "@storybook/react";
import "../app/globals.css";
import { Button } from "../components/button";

import * as Icons from "@tabler/icons-react";
const icons: Record<string, JSX.Element | null> = {
  None: null,
};
Object.keys(Icons).forEach((key) => {
  const Icon = Icons[key as keyof typeof Icons] as React.FC;
  icons[key] = <Icon />;
});

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Button> = {
  title: "components/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    size: "md",
    variant: "text",
    pill: false,
    disabled: false,
    iconOnly: false,
  },
  argTypes: {
    children: {
      type: "string",
    },
    leftIcon: {
      options: Object.keys(icons),
      mapping: icons,
      control: {
        type: "select",
        labels: Object.keys(icons),
      },
    },
    rightIcon: {
      options: Object.keys(icons),
      mapping: icons,
      control: {
        type: "select",
        labels: Object.keys(icons),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Button",
  },
};
