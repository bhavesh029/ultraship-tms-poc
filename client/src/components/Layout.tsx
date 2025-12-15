import { useState } from "react";
import { Menu, X, Truck, LayoutGrid, Users, Settings } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-50 text-slate-800">
      {/* SIDEBAR */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-slate-900 text-white transition-all duration-300 flex flex-col`}
      >
        <div className="h-16 flex items-center justify-center border-b border-slate-800 font-bold text-xl tracking-wider">
          {isSidebarOpen ? "ULTRASHIP" : "US"}
        </div>

        <nav className="flex-1 py-6 space-y-2">
          <NavItem
            icon={<Truck size={20} />}
            label="Shipments"
            isOpen={isSidebarOpen}
            active
          />
          <NavItem
            icon={<Users size={20} />}
            label="Drivers"
            isOpen={isSidebarOpen}
          />
          <NavItem
            icon={<LayoutGrid size={20} />}
            label="Analytics"
            isOpen={isSidebarOpen}
          />
        </nav>

        <div className="p-4 border-t border-slate-800">
          <NavItem
            icon={<Settings size={20} />}
            label="Settings"
            isOpen={isSidebarOpen}
          />
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* TOP HEADER (Horizontal Menu) */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-md"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className="flex items-center space-x-6">
            <span className="text-sm font-medium text-gray-500">
              Status: System Normal
            </span>
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
              A
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}

// Helper Component for Sidebar Items
function NavItem({ icon, label, isOpen, active }: any) {
  return (
    <div
      className={`flex items-center px-6 py-3 cursor-pointer hover:bg-slate-800 transition-colors ${
        active ? "bg-slate-800 border-r-4 border-blue-500" : ""
      }`}
    >
      {icon}
      {isOpen && <span className="ml-4 text-sm font-medium">{label}</span>}
    </div>
  );
}
