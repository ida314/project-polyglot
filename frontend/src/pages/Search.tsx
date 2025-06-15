import Sidebar from "@/features/search/components/Sidebar";
import SearchWidget from "@/features/search/components/SearchWidget";
import { TagButton } from "@/features/search/components/TagButton";

export default function SearchPage() {
  return (
    <div className="h-screen flex bg-background dark:bg-neutral-900 text-textMain dark:text-neutral-50">
      <Sidebar />

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-xl">
          <h1 className="font-sans font-semibold text-center text-4xl md:text-5xl mb-12 tracking-tight">
            polyglot.ai
          </h1>

          <SearchWidget />

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
