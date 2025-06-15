import React, { useState } from "react";
import { Cpu, Globe, Mic, Compass, Search, Square } from "lucide-react";
import { useAsk } from "../hooks/useAsk";
import { IconButton } from "@/shared/components/IconButton";

export default function SearchWidget() {
  const [query, setQuery] = useState("");
  const { mutateAsync, isPending } = useAsk();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    await mutateAsync({ query });
    // handle result in parent or context
  };

  const [mode, setMode] = useState<"search" | "research" | "lab">("search");

  const Radio = ({
    value,
    icon: Icon,
    disabled,
  }: {
    value: typeof mode;
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
      } ${disabled && "opacity-40 cursor-not-allowed"}`}
      disabled={disabled}
    >
      <Icon className="size-4" />
    </button>
  );

  return (
    <form
      onSubmit={onSubmit}
      className="bg-background-50 dark:bg-neutral-800/60 border border-borderMain dark:border-neutral-700 rounded-2xl shadow-sm"
    >
      <textarea
        rows={2}
        placeholder="Ask anything…"
        className="w-full resize-none bg-transparent p-4 text-base placeholder-textOff dark:placeholder-textOffDark focus:outline-none"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="flex items-center justify-between px-2 py-2 border-t border-borderMain dark:border-neutral-700">
        <div className="flex gap-1">
          <Radio value="search" icon={Search} />
          <Radio value="research" icon={Compass} disabled />
          <Radio value="lab" icon={Square} disabled />
        </div>

        <div className="flex items-center gap-1">
          <IconButton icon={Cpu} label="Model" />
          <IconButton icon={Globe} label="Language" />
          <IconButton icon={Mic} label="Dictate" primary />
        </div>
      </div>
    </form>
  );
}
