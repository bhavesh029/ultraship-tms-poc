import { useState } from "react";
import { Layout } from "./components/Layout";
import { ShipmentGrid } from "./features/shipments/components/ShipmentGrid";
import { CreateShipmentModal } from "./features/shipments/components/CreateShipmentModal";

function App() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-slate-800">
            Shipments Dashboard
          </h1>

          {/* 1. Add onClick handler */}
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm transition-all"
          >
            + New Shipment
          </button>
        </div>

        <ShipmentGrid />

        {/* 2. Render Modal if open */}
        {isCreateModalOpen && (
          <CreateShipmentModal onClose={() => setIsCreateModalOpen(false)} />
        )}
      </div>
    </Layout>
  );
}

export default App;
