import Link from 'next/link';

interface LinkcardProps {
  url: string;
  title: string;
  description?: string;
  logo?: string;
}

export function Linkcard({ url, title, description, logo }: LinkcardProps) {
  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="not-prose block rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent hover:text-accent-foreground"
    >
      <div className="flex items-start gap-3">
        {logo && (
          <img
            src={logo}
            alt=""
            className="h-8 w-8 rounded object-cover"
          />
        )}
        <div className="flex-1 min-w-0">
          <div className="font-medium text-foreground line-clamp-1">
            {title}
          </div>
          {description && (
            <div className="mt-1 text-sm text-muted-foreground line-clamp-2">
              {description}
            </div>
          )}
          <div className="mt-2 text-xs text-muted-foreground truncate">
            {url}
          </div>
        </div>
      </div>
    </Link>
  );
}
