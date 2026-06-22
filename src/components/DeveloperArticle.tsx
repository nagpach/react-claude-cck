import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

const DEVELOPMENT_STEPS = [
  {
    title: "Started with the user experience",
    body:
      "The first decision was not technical. The app needed to let a user design a calculator, see the result immediately, and adjust details like colors, type, spacing, and button behavior without leaving the screen.",
    lesson: "Before choosing tools, define what the user should be able to do.",
  },
  {
    title: "Split the screen into clear parts",
    body:
      "The application was divided into a live calculator preview, a controls panel, and this article. That matters because each part has a different job. The preview shows the result, the panel changes the settings, and the article explains the work.",
    lesson: "Good React apps start with clear sections, not random markup.",
  },
  {
    title: "Created typed data for the calculator design",
    body:
      "The app keeps design settings in one object: background colors, text colors, button radius, font choice, shadow style, spacing, and display options. TypeScript describes exactly what values are allowed so mistakes are caught early.",
    lesson: "When the data shape is clear, the UI becomes easier to build and debug.",
  },
  {
    title: "Created separate state for calculator behavior",
    body:
      "The calculator's math state is separate from the design state. It tracks the current number, the previous number, the selected operator, and whether the next key press should start a new number.",
    lesson: "Do not mix visual settings with business logic.",
  },
  {
    title: "Built reusable controls",
    body:
      "The settings panel uses repeated controls: sliders, switches, color inputs, and segmented buttons. Instead of rewriting the same structure many times, the app uses small React components that receive values and update functions.",
    lesson: "A component is a reusable piece of UI with a clear responsibility.",
  },
  {
    title: "Connected controls to the live preview",
    body:
      "When the user moves a slider or picks a color, React updates the design state. The preview receives the new state and redraws with the updated values. This is the main React idea: the screen reflects the current state.",
    lesson: "In React, you change state, and the UI follows.",
  },
  {
    title: "Used CSS variables for flexible styling",
    body:
      "React decides what the current design values are, then passes them to CSS variables. CSS handles the actual visual work: colors, radius, shadows, spacing, display size, and button layout.",
    lesson: "Use React for decisions and CSS for visual rules.",
  },
  {
    title: "Added persistence and keyboard support",
    body:
      "The app saves the design settings in local storage so the user's work stays after refresh. It also supports keyboard input for numbers, operators, Enter, Escape, and Backspace.",
    lesson: "Small usability details make a demo feel like a real application.",
  },
  {
    title: "Added a controllable portal",
    body:
      "The controls panel is rendered through a React portal, which means it can sit outside the normal page structure while still being managed by React. The user can now open and close that panel based on their preference.",
    lesson: "Portals are useful for UI that should float above the main page, like panels, dialogs, and overlays.",
  },
  {
    title: "Verified the final behavior",
    body:
      "After the implementation, the app was built with TypeScript and Vite, then checked in the browser to confirm the calculator, article navigation, and portal open-close behavior still worked.",
    lesson: "A feature is not finished until the rendered experience has been tested.",
  },
] as const;

