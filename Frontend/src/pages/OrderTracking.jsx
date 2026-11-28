import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { fetchOrderById } from '../redux/slice/orderSlice';
import orderService from '../services/orderService';
import {
  Bike,
  Clock,
  MapPin,
  Store,
  Phone,
  AlertCircle,
  Home,
  Check,
  ChevronRight
} from 'lucide-react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// ----------------------------------------------------------------------
// Custom Map Icons (Designed cleanly with SVG/HTML to avoid Vite 404s)
// ----------------------------------------------------------------------

const createMapIcon = ({ emoji, color, isRider = false }) => {
  if (isRider) {
    return L.divIcon({
      className: 'custom-leaflet-rider-icon',
      html: `
        <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 52px; height: 52px;">
          <div style="position: absolute; width: 44px; height: 44px; border-radius: 50%; background: rgba(37, 99, 235, 0.22); animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
          <div style="position: relative; width: 40px; height: 40px; border-radius: 50%; background: #2563EB; box-shadow: 0 4px 18px rgba(37, 99, 235, 0.45); border: 2.5px solid #ffffff; display: flex; align-items: center; justify-content: center;">
            <span style="font-size: 20px; line-height: 1; transform: translate(1px, -1px);">${emoji}</span>
          </div>
        </div>
      `,
      iconSize: [52, 52],
      iconAnchor: [26, 26],
      popupAnchor: [0, -28],
    });
  }

  return L.divIcon({
    className: 'custom-leaflet-pin-icon',
    html: `
      <div style="position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center;">
        <div style="width: 38px; height: 38px; border-radius: 50%; background: #ffffff; box-shadow: 0 4px 14px rgba(0,0,0,0.18); border: 2.5px solid ${color}; display: flex; align-items: center; justify-content: center;">
          <span style="font-size: 17px; line-height: 1;">${emoji}</span>
        </div>
        <div style="width: 0; height: 0; border-left: 5px solid transparent; border-right: 5px solid transparent; border-top: 6px solid ${color}; margin-top: -1px;"></div>
      </div>
    `,
    iconSize: [38, 44],
    iconAnchor: [19, 44],
    popupAnchor: [0, -44],
  });
};

const restaurantIcon = createMapIcon({ emoji: '🏪', color: '#E52B23' });
const riderIcon = createMapIcon({ emoji: '🛵', color: '#2563EB', isRider: true });
const customerIcon = createMapIcon({ emoji: '📍', color: '#059669' });

// ----------------------------------------------------------------------
// Map Auto-Fit Bounds Helper
// ----------------------------------------------------------------------

function MapBoundsUpdater({ points = [] }) {
  const map = useMap();
  const initialFittedRef = useRef(false);

  useEffect(() => {
    const validPoints = (points || []).filter(
      (p) => Array.isArray(p) && p.length === 2 && !isNaN(p[0]) && !isNaN(p[1]) && p[0] != null && p[1] != null
    );
    if (validPoints.length === 0) return;

    if (validPoints.length >= 2) {
      try {
        map.fitBounds(validPoints, {
          padding: [50, 50],
          maxZoom: 16,
          animate: true,
        });
        initialFittedRef.current = true;
      } catch {
        // Safe fallback
      }
    } else if (validPoints.length === 1 && !initialFittedRef.current) {
      map.setView(validPoints[0], 15);
      initialFittedRef.current = true;
    }
  }, [points, map]);

  return null;
}

// ----------------------------------------------------------------------
// Robust Coordinate Calculation Helpers (Safe against undefined/null)
// ----------------------------------------------------------------------

const interpolateCoordinate = (current, target, progress = 0.09) => {
  if (!current || !target) return current || target;
  const cLat = current.lat != null ? Number(current.lat) : (Array.isArray(current) ? Number(current[0]) : 0);
  const cLng = current.lng != null ? Number(current.lng) : (Array.isArray(current) ? Number(current[1]) : 0);
  const tLat = target.lat != null ? Number(target.lat) : (Array.isArray(target) ? Number(target[0]) : 0);
  const tLng = target.lng != null ? Number(target.lng) : (Array.isArray(target) ? Number(target[1]) : 0);
  return {
    lat: cLat + (tLat - cLat) * progress,
    lng: cLng + (tLng - cLng) * progress,
  };
};

