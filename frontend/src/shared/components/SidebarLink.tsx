import React from "react";

type Props = {
  icon: React.ElementType;
  label: string;
  active?: boolean;
};

export const SidebarLink = ({ icon: Icon, label, active }: Props) => (
  <button
    className={`btn-icon group ${active ? "text-super" : "text-textOff"}`}
    aria-label={label}
  >
    <Icon className="size-5 group-hover:scale-110 transition-transform" />
    <span className="sr-only">{label}</span>
  </button>
);
