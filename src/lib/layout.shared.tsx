import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { BookAIcon, FolderGit2, NewspaperIcon } from "lucide-react";

export const linkItems = [
  {
    icon: <BookAIcon />,
    text: "Blog",
    url: "/blog",
    active: "nested-url" as const,
  },
  {
    icon: <NewspaperIcon />,
    text: "HN 2025",
    url: "/news",
    active: "nested-url" as const,
  },
  {
    icon: <FolderGit2 />,
    text: "Projects",
    url: "/projects/gorm-generate",
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
