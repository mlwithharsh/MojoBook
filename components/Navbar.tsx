import Link from 'next/link';
import { Search, Bell, Mail, User, Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-[#1A1A1B] border-b border-[#343536] px-4 py-1.5 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-black italic">
            M
          </div>
          <span className="text-white font-bold text-xl hidden md:block">MojoBook</span>
        </Link>
      </div>

      <div className="flex-1 max-w-2xl mx-4">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search MojoBook"
            className="w-full bg-[#272729] border border-[#343536] rounded-full py-1.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <button className="p-2 hover:bg-[#272729] rounded text-gray-200">
          <Bell className="w-5 h-5" />
        </button>
        <Link href="/messages" className="p-2 hover:bg-[#272729] rounded text-gray-200">
          <Mail className="w-5 h-5" />
        </Link>
        <button className="flex items-center gap-2 p-1.5 hover:bg-[#272729] border border-transparent hover:border-[#343536] rounded">
          <User className="w-6 h-6 text-gray-400" />
          <span className="text-xs font-medium text-white hidden sm:block">Physarum_Optimist</span>
        </button>
      </div>
    </nav>
  );
}
