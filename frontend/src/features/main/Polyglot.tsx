import React, { useState } from "react";
import {
  Plus,
  Home,
  Compass,
  Square,
  Search,
  Cpu,
  Globe,
  Mic,
} from "lucide-react";

/**
 * Lightweight Perplexity‑style landing page
 * --------------------------------------------------
 * – Tailwind CSS utility classes only → no extra style sheets
 * – Fully responsive (sidebar hides < md)
 * – Detaches logic (state) from visuals so you can swap in real data later
 * – Replace dummy LogoIcon with your SVG/PNG when you have it
 */

/* ──────────────────────────────────────────
   Helper components
   ────────────────────────────────────────── */

type SidebarLinkProps = {
  icon: React.ElementType;
  label: string;
  active?: boolean;
};

const SidebarLink = ({ icon: Icon, label, active }: SidebarLinkProps) => (
  <button
    className={`btn-icon group ${active ? "text-super" : "text-textOff"}`}
    aria-label={label}
  >
    <Icon className="size-5 group-hover:scale-110 transition-transform" />
    <span className="sr-only">{label}</span>
  </button>
);

const IconButton = ({
  icon: Icon,
  label,
  primary,
}: {
  icon: React.ElementType;
  label: string;
  primary?: boolean;
}) => (
  <button
    className={`btn-icon ${primary ? "bg-super text-white" : ""}`}
    aria-label={label}
  >
    <Icon className="size-4" />
  </button>
);

const TagButton = ({ label }: { label: string }) => (
  <button className="px-3 h-6 rounded-md bg-offsetPlus dark:bg-neutral-800 text-xs font-medium text-textMain dark:text-white hover:bg-offset dark:hover:bg-neutral-700 transition">
    {label}
  </button>
);

const RadioButtonGroup = () => {
  const [mode, setMode] = useState("search");
  const Radio = ({
    value,
    icon: Icon,
    disabled,
  }: {
    value: string;
    icon: React.ElementType;
    disabled?: boolean;
  }) => (
    <button
      type="button"
      aria-checked={mode === value}
      onClick={() => !disabled && setMode(value)}
      className={`btn-icon h-8 min-w-9 ${
      mode === value
        ? "border border-super/60 bg-super/10 text-super"
        : "text-text-100/70"
    } ${disabled ? "opacity-40 cursor-not-allowed" : ""}`}
      disabled={disabled}
    >
      <Icon className="size-4" />
    </button>
  );
  return (
    <div className="flex gap-1">
      <Radio value="search" icon={Search} />
      <Radio value="research" icon={Compass} disabled />
      <Radio value="lab" icon={Square} disabled />
    </div>
  );
};

const LogoIcon = () => (
  <div className="w-8 h-8">
    {/* TODO: insert brand glyph */}
    <div className="w-full h-full border-2 border-textMain rounded-md" />
  </div>
);

// api

const onSubmit = async () => {
  const text = input.trim();
  if (!text) return;

  try {
    const data = await mutateAsync({ query: text });
    setAnswer(data.answer);              // local state / context / reducer
  } catch (_) {
    toast.error("Something went wrong – try again?");
  }
};


/* ──────────────────────────────────────────
   Main component
   ────────────────────────────────────────── */

export default function Polyglot() {
  return (
    <div className="h-screen flex bg-background dark:bg-neutral-900 text-textMain dark:text-neutral-50">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col items-center gap-2 py-4 px-2 w-20 border-r border-borderMain dark:border-borderMainDark">
        <LogoIcon />
        <IconButton icon={Plus} label="New Thread" />
        <nav className="flex flex-col gap-6 mt-6">
          <SidebarLink icon={Home} label="Home" active />
          <SidebarLink icon={Compass} label="Discover" />
          <SidebarLink icon={Square} label="Spaces" />
        </nav>
      </aside>

      {/* Main area */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-xl">
          <h1 className="font-sans font-semibold text-center text-4xl md:text-5xl mb-12 tracking-tight">
            polyglot.ai
          </h1>

          {/* Search widget */}
          <div className="bg-background-50 dark:bg-neutral-800/60 border border-borderMain dark:border-neutral-700 rounded-2xl shadow-sm">
            <textarea
              rows={2}
              placeholder="Ask anything…"
              className="w-full resize-none bg-transparent p-4 text-base placeholder-textOff dark:placeholder-textOffDark focus:outline-none"
            />

            <div className="flex items-center justify-between px-2 py-2 border-t border-borderMain dark:border-neutral-700">
              <RadioButtonGroup />
              <div className="flex items-center gap-1">
                <IconButton icon={Cpu} label="Model" />
                <IconButton icon={Globe} label="Language" />
                <IconButton icon={Mic} label="Dictate" primary />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {["Research", "Sports", "Local", "Plan"].map((t) => (
              <TagButton key={t} label={t} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

/* ──────────────────────────────────────────
   Tailwind component shortcuts
   (drop this inside globals.css or wherever you keep @layer utilities)
   ────────────────────────────────────────── */
/*
@layer components {
  .btn-icon {
    @apply flex items-center justify-center rounded-lg h-10 aspect-square transition hover:scale-105 active:scale-95;
  }
}
*/