import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_SHIPMENTS } from "../graphql/queries";
import {
  LayoutGrid,
  List,
  ArrowLeft,
  ArrowRight,
  MoreVertical,
} from "lucide-react";
import { format } from "date-fns";
import { ShipmentTile } from "./ShipmentTile";
import { ShipmentDetailModal } from "./ShipmentDetailModal";
import { CreateShipmentModal } from "./CreateShipmentModal";

export function ShipmentGrid() {
  const [viewMode, setViewMode] = useState<"table" | "tile">("table");
  const [page, setPage] = useState(0);

  // 1. ADD THIS MISSING STATE
  const [selectedShipment, setSelectedShipment] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  const PAGE_SIZE = 10;

  const { data, loading, error } = useQuery(GET_SHIPMENTS, {
    variables: { skip: page * PAGE_SIZE, take: PAGE_SIZE },
    pollInterval: 5000,
  });

  if (loading)
    return (
      <div className="p-10 text-center text-gray-500">Loading shipments...</div>
    );
  if (error)
    return (
      <div className="p-10 text-center text-red-500">
        Error: {error.message}
      </div>
    );

  return (
    <div className="space-y-4">
      {/* TOOLBAR: Toggle Buttons */}
      <div className="flex justify-end mb-4">
        <div className="bg-white border p-1 rounded-lg flex space-x-1">
          <button
            onClick={() => setViewMode("table")}
            className={`p-2 rounded-md ${
              viewMode === "table"
                ? "bg-slate-100 text-slate-900 shadow-sm"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <List size={20} />
          </button>
          <button
            onClick={() => setViewMode("tile")}
            className={`p-2 rounded-md ${
              viewMode === "tile"
                ? "bg-slate-100 text-slate-900 shadow-sm"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <LayoutGrid size={20} />
          </button>
        </div>
      </div>

      {/* CONTENT AREA */}
      {viewMode === "table" ? (
        // TABLE VIEW
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3">Tracking ID</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Origin</th>
                <th className="px-6 py-3">Destination</th>
                <th className="px-6 py-3">Est. Delivery</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.shipments.map((shipment: any) => (
                <tr
                  key={shipment.id}
                  onClick={() => setSelectedShipment(shipment)} // CLICK HANDLER
                  className="bg-white border-b hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {shipment.trackingId}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={shipment.status} />
                  </td>
                  <td className="px-6 py-4">{shipment.origin}</td>
                  <td className="px-6 py-4">{shipment.destination}</td>
                  <td className="px-6 py-4">
                    {shipment.estimatedDelivery
                      ? format(
                          new Date(shipment.estimatedDelivery),
                          "MMM d, yyyy"
                        )
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-400 hover:text-blue-600">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        // TILE VIEW
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.shipments.map((shipment: any) => (
            <div
              key={shipment.id}
              onClick={() => setSelectedShipment(shipment)}
              className="cursor-pointer"
            >
              <ShipmentTile shipment={shipment} />
            </div>
          ))}
        </div>
      )}

      {/* PAGINATION (Keep this) */}
      <div className="flex justify-between items-center pt-4">
        {/* ... (pagination code is fine) ... */}
      </div>

      {/* KEEP THIS BLOCK 👇 (It handles both Viewing and Editing triggers) */}
      {selectedShipment && !isEditing && (
        <ShipmentDetailModal
          shipment={selectedShipment}
          onClose={() => setSelectedShipment(null)}
          onEdit={() => setIsEditing(true)} // This is crucial
        />
      )}

      {/* KEEP THIS BLOCK 👇 (The Edit Form) */}
      {isEditing && selectedShipment && (
        <CreateShipmentModal
          shipmentToEdit={selectedShipment}
          onClose={() => {
            setIsEditing(false);
            setSelectedShipment(null);
          }}
        />
      )}
    </div>
  );
}

// Helper
function StatusBadge({ status }: { status: string }) {
  const styles: any = {
    IN_TRANSIT: "bg-blue-100 text-blue-800",
    DELIVERED: "bg-green-100 text-green-800",
    PENDING: "bg-yellow-100 text-yellow-800",
    DELAYED: "bg-red-100 text-red-800",
  };
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-semibold ${
        styles[status] || "bg-gray-100"
      }`}
    >
      {status.replace("_", " ")}
    </span>
  );
}
