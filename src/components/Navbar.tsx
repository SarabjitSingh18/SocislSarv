import Link from "next/link";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import { currentUser } from "@clerk/nextjs/server";
import { syncUser } from "@/actions/user.action";
import { Search } from "lucide-react"; // Import search icon from Lucide

async function Navbar() {
  const user = await currentUser();
  if (user) await syncUser(); // POST

  return (
    <nav className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-primary font-mono tracking-wider">
              SarabSocial
            </Link>
          </div>

          {/* Search Button */}
          <Link
            href="/search"
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 transition"
          >
            <Search className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            <span className="text-gray-700 dark:text-gray-300 font-medium">Search Users</span>
          </Link>

          {/* Navigation Menus */}
          <DesktopNavbar />
          <MobileNavbar />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
