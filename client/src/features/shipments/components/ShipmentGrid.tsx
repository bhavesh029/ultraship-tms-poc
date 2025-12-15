import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_SHIPMENTS } from "../graphql/queries";
import {
  LayoutGrid,
  List,
  ArrowLeft,
  ArrowRight,
  MoreVertical,
  Filter,
} from "lucide-react";
import { format } from "date-fns";
import { ShipmentTile } from "./ShipmentTile";
import { ShipmentDetailModal } from "./ShipmentDetailModal";
import { CreateShipmentModal } from "./CreateShipmentModal";

export function ShipmentGrid() {
  const userRole = localStorage.getItem("role");
  const isAdmin = userRole === "ADMIN";

  const [viewMode, setViewMode] = useState<"table" | "tile">("table");
  const [page, setPage] = useState(0);

  // NEW: Status Filter State
  const [statusFilter, setStatusFilter] = useState<string>("");

  const [selectedShipment, setSelectedShipment] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  const PAGE_SIZE = 10;

  const { data, loading, error } = useQuery(GET_SHIPMENTS, {
    variables: {
      skip: page * PAGE_SIZE,
      take: PAGE_SIZE,
      // Pass 'undefined' if empty string so backend ignores it
      status: statusFilter || undefined,
    },
    pollInterval: 5000,
    // This ensures we keep showing old data while fetching new data
    notifyOnNetworkStatusChange: true,
  });

  // Only show full loader on FIRST load (no data yet)
  if (loading && !data)
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
      {/* TOOLBAR */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        {/* LEFT: Filter Dropdown */}
        <div className="relative">
          <Filter className="absolute left-3 top-2.5 text-gray-400" size={16} />
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(0); // Reset to page 0 when filtering
            }}
            className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none min-w-[180px]"
          >
            <option value="">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="IN_TRANSIT">In Transit</option>
            <option value="DELIVERED">Delivered</option>
            <option value="DELAYED">Delayed</option>
          </select>
        </div>

        {/* RIGHT: View Toggles */}
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

      {/* CONTENT AREA (With Loading Opacity) */}
      <div
        className={`transition-opacity duration-200 ${
          loading ? "opacity-50" : "opacity-100"
        }`}
      >
        {viewMode === "table" ? (
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
                {data?.shipments.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-10 text-center text-gray-400"
                    >
                      No shipments found.
                    </td>
                  </tr>
                ) : (
                  data?.shipments.map((shipment: any) => (
                    <tr
                      key={shipment.id}
                      onClick={() => setSelectedShipment(shipment)}
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
                        {isAdmin && (
                          <button
                            className="text-gray-400 hover:text-blue-600"
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            <MoreVertical size={16} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        ) : (
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
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between items-center pt-4">
        <span className="text-sm text-gray-500">Page {page + 1}</span>
        <div className="flex space-x-2">
          <button
            disabled={page === 0 || loading}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 border rounded bg-white disabled:opacity-50 hover:bg-gray-50 flex items-center"
          >
            <ArrowLeft size={16} className="mr-1" /> Prev
          </button>
          <button
            disabled={(data?.shipments.length || 0) < PAGE_SIZE || loading}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 border rounded bg-white disabled:opacity-50 hover:bg-gray-50 flex items-center"
          >
            Next <ArrowRight size={16} className="ml-1" />
          </button>
        </div>
      </div>

      {/* MODALS */}
      {selectedShipment && !isEditing && (
        <ShipmentDetailModal
          shipment={selectedShipment}
          onClose={() => setSelectedShipment(null)}
          onEdit={() => setIsEditing(true)}
        />
      )}

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
