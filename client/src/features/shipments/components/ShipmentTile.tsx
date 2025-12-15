import { Truck, MapPin, Calendar, MoreVertical } from "lucide-react";
import { format } from "date-fns";

interface Props {
  shipment: any;
}

export function ShipmentTile({ shipment }: Props) {
  const userRole = localStorage.getItem("role");
  const isAdmin = userRole === "ADMIN";

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative group">
      {/* Top Row: ID & Status */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
            <Truck size={20} />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">TRACKING ID</p>
            <p className="text-sm font-bold text-slate-900">
              {shipment.trackingId}
            </p>
          </div>
        </div>
        <StatusBadge status={shipment.status} />
      </div>

      {/* Middle Row: Route */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <MapPin size={16} className="mr-2 text-gray-400" />
          <span className="font-medium text-slate-700">{shipment.origin}</span>
          <span className="mx-2 text-gray-300">→</span>
          <span className="font-medium text-slate-700">
            {shipment.destination}
          </span>
        </div>
        <div className="flex items-center text-xs text-gray-500">
          <Calendar size={14} className="mr-2" />
          {shipment.estimatedDelivery
            ? format(new Date(shipment.estimatedDelivery), "MMM d, yyyy")
            : "N/A"}
        </div>
      </div>

      {isAdmin && (
        <button className="absolute top-4 right-2 p-1 text-gray-400 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreVertical size={18} />
        </button>
      )}
    </div>
  );
}

// Reusing the badge logic (you can move this to a shared file later)
function StatusBadge({ status }: { status: string }) {
  const styles: any = {
    IN_TRANSIT: "bg-blue-100 text-blue-800",
    DELIVERED: "bg-green-100 text-green-800",
    PENDING: "bg-yellow-100 text-yellow-800",
    DELAYED: "bg-red-100 text-red-800",
  };
  return (
    <span
      className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${
        styles[status] || "bg-gray-100"
      }`}
    >
      {status.replace("_", " ")}
    </span>
  );
}