const getDistance = (p1, p2) => {
  if (!p1 || !p2) return Infinity;
  const lat1 = p1.lat != null ? Number(p1.lat) : (Array.isArray(p1) ? Number(p1[0]) : null);
  const lng1 = p1.lng != null ? Number(p1.lng) : (Array.isArray(p1) ? Number(p1[1]) : null);
  const lat2 = p2.lat != null ? Number(p2.lat) : (Array.isArray(p2) ? Number(p2[0]) : null);
  const lng2 = p2.lng != null ? Number(p2.lng) : (Array.isArray(p2) ? Number(p2[1]) : null);
  if (lat1 == null || lng1 == null || lat2 == null || lng2 == null || isNaN(lat1) || isNaN(lng1) || isNaN(lat2) || isNaN(lng2)) {
    return Infinity;
  }
  return Math.hypot(lat2 - lat1, lng2 - lng1);
};

/**
 * Calculates dynamic real-world distance in km from coordinates
 */
const calculateKmDistance = (p1, p2) => {
  if (!p1 || !p2) return null;
  const lat1 = Array.isArray(p1) ? Number(p1[0]) : Number(p1.lat);
  const lon1 = Array.isArray(p1) ? Number(p1[1]) : Number(p1.lng);
  const lat2 = Array.isArray(p2) ? Number(p2[0]) : Number(p2.lat);
  const lon2 = Array.isArray(p2) ? Number(p2[1]) : Number(p2.lng);
  if (isNaN(lat1) || isNaN(lon1) || isNaN(lat2) || isNaN(lon2)) return null;

  const R = 6371; // Earth's mean radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;

  if (d < 0.05) return 'Arrived';
  return `${d.toFixed(1)} km away`;
};

// ----------------------------------------------------------------------
// Main OrderTracking Component
// ----------------------------------------------------------------------

