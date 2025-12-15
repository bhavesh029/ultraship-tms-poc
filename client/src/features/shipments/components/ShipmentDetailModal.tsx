import {
  X,
  Truck,
  MapPin,
  Calendar,
  User,
  Package,
  Trash2,
  Edit,
  AlertCircle,
} from "lucide-react";
import { format } from "date-fns";
import { useMutation } from "@apollo/client";
import { DELETE_SHIPMENT, GET_SHIPMENTS } from "../graphql/queries";

interface Props {
  shipment: any;
  onClose: () => void;
  onEdit: () => void;
}

export function ShipmentDetailModal({ shipment, onClose, onEdit }: Props) {
  // 1. GET USER ROLE
  const userRole = localStorage.getItem("role");
  const isAdmin = userRole === "ADMIN";

  // 2. SETUP DELETE MUTATION
  const [deleteShipment, { loading }] = useMutation(DELETE_SHIPMENT, {
    refetchQueries: [
      { query: GET_SHIPMENTS, variables: { skip: 0, take: 10 } },
    ],
    onCompleted: () => onClose(),
  });

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this shipment?")) {
      deleteShipment({ variables: { id: shipment.id } });
    }
  };

  if (!shipment) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* The Sliding Panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in">
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center bg-slate-900 text-white">
          <div>
            <h2 className="text-xl font-bold">Shipment Details</h2>
            <p className="text-sm text-slate-400 font-mono">
              {shipment.trackingId}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Status Section */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex items-center justify-between">
            <div>
              <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">
                Current Status
              </p>
              <p className="text-lg font-bold text-blue-900 mt-1">
                {shipment.status.replace("_", " ")}
              </p>
            </div>
            <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-sm">
              <Truck size={24} />
            </div>
          </div>

          {/* Route Visualizer */}
          <div className="relative pl-8 border-l-2 border-slate-200 space-y-8">
            <div className="relative">
              <span className="absolute -left-[9px] top-1 bg-green-500 h-4 w-4 rounded-full border-2 border-white shadow-sm ring-4 ring-green-100"></span>
              <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                Origin
              </p>
              <p className="text-lg font-medium text-slate-800">
                {shipment.origin}
              </p>
              <p className="text-sm text-gray-400">Warehouse A-12</p>
            </div>
            <div className="relative">
              <span className="absolute -left-[9px] top-1 bg-slate-900 h-4 w-4 rounded-full border-2 border-white shadow-sm ring-4 ring-gray-100"></span>
              <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                Destination
              </p>
              <p className="text-lg font-medium text-slate-800">
                {shipment.destination}
              </p>
              <p className="text-sm text-gray-400">Distribution Center</p>
            </div>
          </div>

          {/* Meta Data Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="flex items-center text-gray-500 mb-2">
                <Calendar size={16} className="mr-2" />
                <span className="text-xs font-bold uppercase">
                  Est. Delivery
                </span>
              </div>
              <p className="font-semibold text-slate-700">
                {shipment.estimatedDelivery
                  ? format(new Date(shipment.estimatedDelivery), "MMM d, yyyy")
                  : "N/A"}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="flex items-center text-gray-500 mb-2">
                <Package size={16} className="mr-2" />
                <span className="text-xs font-bold uppercase">Cargo Type</span>
              </div>
              <p className="font-semibold text-slate-700">Electronics</p>
            </div>
          </div>

          {/* Mock Driver Info */}
          <div className="pt-6 border-t border-dashed">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center">
              <User size={18} className="mr-2 text-blue-600" /> Driver
              Information
            </h3>
            <div className="flex items-center bg-gray-50 p-3 rounded-lg">
              <div className="h-10 w-10 bg-slate-300 rounded-full mr-3 flex items-center justify-center text-slate-600 font-bold">
                D
              </div>
              <div>
                <p className="font-medium text-slate-900">John Doe</p>
                <p className="text-sm text-gray-500">+1 (555) 123-4567</p>
              </div>
            </div>
          </div>

          {/* Warning Note */}
          {shipment.status === "DELAYED" && (
            <div className="bg-red-50 text-red-800 p-3 rounded-lg text-sm flex items-start">
              <AlertCircle size={16} className="mr-2 mt-0.5 shrink-0" />
              This shipment is currently delayed due to weather conditions in
              the route.
            </div>
          )}
        </div>

        {/* Footer Actions - HIDDEN FOR EMPLOYEES */}
        {isAdmin && (
          <div className="p-6 border-t bg-gray-50 flex space-x-3">
            <button
              onClick={onEdit}
              className="flex-1 bg-slate-900 text-white py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors flex items-center justify-center shadow-lg shadow-slate-200"
            >
              <Edit size={18} className="mr-2" /> Edit Shipment
            </button>

            <button
              onClick={handleDelete}
              disabled={loading}
              className="px-4 py-3 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 font-medium flex items-center justify-center disabled:opacity-50"
            >
              {loading ? (
                <div className="h-5 w-5 border-2 border-red-600 border-t-transparent animate-spin rounded-full" />
              ) : (
                <Trash2 size={20} />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
