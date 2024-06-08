import { ModeToggle } from "@/components/ui/mode-toggle";
import Image from "next/image";
import Link from "next/link";
import { HeaderActions } from "./header-actions";

const Header = () => {
  return (
    <div className="bg-slate-900 py-2">
      <div className="container mx-auto flex items-center justify-between gap-3">
        <Link
          href={"/"}
          className="flex items-center justify-start gap-2 rounded-md px-2 py-1 duration-200 hover:bg-white/10 active:bg-white/20"
        >
          <Image
            src="/logo/logo.png"
            alt="sushi-bar-logo"
            width={35}
            height={35}
          />
          <span className="text-xl font-semibold text-slate-300">
            Sushi Bar
          </span>
        </Link>
        <div className="flex items-center justify-end gap-4">
          <ModeToggle />
          <HeaderActions />
        </div>
      </div>
    </div>
  );
};

export default Header;
