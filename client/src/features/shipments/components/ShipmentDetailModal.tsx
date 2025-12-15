import { X, Truck, MapPin, Calendar, User, Package } from "lucide-react";
import { format } from "date-fns";

interface Props {
  shipment: any;
  onClose: () => void;
}

export function ShipmentDetailModal({ shipment, onClose }: Props) {
  if (!shipment) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* 1. Backdrop (Darken the background) */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* 2. The Sliding Panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in">
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center bg-slate-900 text-white">
          <div>
            <h2 className="text-xl font-bold">Shipment Details</h2>
            <p className="text-sm text-slate-400">ID: {shipment.trackingId}</p>
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
            <div className="h-10 w-10 bg-blue-200 rounded-full flex items-center justify-center text-blue-700">
              <Truck size={20} />
            </div>
          </div>

          {/* Route Visualizer */}
          <div className="relative pl-8 border-l-2 border-slate-200 space-y-8">
            <div className="relative">
              <span className="absolute -left-[39px] bg-green-500 h-5 w-5 rounded-full border-4 border-white shadow-sm"></span>
              <p className="text-xs text-gray-500 uppercase">Origin</p>
              <p className="text-lg font-medium text-slate-800">
                {shipment.origin}
              </p>
              <p className="text-sm text-gray-400">Warehouse A-12</p>
            </div>
            <div className="relative">
              <span className="absolute -left-[39px] bg-slate-900 h-5 w-5 rounded-full border-4 border-white shadow-sm"></span>
              <p className="text-xs text-gray-500 uppercase">Destination</p>
              <p className="text-lg font-medium text-slate-800">
                {shipment.destination}
              </p>
              <p className="text-sm text-gray-400">Distribution Center</p>
            </div>
          </div>

          {/* Meta Data Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center text-gray-500 mb-2">
                <Calendar size={16} className="mr-2" />
                <span className="text-xs font-medium uppercase">
                  Est. Delivery
                </span>
              </div>
              <p className="font-semibold text-slate-700">
                {shipment.estimatedDelivery
                  ? format(new Date(shipment.estimatedDelivery), "MMM d, yyyy")
                  : "N/A"}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center text-gray-500 mb-2">
                <Package size={16} className="mr-2" />
                <span className="text-xs font-medium uppercase">
                  Cargo Type
                </span>
              </div>
              <p className="font-semibold text-slate-700">Electronics</p>
            </div>
          </div>

          {/* Mock Driver Info */}
          <div className="pt-6 border-t">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center">
              <User size={18} className="mr-2" /> Driver Information
            </h3>
            <div className="flex items-center">
              <div className="h-10 w-10 bg-gray-200 rounded-full mr-3"></div>
              <div>
                <p className="font-medium">John Doe</p>
                <p className="text-sm text-gray-500">+1 (555) 123-4567</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t bg-gray-50 flex space-x-3">
          <button className="flex-1 bg-slate-900 text-white py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors">
            Edit Shipment
          </button>
          <button className="px-4 py-3 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 font-medium">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
