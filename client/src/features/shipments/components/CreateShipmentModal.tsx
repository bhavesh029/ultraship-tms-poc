import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import {
  CREATE_SHIPMENT,
  UPDATE_SHIPMENT,
  GET_SHIPMENTS,
} from "../graphql/queries";
import { X, Save, Loader2 } from "lucide-react";

interface Props {
  onClose: () => void;
  shipmentToEdit?: any;
}

export function CreateShipmentModal({ onClose, shipmentToEdit }: Props) {
  const isEditMode = !!shipmentToEdit;

  const [formData, setFormData] = useState({
    // REMOVED trackingId from initial state
    origin: "",
    destination: "",
    status: "PENDING",
    estimatedDelivery: "",
  });

  useEffect(() => {
    if (shipmentToEdit) {
      setFormData({
        // Tracking ID is not editable, so we don't load it into state
        origin: shipmentToEdit.origin,
        destination: shipmentToEdit.destination,
        status: shipmentToEdit.status,
        estimatedDelivery: shipmentToEdit.estimatedDelivery
          ? new Date(shipmentToEdit.estimatedDelivery)
              .toISOString()
              .split("T")[0]
          : "",
      });
    }
  }, [shipmentToEdit]);

  const MUTATION = isEditMode ? UPDATE_SHIPMENT : CREATE_SHIPMENT;

  const [submitAction, { loading, error }] = useMutation(MUTATION, {
    refetchQueries: [
      { query: GET_SHIPMENTS, variables: { skip: 0, take: 10 } },
    ],
    onCompleted: () => onClose(),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: any = {
      ...formData,
      estimatedDelivery: formData.estimatedDelivery
        ? new Date(formData.estimatedDelivery)
        : null,
    };

    if (isEditMode) {
      payload.id = shipmentToEdit.id;
      // If updating, we usually don't send trackingId anyway,
      // but if your update DTO allows it, you can leave it out.
    }

    submitAction({
      variables: { input: payload },
    });
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-slide-up">
        <div className="bg-slate-900 text-white p-4 flex justify-between items-center">
          <h2 className="text-lg font-bold">
            {isEditMode ? "Edit Shipment" : "Create New Shipment"}
          </h2>
          <button onClick={onClose} className="hover:bg-slate-700 p-1 rounded">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded text-sm">
              {error.message}
            </div>
          )}

          {/* DISPLAY ONLY - Show Tracking ID if editing */}
          {isEditMode && (
            <div className="bg-gray-50 p-3 rounded border border-gray-200">
              <span className="text-xs text-gray-500 uppercase font-bold">
                Tracking ID
              </span>
              <p className="font-mono font-bold text-slate-700">
                {shipmentToEdit.trackingId}
              </p>
            </div>
          )}

          {/* DELETED THE TRACKING ID INPUT FIELD HERE */}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Origin
              </label>
              <input
                required
                type="text"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
                value={formData.origin}
                onChange={(e) =>
                  setFormData({ ...formData, origin: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Destination
              </label>
              <input
                required
                type="text"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
                value={formData.destination}
                onChange={(e) =>
                  setFormData({ ...formData, destination: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
            >
              <option value="PENDING">Pending</option>
              <option value="IN_TRANSIT">In Transit</option>
              <option value="DELIVERED">Delivered</option>
              <option value="DELAYED">Delayed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Est. Delivery Date
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
              value={formData.estimatedDelivery}
              onChange={(e) =>
                setFormData({ ...formData, estimatedDelivery: e.target.value })
              }
            />
          </div>

          <div className="pt-4 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="animate-spin mr-2" size={18} />
              ) : (
                <Save className="mr-2" size={18} />
              )}
              {isEditMode ? "Update Shipment" : "Create Shipment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
