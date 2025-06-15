import { Plus, Home, Compass, Square } from "lucide-react";
import { IconButton } from "@/shared/components/IconButton";
import { SidebarLink } from "@/shared/components/SidebarLink";

const LogoIcon = () => (
  <div className="w-8 h-8">
    <div className="w-full h-full border-2 border-textMain rounded-md" />
  </div>
);

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col items-center gap-2 py-4 px-2 w-20 border-r border-borderMain dark:border-borderMainDark">
      <LogoIcon />
      <IconButton icon={Plus} label="New Thread" />
      <nav className="flex flex-col gap-6 mt-6">
        <SidebarLink icon={Home} label="Home" active />
        <SidebarLink icon={Compass} label="Discover" />
        <SidebarLink icon={Square} label="Spaces" />
      </nav>
    </aside>
  );
}
