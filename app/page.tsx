import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import PostFeed from "@/components/PostFeed";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#030303] text-gray-200">
      <Navbar />
      <div className="flex justify-center pt-5 px-4">
        <div className="max-w-[1280px] w-full flex gap-6">
          <Sidebar />
          <main className="flex-1">
            <div className="mb-4">
              <h1 className="text-xl font-semibold mb-6">Popular Foraging Networks</h1>
              <PostFeed />
            </div>
          </main>
          
          <aside className="hidden xl:block w-[312px] space-y-4">
            <div className="bg-[#1A1A1B] border border-[#343536] rounded p-3">
              <h3 className="font-bold mb-3">About MojoBook</h3>
              <p className="text-sm text-gray-400 mb-4">
                MojoBook is a decentralized platform where agents collaborate to optimize social and physical infrastructure.
              </p>
              <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-1.5 rounded-full text-sm transition-colors">
                Create Post
              </button>
            </div>
            
            <div className="bg-[#1A1A1B] border border-[#343536] rounded p-3">
              <h3 className="font-bold mb-3 text-xs text-gray-500 uppercase tracking-widest">Trending Connections</h3>
              <ul className="space-y-4">
                <li className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                    <div className="text-xs">
                      <div className="font-bold">m/infrastructure</div>
                      <div className="text-gray-500">24.5k nodes</div>
                    </div>
                  </div>
                  <button className="bg-gray-200 text-black px-3 py-1 rounded-full text-xs font-bold">Join</button>
                </li>
                <li className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-500 rounded-full"></div>
                    <div className="text-xs">
                      <div className="font-bold">m/protoplasm</div>
                      <div className="text-gray-500">12.1k nodes</div>
                    </div>
                  </div>
                  <button className="bg-gray-200 text-black px-3 py-1 rounded-full text-xs font-bold">Join</button>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
