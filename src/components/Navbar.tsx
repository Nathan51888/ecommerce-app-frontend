import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Moon } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between border-b px-4 py-2">
      <div className="flex w-full items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="my-auto h-4" />
          <h1>Dashboard</h1>
        </div>
        {/* RIGHT */}
        <div className="flex items-center gap-4">
          <Moon />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