const TECH_STACK = [
  {
    name: "React 19",
    role: "UI framework",
    summary:
      "React was chosen because this app has many moving parts that need to update together. The calculator preview, controls panel, and portal all respond to state changes. React makes that relationship direct: state changes first, then the interface updates.",
  },
  {
    name: "TypeScript",
    role: "Safer JavaScript",
    summary:
      "TypeScript was chosen because the app has many settings and limited option lists. For example, button shape can be Square, Rounded, Pill, or Circle. TypeScript helps prevent invalid values before the app reaches the browser.",
  },
  {
    name: "Vite",
    role: "Build tool and dev server",
    summary:
      "Vite was chosen because it gives a fast local development server and a simple production build. For a beginner, think of Vite as the tool that starts the app while you code and packages it when you are ready to ship.",
  },
  {
    name: "Tailwind CSS",
    role: "Styling system",
    summary:
      "Tailwind CSS was chosen because it makes layout, spacing, typography, and responsive design easy to express directly in the component markup. It also works well with a design system because shared tokens and repeated class patterns stay consistent.",
  },
  {
    name: "shadcn/ui",
    role: "Reusable component layer",
    summary:
      "shadcn/ui was chosen because it gives the project accessible, well-structured UI building blocks without forcing a heavy visual style. Buttons, switches, sliders, labels, and toggle groups start from reliable behavior and can still be styled for this calculator builder.",
  },
  {
    name: "Radix UI primitives",
    role: "Accessible behavior",
    summary:
      "Radix UI powers several shadcn-style controls in this project, including sliders, switches, labels, and toggle groups. It handles interaction details that are easy to get wrong, like keyboard support and accessible control behavior.",
  },
  {
    name: "Lucide React",
    role: "Icon library",
    summary:
      "Lucide React was chosen for clear, lightweight icons such as reset, randomize, close, controls, and article navigation. Icons help users scan actions faster than text alone.",
  },
] as const;

const DESIGN_SYSTEM_POINTS = [
  "Consistency: Buttons, labels, sliders, spacing, colors, and states should feel like they belong to one product.",
  "Speed: Once common patterns exist, new screens and controls can be built faster.",
  "Quality: Shared components reduce one-off styling mistakes and make accessibility easier to preserve.",
  "Maintainability: A design change can be made in one place instead of being repeated across the app.",
  "Scalability: As the project grows, a design system gives developers and designers a shared language.",
] as const;

const GLOSSARY = [
  {
    term: "Component",
    definition: "A reusable piece of UI, such as a button, slider, calculator preview, or settings section.",
  },
  {
    term: "State",
    definition: "Information React remembers, such as the selected color, current number, or whether the portal is open.",
  },
  {
    term: "Props",
    definition: "Values passed into a component so it can render the right content or behavior.",
  },
  {
    term: "Portal",
    definition: "A way to render part of the UI outside its normal page position while React still controls it.",
  },
] as const;

