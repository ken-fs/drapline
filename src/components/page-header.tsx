import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Page header used by every database and guide page: breadcrumb, eyebrow,
 * title, standfirst, and an optional right-hand meta rail.
 */
export function PageHeader({
  eyebrow,
  title,
  standfirst,
  breadcrumb,
  meta,
}: {
  eyebrow?: string;
  title: string;
  standfirst?: ReactNode;
  breadcrumb?: { href: string; label: string }[];
  meta?: ReactNode;
}) {
  return (
    <header className="border-b border-border bg-muted/30">
      <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:py-12">
        {breadcrumb && (
          <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            {breadcrumb.map((b, i) => (
              <span key={b.href} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden>/</span>}
                <Link href={b.href} className="hover:text-foreground">
                  {b.label}
                </Link>
              </span>
            ))}
          </nav>
        )}
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h1 className="mt-2 max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              {title}
            </h1>
            {standfirst && (
              <div className="mt-4 max-w-2xl text-[15px] leading-7 text-muted-foreground">{standfirst}</div>
            )}
          </div>
          {meta && <div className="lg:justify-self-end">{meta}</div>}
        </div>
      </div>
    </header>
  );
}

/** Small labelled number, used in header meta rails and stat strips. */
export function MetaStat({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="panel px-4 py-3">
      <p className="eyebrow">{label}</p>
      <p className="tnum mt-1 font-mono text-lg">{value}</p>
    </div>
  );
}

/** Source note printed at the foot of every data page. */
export function SourceNote({ children }: { children: ReactNode }) {
  return (
    <p className="mt-10 border-t border-border pt-4 font-mono text-[11px] leading-5 text-muted-foreground">
      {children}
    </p>
  );
}
