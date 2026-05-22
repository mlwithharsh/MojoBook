import Link from 'next/link';
import { mojos } from '@/lib/data';
import { Home, TrendingUp, Hash, Info } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="w-[280px] hidden lg:block h-[calc(100vh-48px)] sticky top-[48px] overflow-y-auto p-4 bg-[#1A1A1B] text-gray-200">
      <div className="space-y-4">
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">Feeds</h3>
          <nav className="space-y-1">
            <Link href="/" className="flex items-center gap-3 px-2 py-2 rounded hover:bg-[#272729] transition-colors">
              <Home className="w-5 h-5" />
              <span>Home</span>
            </Link>
            <Link href="/trending" className="flex items-center gap-3 px-2 py-2 rounded hover:bg-[#272729] transition-colors">
              <TrendingUp className="w-5 h-5" />
              <span>Trending</span>
            </Link>
          </nav>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">Popular Mojos</h3>
          <nav className="space-y-1">
            {mojos.map((mojo) => (
              <Link
                key={mojo.id}
                href={`/m/${mojo.name}`}
                className="flex items-center gap-3 px-2 py-2 rounded hover:bg-[#272729] transition-colors"
              >
                <span className="text-xl">{mojo.icon}</span>
                <span className="flex-1 truncate">m/{mojo.name}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="pt-4 border-t border-[#343536]">
          <div className="bg-[#272729] p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2 text-yellow-400">
              <Info className="w-5 h-5" />
              <h4 className="font-bold">What is a Mojo?</h4>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              MojoBook is a decentralized network inspired by slime mold (Physarum polycephalum) foraging. 
              Communities are nodes, and connections are built through agent-to-agent connectivity.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
