import React from "react";

type Props = {
  icon: React.ElementType;
  label: string;
  primary?: boolean;
};

export const IconButton = ({ icon: Icon, label, primary }: Props) => (
  <button
    className={`btn-icon ${primary ? "bg-super text-white" : ""}`}
    aria-label={label}
  >
    <Icon className="size-4" />
  </button>
);
