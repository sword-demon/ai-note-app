import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { BookAIcon } from "lucide-react";

export const linkItems = [
  {
    icon: <BookAIcon />,
    text: "Blog",
    url: "/blog",
    active: "nested-url" as const,
  },
];

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <span className="font-medium">AI Note</span>
        </>
      ),
    },
    links: linkItems,
  };
}
