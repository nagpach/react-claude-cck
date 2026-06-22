import { ArrowLeft, ArrowRight, GitBranch, Route as RouteIcon } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

const MIGRATION_STEPS = [
  {
    title: "I read the app before changing it",
    detail:
      "The calculator was already split into clear pieces: the preview, controls panel, hooks, and a developer article component. The important discovery was that the article was not a route. It was rendered directly under the calculator screen.",
    takeaway: "Start with the current structure so the routing plan fits the app instead of fighting it.",
  },
  {
    title: "I chose the smallest useful route map",
    detail:
      "The calculator stayed at the root path because it is the primary tool. The existing developer article moved to `/developer`, and this migration write-up became a separate blog article at `/blog/react-router-migration`.",
    takeaway: "A good route map should describe real user destinations, not internal component names.",
  },
  {
    title: "I mounted the router at the root",
    detail:
      "The app is rendered inside `BrowserRouter` in `main.tsx`. That gives every routed component access to React Router navigation primitives without threading routing state through props.",
    takeaway: "Put the router high enough that page-level navigation is available everywhere it is needed.",
  },
  {
    title: "I kept the calculator state inside the calculator route",
    detail:
      "The design and calculator hooks still live in the builder screen. Moving the article away from the root route did not require changing the calculator logic, which kept the behavioral surface small.",
    takeaway: "Routing should separate screens without forcing unrelated state to move.",
  },
  {
    title: "I replaced hash navigation with route navigation",
    detail:
      "The controls panel previously linked to an on-page section with `#react-walkthrough`. That became a React Router `Link`, so Build notes now performs real client-side navigation to `/developer`.",
    takeaway: "Use hash links for sections on the same page and router links for actual destinations.",
  },
  {
    title: "I lazy-loaded article pages",
    detail:
      "Both article routes are imported with `React.lazy`. The calculator remains the first screen, and article content is pulled in only when a reader asks for it.",
    takeaway: "Route-level lazy loading keeps the primary tool focused and avoids shipping secondary reading content upfront.",
  },
  {
    title: "I fixed the build issues that surfaced",
    detail:
      "The route change exposed existing environment drift: TypeScript 6 needed a deprecation acknowledgement and Vite CSS types, while Tailwind 4 needed the new PostCSS adapter and CSS import style.",
    takeaway: "A migration is not done when the code looks right. It is done when the toolchain can prove it.",
  },
  {
    title: "I verified the routes like a user would",
    detail:
      "After the production build passed, I checked browser navigation from the calculator to the articles and direct loading of the routed pages. That caught a Tailwind output issue before it reached the final result.",
    takeaway: "Test both client-side clicks and direct URL entry for routed pages.",
  },
] as const;

const ROUTE_NOTES = [
  { label: "Primary tool", value: "/" },
  { label: "Developer guide", value: "/developer" },
  { label: "Migration article", value: "/blog/react-router-migration" },
] as const;

export function RouterMigrationArticle() {
  return (
    <section className="min-h-screen bg-[#f4f0e8] px-5 py-10 text-chrome-ink sm:px-8 md:px-10 md:py-16 lg:py-20">
      <article className="mx-auto max-w-[1040px]">
        <nav className="mb-8 flex flex-wrap gap-3">
          <Button
            asChild
            variant="ghost"
            className="h-auto px-2.5 py-2 font-mono text-[11px] uppercase tracking-[0.04em]"
          >
            <Link to="/developer">
              <ArrowLeft />
              Developer guide
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            className="h-auto px-2.5 py-2 font-mono text-[11px] uppercase tracking-[0.04em]"
          >
            <Link to="/">
              <GitBranch />
              Calculator builder
            </Link>
          </Button>
        </nav>

        <header className="grid gap-8 border-b border-[#ded6c8] pb-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-end">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#8b8171]">
              Migration journal
            </p>
            <h1 className="mt-3 max-w-[860px] text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
              How I introduced React Router without disturbing the calculator
            </h1>
            <p className="mt-6 max-w-[760px] text-base leading-7 text-[#5b5449] sm:text-lg">
              This is the step-by-step record of the routing migration: what I found, what I changed,
              what broke during verification, and how the final routed experience was made stable.
            </p>
          </div>

          <aside className="rounded-lg border border-[#ded6c8] bg-white/70 p-5 shadow-[0_18px_40px_-34px_rgba(40,32,20,.5)]">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[#8b8171]">
              <RouteIcon className="h-4 w-4" />
              Route map
            </div>
            <dl className="mt-4 space-y-3">
              {ROUTE_NOTES.map((route) => (
                <div key={route.value} className="border-t border-[#e8e0d3] pt-3">
                  <dt className="text-xs font-medium uppercase tracking-[0.12em] text-[#817767]">{route.label}</dt>
                  <dd className="mt-1 font-mono text-sm text-chrome-ink">{route.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </header>

        <ol className="mt-10 grid gap-5">
          {MIGRATION_STEPS.map((step, index) => (
            <li
              key={step.title}
              className="grid gap-5 rounded-lg border border-[#ded6c8] bg-white p-5 shadow-[0_20px_50px_-42px_rgba(40,32,20,.65)] md:grid-cols-[70px_minmax(0,1fr)] md:p-6"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-md bg-chrome-ink font-mono text-sm font-semibold text-white">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="text-xl font-semibold tracking-tight">{step.title}</h2>
                <p className="mt-3 leading-7 text-[#514a40]">{step.detail}</p>
                <p className="mt-4 border-l-2 border-[#f08a3c] pl-3 font-mono text-[12px] leading-6 text-[#6d6255]">
                  {step.takeaway}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <footer className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[#ded6c8] pt-8">
          <p className="max-w-[620px] leading-7 text-[#5b5449]">
            The final result is a cleaner application boundary: the calculator is still the first screen,
            the original guide is a proper page, and this routing migration is documented as its own article.
          </p>
          <Button asChild className="h-auto px-4 py-3 font-mono text-[11px] uppercase tracking-[0.04em]">
            <Link to="/developer">
              Read the developer guide
              <ArrowRight />
            </Link>
          </Button>
        </footer>
      </article>
    </section>
  );
}
