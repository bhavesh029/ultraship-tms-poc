import { useState, useEffect } from "react";
import { Layout } from "./components/Layout";
import { ShipmentGrid } from "./features/shipments/components/ShipmentGrid";
import { CreateShipmentModal } from "./features/shipments/components/CreateShipmentModal";
import { Login } from "./pages/Login"; // Import Login

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  // Check for token on load
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token) {
      setIsAuthenticated(true);
      setUserRole(role);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsAuthenticated(false);
    setUserRole(null);
  };

  // 1. If not logged in, show Login Page
  if (!isAuthenticated) {
    return (
      <Login
        onLoginSuccess={() => {
          setIsAuthenticated(true);
          setUserRole(localStorage.getItem("role"));
        }}
      />
    );
  }

  // 2. If logged in, show Dashboard
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-slate-800">
            Shipments Dashboard
          </h1>

          <div className="flex space-x-4">
            {/* Only ADMIN can see the Add Button */}
            {userRole === "ADMIN" && (
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm transition-all"
              >
                + New Shipment
              </button>
            )}

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="text-sm text-red-600 hover:text-red-800 font-medium"
            >
              Logout
            </button>
          </div>
        </div>

        <ShipmentGrid />

        {isCreateModalOpen && (
          <CreateShipmentModal onClose={() => setIsCreateModalOpen(false)} />
        )}
      </div>
    </Layout>
  );
}

export default App;