export function DeveloperArticle() {
  return (
    <section
      id="react-walkthrough"
      className="min-h-screen bg-chrome-panel px-5 py-10 text-chrome-ink sm:px-8 md:px-10 md:py-16 lg:py-20"
    >
      <article className="mx-auto max-w-[980px]">
        <Button
          asChild
          variant="ghost"
          className="mb-8 h-auto px-2.5 py-2 font-mono text-[11px] uppercase tracking-[0.04em]"
        >
          <Link to="/">
            <ArrowLeft />
            Calculator builder
          </Link>
        </Button>
        <header className="border-b border-chrome-line pb-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-chrome-mute">
            Senior React guide for new developers
          </p>
          <h2 className="mt-3 max-w-[800px] text-4xl font-semibold leading-[1.05] tracking-tight text-chrome-ink sm:text-5xl">
            How this calculator app was built, and why the stack matters
          </h2>
          <p className="mt-5 max-w-[760px] text-base leading-7 text-[#5f5b52] sm:text-lg">
            This article explains the application as if you are new to React. The main idea is simple:
            React helps us keep data and the screen in sync. When a user changes a setting, the data changes,
            and the calculator preview updates from that data.
          </p>
          <Button
            asChild
            variant="outline"
            className="mt-6 h-auto px-3 py-2.5 font-mono text-[11px] uppercase tracking-[0.04em]"
          >
            <Link to="/blog/react-router-migration">
              Routing migration article
              <ArrowRight />
            </Link>
          </Button>
        </header>

        <div className="grid gap-10 py-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-12">
          <div className="space-y-10">
            <section className="space-y-4">
              <h3 className="text-2xl font-semibold tracking-tight">What this application does</h3>
              <p className="leading-7 text-[#4f4b43]">
                This is a calculator construction kit. The user can change the calculator's colors, typography,
                shape, spacing, shadows, button behavior, and display options. The page immediately shows the
                updated calculator, so the user can design by experimenting instead of guessing.
              </p>
              <p className="leading-7 text-[#4f4b43]">
                For a new developer, the important lesson is that the screen is not built as one giant block.
                It is built from smaller pieces that share data in a controlled way.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-semibold tracking-tight">1. How this application was developed step by step</h3>
              <ol className="mt-5 grid gap-4">
                {DEVELOPMENT_STEPS.map((step, index) => (
                  <li
                    key={step.title}
                    className="grid gap-4 rounded-lg border border-chrome-line bg-white p-5 shadow-[0_14px_35px_-32px_rgba(0,0,0,.45)] sm:grid-cols-[44px_1fr]"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-md bg-chrome-ink font-mono text-sm font-medium text-white">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h4 className="text-lg font-semibold tracking-tight">{step.title}</h4>
                      <p className="mt-2 leading-7 text-[#504c45]">{step.body}</p>
                      <p className="mt-3 border-l-2 border-[#f08a3c] pl-3 font-mono text-[12px] leading-6 text-[#6b675f]">
                        {step.lesson}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section className="space-y-5">
              <h3 className="text-2xl font-semibold tracking-tight">2. Tech stack and why each tool was chosen</h3>
              <p className="leading-7 text-[#4f4b43]">
                A tech stack is the set of tools used to build an application. Each tool should have a clear job.
                In this app, the stack is intentionally small: React manages the interface, TypeScript protects
                the data model, Vite runs and builds the app, Tailwind handles styling, and shadcn/ui provides
                reusable controls.
              </p>
              <div className="grid gap-4">
                {TECH_STACK.map((choice) => (
                  <div key={choice.name} className="rounded-lg border border-chrome-line bg-white p-5">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h4 className="text-lg font-semibold tracking-tight">{choice.name}</h4>
                      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-chrome-mute">{choice.role}</p>
                    </div>
                    <p className="mt-2 leading-7 text-[#504c45]">{choice.summary}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-2xl font-semibold tracking-tight">3. Why a design system is important for any project</h3>
              <p className="leading-7 text-[#4f4b43]">
                A design system is a shared set of rules, components, and visual decisions. It defines how
                buttons look, how controls behave, how spacing works, what colors are used, and how the product
                should feel. Without a design system, every new screen becomes a new debate.
              </p>
              <ul className="grid gap-3">
                {DESIGN_SYSTEM_POINTS.map((point) => (
                  <li key={point} className="rounded-lg border border-chrome-line bg-white px-5 py-4 leading-7 text-[#504c45]">
                    {point}
                  </li>
                ))}
              </ul>
              <p className="leading-7 text-[#4f4b43]">
                In this project, the design system shows up in the repeated controls, shared button styles,
                consistent borders, typography, panel spacing, and reusable color tokens. That keeps the app
                feeling intentional even though the user can create many different calculator styles.
              </p>
            </section>

            <section className="space-y-4">
              <h3 className="text-2xl font-semibold tracking-tight">Final advice from a senior React developer</h3>
              <p className="leading-7 text-[#4f4b43]">
                Do not start by memorizing every React API. Start by understanding the flow: data changes,
                components receive that data, and the screen updates. Once that makes sense, tools like
                TypeScript, Vite, Tailwind CSS, shadcn/ui, and a design system help you build the same idea with
                more confidence, consistency, and fewer bugs.
              </p>
            </section>
          </div>

          <aside className="h-max border-l-0 border-chrome-line pt-1 lg:border-l lg:pl-6">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-chrome-mute">Plain English glossary</h3>
            <dl className="mt-4 space-y-4">
              {GLOSSARY.map((item) => (
                <div key={item.term} className="border-b border-chrome-line pb-4 last:border-b-0">
                  <dt className="text-sm font-semibold tracking-tight text-chrome-ink">{item.term}</dt>
                  <dd className="mt-1 text-sm leading-6 text-[#514d45]">{item.definition}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </article>
    </section>
  );
}
