export const TagButton = ({ label }: { label: string }) => (
  <button className="px-3 h-6 rounded-md bg-offsetPlus dark:bg-neutral-800 text-xs font-medium text-textMain dark:text-white hover:bg-offset dark:hover:bg-neutral-700 transition">
    {label}
  </button>
);