export default function OrderTracking() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentOrder, loading, error } = useSelector((state) => state.order);

  // Live rider position state for smooth, real-time UI rendering
  const [liveRiderCoords, setLiveRiderCoords] = useState(null);
  const [hasRiderArrived, setHasRiderArrived] = useState(false);

  // Simulation control refs to prevent duplicate loops & keep position fresh across renders
  const simulationTimerRef = useRef(null);
  const isSimulatingRef = useRef(false);
  const currentPosRef = useRef(null);
  const hasCompletedRef = useRef(false);

  // 1. Initial Order Fetch & Polling (every 8s unless delivered)
  useEffect(() => {
    if (id && id !== 'undefined' && id !== 'null') {
      dispatch(fetchOrderById(id));
      const interval = setInterval(() => {
        if (currentOrder?.status !== 'delivered') {
          dispatch(fetchOrderById(id));
        }
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [dispatch, id, currentOrder?.status]);

  const status = currentOrder?.status || 'placed';

  // Synchronize completion ref if order is already delivered in backend
  useEffect(() => {
    if (status === 'delivered') {
      hasCompletedRef.current = true;
      setHasRiderArrived(true);
    }
  }, [status]);

  // Delivery completion handler
  const handleDeliveryCompletion = async (destination) => {
    if (hasCompletedRef.current) return;
    hasCompletedRef.current = true;

    // 1. Stop simulation loop
    if (simulationTimerRef.current) {
      clearInterval(simulationTimerRef.current);
      simulationTimerRef.current = null;
    }
    isSimulatingRef.current = false;

    // 2. Snap rider location to destination
    currentPosRef.current = destination;
    setLiveRiderCoords([destination.lat, destination.lng]);
    setHasRiderArrived(true);

    // 3. Persist final location & order status to backend
    try {
      await orderService.updateRiderLocation({
        id,
        riderLocation: destination,
      });
      await orderService.updateOrderStatus({
        id,
        status: 'delivered',
      });
      // 4. Refresh Redux state
      dispatch(fetchOrderById(id));
    } catch (err) {
      console.warn('Failed to complete order delivery on server:', err);
    }
  };

  // 2. Simulated Rider Movement
  useEffect(() => {
    // If order is already delivered, do NOT start simulation
    if (status === 'delivered') {
      if (simulationTimerRef.current) {
        clearInterval(simulationTimerRef.current);
        simulationTimerRef.current = null;
      }
      isSimulatingRef.current = false;
      setHasRiderArrived(true);
      return;
    }

    // Only run simulation when order status is "out_for_delivery"
    if (status !== 'out_for_delivery' || !id) {
      if (simulationTimerRef.current) {
        clearInterval(simulationTimerRef.current);
        simulationTimerRef.current = null;
      }
      isSimulatingRef.current = false;
      return;
    }

    // Destination: customer delivery location
    const destLat = currentOrder?.deliveryLocation?.lat;
    const destLng = currentOrder?.deliveryLocation?.lng;

    // Starting point: riderLocation if available, else restaurantLocation or restaurant coordinates
    const startLat =
      currentOrder?.riderLocation?.lat ??
      currentOrder?.restaurantLocation?.lat ??
      currentOrder?.restaurant?.coordinates?.lat;

    const startLng =
      currentOrder?.riderLocation?.lng ??
      currentOrder?.restaurantLocation?.lng ??
      currentOrder?.restaurant?.coordinates?.lng;

    // Gracefully exit if required coordinates are missing
    if (destLat == null || destLng == null || startLat == null || startLng == null) {
      return;
    }

    const destination = { lat: Number(destLat), lng: Number(destLng) };

    // Initialize position ref if not set yet
    if (!currentPosRef.current) {
      currentPosRef.current = { lat: Number(startLat), lng: Number(startLng) };
      setLiveRiderCoords([Number(startLat), Number(startLng)]);
    }

    // Check if rider already reached destination
    const remainingDistance = getDistance(currentPosRef.current, destination);
    if (remainingDistance < 0.00045) {
      handleDeliveryCompletion(destination);
      return;
    }

    // Start simulation loop if not already running
    if (!isSimulatingRef.current) {
      isSimulatingRef.current = true;

      simulationTimerRef.current = setInterval(async () => {
        if (!currentPosRef.current) return;

        const cur = currentPosRef.current;
        const dist = getDistance(cur, destination);

        // Within ~50 meters of destination: trigger completion
        if (dist < 0.00045) {
          handleDeliveryCompletion(destination);
          return;
        }

        // Interpolate gradual intermediate position (approx 9% of remaining distance each tick)
        const nextPos = interpolateCoordinate(cur, destination, 0.09);
        currentPosRef.current = nextPos;

        // 1. Immediately update UI state so rider marker advances smoothly
        setLiveRiderCoords([nextPos.lat, nextPos.lng]);

        // 2. Persist new coordinate to backend PATCH /api/orders/:id/location
        try {
          await orderService.updateRiderLocation({
            id,
            riderLocation: nextPos,
          });
        } catch (err) {
          console.warn('Failed to sync rider location to server:', err);
        }
      }, 3500); // 3.5s interval
    }

    // Cleanup interval on unmount or status change
    return () => {
      if (simulationTimerRef.current) {
        clearInterval(simulationTimerRef.current);
        simulationTimerRef.current = null;
      }
      isSimulatingRef.current = false;
    };
  }, [id, status, currentOrder?.deliveryLocation, currentOrder?.riderLocation, currentOrder?.restaurantLocation]);

  // 3. Status Index & Progress Steps
  const getStepIndex = (st) => {
    switch (st) {
      case 'placed':
        return 0;
      case 'preparing':
        return 1;
      case 'out_for_delivery':
        return 2;
      case 'delivered':
        return 3;
      default:
        return 0;
    }
  };

  const activeStepIdx = getStepIndex(status);

  const progressSteps = [
    { title: 'Order placed', desc: 'Ticket sent to kitchen' },
    { title: 'Restaurant preparing', desc: 'Freshly cooking your food' },
    { title: 'Rider on the way', desc: 'In transit to your doorstep' },
    { title: 'Delivered', desc: 'Enjoy your hot meal!' },
  ];

  // 4. Safely Extract Coordinates
  const restaurantCoords =
    currentOrder?.restaurant?.coordinates?.lat != null && currentOrder?.restaurant?.coordinates?.lng != null
      ? [Number(currentOrder.restaurant.coordinates.lat), Number(currentOrder.restaurant.coordinates.lng)]
      : currentOrder?.restaurantLocation?.lat != null && currentOrder?.restaurantLocation?.lng != null
      ? [Number(currentOrder.restaurantLocation.lat), Number(currentOrder.restaurantLocation.lng)]
      : null;

  const customerCoords =
    currentOrder?.deliveryLocation?.lat != null && currentOrder?.deliveryLocation?.lng != null
      ? [Number(currentOrder.deliveryLocation.lat), Number(currentOrder.deliveryLocation.lng)]
      : null;

  const initialRiderCoords =
    status === 'delivered' && customerCoords
      ? customerCoords
      : currentOrder?.riderLocation?.lat != null && currentOrder?.riderLocation?.lng != null
      ? [Number(currentOrder.riderLocation.lat), Number(currentOrder.riderLocation.lng)]
      : restaurantCoords;

  const activeRiderCoords = liveRiderCoords || initialRiderCoords;

  const hasAnyCoords = Boolean(restaurantCoords || customerCoords || activeRiderCoords);
  const mapCenter = activeRiderCoords || customerCoords || restaurantCoords || [23.2599, 77.4126];
  const allMarkerBounds = [restaurantCoords, activeRiderCoords, customerCoords].filter(Boolean);

  // 5. Derived Presentation Data
  const shortOrderId = id ? id.slice(-6).toUpperCase() : '------';
  const restaurantName = currentOrder?.restaurant?.name || 'Kitchen Partner';
  const restaurantImage = currentOrder?.restaurant?.image;
  const restaurantLocation = currentOrder?.restaurant?.location || 'Local Kitchen';

  const riderName = currentOrder?.rider?.name || 'Rahul Sharma';
  const riderVehicle = currentOrder?.rider?.vehicle || 'Delivery Bike';
  const riderVehicleNum = currentOrder?.rider?.vehicleNumber || 'MP04-AB-1234';
  const riderPhone = currentOrder?.rider?.phone || '+91 98765 43210';

  const etaText =
    status === 'delivered'
      ? 'Delivered'
      : hasRiderArrived
      ? 'Arrived'
      : status === 'out_for_delivery'
      ? '10–15 min'
      : status === 'preparing'
      ? '20–25 min'
      : '25–35 min';

  // Dynamic distance calculation
  const distanceText = status === 'delivered' ? null : calculateKmDistance(activeRiderCoords, customerCoords);

  // Subtotal & Fee calculation
  const itemsSubtotal = (currentOrder?.items || []).reduce(
    (sum, item) => sum + (item.price || item.menuItem?.price || 0) * (item.quantity || 1),
    0
  );
  const deliveryFee = currentOrder?.totalAmount > itemsSubtotal ? currentOrder.totalAmount - itemsSubtotal : 0;

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-fooddash-charcoal selection:bg-primary selection:text-white">
      <Navbar />

      <main className="flex-1 w-full max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7">
        {/* ========================================================
            LOADING STATE SKELETON
            ======================================================== */}
        {loading && !currentOrder && (
          <div className="space-y-6 animate-pulse">
            <div className="flex justify-between items-center pb-5 border-b border-[#EAE5DC]">
              <div className="space-y-2">
                <div className="h-7 w-52 bg-stone-200/80 rounded-xl" />
                <div className="h-4 w-40 bg-stone-200/60 rounded-lg" />
              </div>
              <div className="h-9 w-24 bg-stone-200/60 rounded-xl" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 space-y-4">
                <div className="h-[440px] w-full bg-stone-200/70 rounded-[26px]" />
                <div className="h-24 w-full bg-stone-200/60 rounded-2xl" />
                <div className="h-28 w-full bg-stone-200/60 rounded-2xl" />
              </div>
              <div className="lg:col-span-4 space-y-4">
                <div className="h-72 w-full bg-stone-200/70 rounded-3xl" />
                <div className="h-28 w-full bg-stone-200/60 rounded-2xl" />
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            ERROR STATE
            ======================================================== */}
        {(error || !id || id === 'undefined' || id === 'null') && !currentOrder && (
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-red-200 text-center max-w-md mx-auto my-12 shadow-sm">
            <div className="w-13 h-13 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-3.5">
              <AlertCircle size={28} />
            </div>
            <h3 className="font-heading text-lg font-extrabold text-fooddash-charcoal mb-1">
              Order Not Found
            </h3>
            <p className="text-xs text-fooddash-muted mb-5 leading-relaxed">
              {error || 'Unable to locate this order. Please verify the ID or check your order history.'}
            </p>
            <Link
              to="/orders"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-primary text-white font-bold text-xs shadow-button hover:bg-primary-dark transition-all"
            >
              Back to My Orders
            </Link>
          </div>
        )}

        {/* ========================================================
            LOADED ORDER TRACKING VIEW
            ======================================================== */}
        {currentOrder && (
          <div className="space-y-5 sm:space-y-6">
            {/* 1. Header (Compact, Minimal Vertical Padding) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 sm:pb-5 border-b border-[#EAE5DC]">
              <div>
                <div className="flex items-center gap-2.5">
                  <h1 className="font-heading text-xl sm:text-2xl font-extrabold text-fooddash-charcoal tracking-tight">
                    Track your order
                  </h1>
                  {status === 'delivered' ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-[10px] font-black tracking-wider uppercase">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      DELIVERED
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-[10px] font-black tracking-wider uppercase">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      LIVE
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-fooddash-muted font-medium mt-0.5">
                  Your order from{' '}
                  <span className="font-bold text-fooddash-charcoal">
                    {restaurantName}
                  </span>{' '}
                  {status === 'delivered' ? 'has been delivered' : 'is on the way'}
                </p>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-center">
                <div className="px-3 py-1.5 rounded-xl bg-white border border-[#EAE5DC] shadow-2xs text-left sm:text-right">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-fooddash-muted block leading-none mb-1">
                    Order ID
                  </span>
                  <span className="font-heading font-black text-xs sm:text-sm text-fooddash-charcoal leading-none">
                    #{shortOrderId}
                  </span>
                </div>
                <Link
                  to="/orders"
                  className="px-3.5 py-2 rounded-xl bg-white hover:bg-stone-50 text-fooddash-charcoal border border-[#EAE5DC] text-xs font-bold transition-all shadow-2xs hover:border-primary/40"
                >
                  My Orders
                </Link>
              </div>
            </div>

            {/* 2-Column Responsive Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
              {/* ====================================================
                  LEFT COLUMN (8 cols): Hero Map, Rider Card, Timeline
                  ==================================================== */}
              <div className="lg:col-span-8 space-y-4 sm:space-y-5">
                {/* 2. Hero Map Card with Floating Live Status */}
                <div className="relative bg-white rounded-[26px] border border-[#EAE5DC] overflow-hidden shadow-[0_4px_20px_rgba(30,20,10,0.04)]">
                  {/* Floating Live Status inside top-left of Map */}
                  <div className="absolute top-3.5 left-3.5 z-[400] bg-white/92 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/80 shadow-[0_4px_16px_rgba(0,0,0,0.08)] flex items-center gap-2.5 pointer-events-none">
                    <span className="relative flex h-2 w-2">
                      {status === 'delivered' ? (
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                      ) : (
                        <>
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                        </>
                      )}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 leading-none">
                        {status === 'delivered' ? 'DELIVERY STATUS' : 'LIVE TRACKING'}
                      </span>
                      <span className="text-xs font-bold text-fooddash-charcoal leading-none mt-1">
                        {status === 'delivered'
                          ? 'Order delivered'
                          : hasRiderArrived
                          ? 'Rider arrived at destination'
                          : status === 'out_for_delivery'
                          ? 'Rider is on the way'
                          : status === 'preparing'
                          ? 'Kitchen preparing order'
                          : 'Order confirmed'}
                      </span>
                    </div>
                  </div>

                  {hasAnyCoords ? (
                    <div className="relative h-[320px] sm:h-[400px] lg:h-[460px] w-full">
                      <MapContainer
                        center={mapCenter}
                        zoom={14}
                        scrollWheelZoom={false}
                        className="h-full w-full z-0"
                      >
                        <TileLayer
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        {/* Fit all active markers dynamically */}
                        <MapBoundsUpdater points={allMarkerBounds} />

                        {/* Traversed Route: Restaurant -> moving Rider (muted slate line) */}
                        {restaurantCoords && activeRiderCoords && (
                          <Polyline
                            positions={[restaurantCoords, activeRiderCoords]}
                            color="#94A3B8"
                            weight={3.5}
                            opacity={0.65}
                          />
                        )}

                        {/* Active Route Ahead: moving Rider -> Customer (FoodDash red/orange highlighted route) */}
                        {activeRiderCoords && customerCoords && status !== 'delivered' && (
                          <Polyline
                            positions={[activeRiderCoords, customerCoords]}
                            color="#E52B23"
                            weight={4.5}
                            opacity={0.95}
                            dashArray="7, 7"
                          />
                        )}

                        {/* Direct fallback Route if no active rider yet */}
                        {!activeRiderCoords && restaurantCoords && customerCoords && (
                          <Polyline
                            positions={[restaurantCoords, customerCoords]}
                            color="#E52B23"
                            weight={4}
                            opacity={0.7}
                            dashArray="7, 7"
                          />
                        )}

                        {/* Restaurant Marker */}
                        {restaurantCoords && (
                          <Marker position={restaurantCoords} icon={restaurantIcon}>
                            <Popup>
                              <div className="text-xs font-sans">
                                <strong className="text-sm font-bold text-gray-900 block">
                                  {restaurantName}
                                </strong>
                                <span className="text-gray-500">
                                  {restaurantLocation}
                                </span>
                              </div>
                            </Popup>
                          </Marker>
                        )}

                        {/* Customer Delivery Marker */}
                        {customerCoords && (
                          <Marker position={customerCoords} icon={customerIcon}>
                            <Popup>
                              <div className="text-xs font-sans">
                                <strong className="text-sm font-bold text-emerald-800 block">
                                  Delivery Address
                                </strong>
                                <span className="text-gray-600">
                                  {currentOrder.deliveryAddress}
                                </span>
                              </div>
                            </Popup>
                          </Marker>
                        )}

                        {/* Moving Rider Marker */}
                        {activeRiderCoords && (
                          <Marker position={activeRiderCoords} icon={riderIcon}>
                            <Popup>
                              <div className="text-xs font-sans">
                                <strong className="text-sm font-bold text-blue-900 block">
                                  {riderName}
                                </strong>
                                <span className="text-gray-600 block">
                                  {riderVehicle} • {riderVehicleNum}
                                </span>
                                <span className="text-[11px] text-blue-600 font-bold mt-0.5 block">
                                  {status === 'delivered' || hasRiderArrived
                                    ? 'Arrived at your door'
                                    : 'On the way'}
                                </span>
                              </div>
                            </Popup>
                          </Marker>
                        )}
                      </MapContainer>
                    </div>
                  ) : (
                    <div className="relative h-64 sm:h-72 bg-stone-50 border-b border-[#EAE5DC] flex items-center justify-center text-center p-6">
                      <div className="flex flex-col items-center gap-2 max-w-sm">
                        <div className="w-12 h-12 rounded-2xl bg-primary-soft text-primary flex items-center justify-center">
                          <MapPin size={24} />
                        </div>
                        <span className="text-sm font-bold text-fooddash-charcoal">
                          Live location is currently unavailable.
                        </span>
                        <span className="text-xs text-fooddash-muted leading-relaxed">
                          Your order has been confirmed. Map tracking will appear as soon as GPS coordinates are broadcast.
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. Compact Rider Information Card - Positioned Directly Underneath Map */}
                <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#EAE5DC] p-4 sm:p-5 shadow-[0_2px_12px_rgba(30,20,10,0.03)] hover:shadow-sm transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    {/* Rider Identity */}
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center text-2xl shrink-0 shadow-2xs">
                        🚴
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-heading font-extrabold text-base text-fooddash-charcoal leading-tight">
                            {riderName}
                          </h4>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200/60 px-2 py-0.5 rounded-full">
                            Delivery Partner
                          </span>
                        </div>
                        <p className="text-xs text-fooddash-muted font-medium mt-0.5">
                          {riderVehicle} {riderVehicleNum ? `• ${riderVehicleNum}` : ''}
                        </p>
                      </div>
                    </div>

                    {/* Live Status, Dynamic Distance & ETA */}
                    <div className="flex flex-wrap items-center justify-between sm:justify-end gap-3 sm:gap-5 border-t sm:border-t-0 pt-3 sm:pt-0 border-stone-100">
                      <div className="flex flex-col sm:items-end">
                        <div className="flex items-center gap-1.5">
                          <span className="relative flex h-2 w-2">
                            {status === 'delivered' ? (
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
                            ) : (
                              <>
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
                              </>
                            )}
                          </span>
                          <span className="text-xs font-bold text-fooddash-charcoal">
                            {status === 'delivered'
                              ? 'Delivery completed'
                              : hasRiderArrived
                              ? 'Arrived at location'
                              : status === 'out_for_delivery'
                              ? 'On the way'
                              : status === 'preparing'
                              ? 'Preparing food'
                              : 'Order placed'}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 mt-0.5 text-xs">
                          {status === 'delivered' ? (
                            <span className="text-fooddash-muted font-medium">
                              Arrived
                            </span>
                          ) : distanceText ? (
                            <>
                              <span className="text-fooddash-muted font-medium">
                                {distanceText}
                              </span>
                              <span className="text-stone-300">•</span>
                            </>
                          ) : null}
                          <span className="font-extrabold text-primary">
                            {status === 'delivered' ? 'Delivered' : `ETA ${etaText}`}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subtle Delivery Completion Card (Shown when status is delivered) */}
                {status === 'delivered' && (
                  <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-2xs flex items-start gap-3.5 animate-fadeIn">
                    <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-xs">
                      ✓
                    </div>
                    <div className="flex-1">
                      <h4 className="font-heading font-extrabold text-sm sm:text-base text-emerald-950 leading-tight">
                        Delivery completed
                      </h4>
                      <p className="text-xs text-emerald-800 font-medium mt-0.5 leading-relaxed">
                        Your order has arrived safely. Enjoy your meal!
                      </p>
                    </div>
                  </div>
                )}

                {/* 4. Live Delivery Status Timeline */}
                <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#EAE5DC] p-4 sm:p-5 shadow-[0_2px_12px_rgba(30,20,10,0.03)] space-y-3.5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading text-xs font-extrabold uppercase tracking-wider text-fooddash-charcoal">
                      Order Status Timeline
                    </h3>
                    <span className="text-xs text-primary font-bold">
                      {status === 'delivered' ? 'All 4 steps completed' : `Step ${activeStepIdx + 1} of 4`}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {progressSteps.map((step, idx) => {
                      const isDone = idx < activeStepIdx || status === 'delivered';
                      const isCurrent = idx === activeStepIdx && status !== 'delivered';

                      return (
                        <div
                          key={idx}
                          className={`relative p-3 rounded-2xl border transition-all ${
                            isCurrent
                              ? 'bg-red-50/70 border-primary shadow-xs ring-1 ring-primary/20'
                              : isDone
                              ? 'bg-emerald-50/50 border-emerald-200/80 text-emerald-950'
                              : 'bg-stone-50/50 border-stone-200/60 text-stone-400 opacity-60'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <div
                              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${
                                isCurrent
                                  ? 'bg-primary text-white shadow-xs'
                                  : isDone
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-stone-200 text-stone-500'
                              }`}
                            >
                              {isDone ? '✓' : idx + 1}
                            </div>
                            <span
                              className={`text-xs font-extrabold leading-tight ${
                                isCurrent
                                  ? 'text-primary'
                                  : isDone
                                  ? 'text-emerald-900'
                                  : 'text-stone-600'
                              }`}
                            >
                              {step.title}
                            </span>
                          </div>
                          <span className="text-[11px] text-fooddash-muted block leading-snug pl-7">
                            {step.desc}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* ====================================================
                  RIGHT COLUMN (4 cols): Order Summary, Delivering to
                  ==================================================== */}
              <div className="lg:col-span-4 space-y-4 sm:space-y-5">
                {/* Structured Order Summary Card */}
                <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#EAE5DC] p-5 shadow-[0_2px_12px_rgba(30,20,10,0.03)] space-y-4">
                  {/* ORDERED FROM Section */}
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-fooddash-muted block mb-2.5">
                      ORDERED FROM
                    </span>
                    <div className="flex items-center gap-3">
                      {restaurantImage ? (
                        <img
                          src={restaurantImage}
                          alt={restaurantName}
                          className="w-11 h-11 rounded-2xl object-cover border border-[#EAE5DC] shrink-0"
                        />
                      ) : (
                        <div className="w-11 h-11 rounded-2xl bg-primary-soft text-primary flex items-center justify-center font-bold text-lg shrink-0">
                          <Store size={20} />
                        </div>
                      )}
                      <div className="truncate">
                        <h4 className="font-heading font-extrabold text-sm sm:text-base text-fooddash-charcoal truncate leading-tight">
                          {restaurantName}
                        </h4>
                        <p className="text-xs text-fooddash-muted truncate mt-0.5">
                          {restaurantLocation}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-[#F0EBE1]" />

                  {/* ITEMS Section */}
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-fooddash-muted block mb-2">
                      ITEMS
                    </span>
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                      {(currentOrder.items || []).map((item, idx) => {
                        const itemPrice = item.price || item.menuItem?.price || 0;
                        const qty = item.quantity || 1;
                        return (
                          <div key={idx} className="flex items-center justify-between text-xs py-1">
                            <div className="flex items-center gap-2 truncate pr-2">
                              <span className="font-bold text-primary shrink-0">
                                {qty} ×
                              </span>
                              <span className="font-semibold text-fooddash-charcoal truncate">
                                {item.menuItem?.name || item.name || 'Dish'}
                              </span>
                            </div>
                            <span className="font-bold text-fooddash-charcoal shrink-0">
                              ₹{itemPrice * qty}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-[#F0EBE1]" />

                  {/* BILL DETAILS Section */}
                  <div className="space-y-2 text-xs">
                    <span className="text-[10px] font-black uppercase tracking-wider text-fooddash-muted block mb-1">
                      BILL DETAILS
                    </span>
                    <div className="flex items-center justify-between text-fooddash-muted">
                      <span>Items subtotal</span>
                      <span className="font-bold text-fooddash-charcoal">₹{itemsSubtotal}</span>
                    </div>
                    <div className="flex items-center justify-between text-fooddash-muted">
                      <span>Delivery fee</span>
                      <span className="font-bold text-emerald-600">
                        {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-fooddash-muted">
                      <span>Payment method</span>
                      <span className="font-bold text-fooddash-charcoal">
                        {currentOrder.paymentMethod || 'UPI'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-fooddash-muted">
                      <span>Payment status</span>
                      <span className="font-bold text-emerald-600 capitalize">
                        {currentOrder.payment?.status || 'Paid'}
                      </span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-[#EAE5DC]" />

                  {/* TOTAL Section - Strongest Element */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="font-heading font-black text-xs uppercase tracking-wider text-fooddash-charcoal">
                      TOTAL
                    </span>
                    <span className="font-heading font-black text-2xl text-primary leading-none">
                      ₹{currentOrder.totalAmount}
                    </span>
                  </div>
                </div>

                {/* Delivering To Card */}
                <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#EAE5DC] p-4 sm:p-5 shadow-[0_2px_12px_rgba(30,20,10,0.03)] space-y-2">
                  <div className="flex items-center gap-2 text-fooddash-muted">
                    <Home size={15} className="text-emerald-600 shrink-0" />
                    <span className="text-[10px] font-black uppercase tracking-wider text-fooddash-charcoal">
                      DELIVERING TO
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-fooddash-charcoal leading-relaxed pl-5">
                    {currentOrder.deliveryAddress || 'Your delivery address'}
                  </p>
                  <div className="flex items-center gap-1.5 pl-5 pt-0.5 text-[11px] font-bold text-emerald-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Delivery location confirmed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
