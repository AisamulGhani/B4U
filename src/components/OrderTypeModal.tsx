import { useState } from "react";
import { useOrderType, DeliveryArea } from "@/context/OrderTypeContext";
import { ShoppingBag, Truck, MapPin } from "lucide-react";

const DELIVERY_AREAS: DeliveryArea[] = ["Block 11", "Block 12", "Block 13", "Block 14", "Block 15"];

const OrderTypeModal = () => {
  const { orderType, isSelected, setOrderType, setDeliveryArea, markSelected } = useOrderType();
  const [step, setStep] = useState<"type" | "area">("type");

  if (isSelected) return null;

  const handlePickup = () => {
    setOrderType("pickup");
    setDeliveryArea(null);
  };

  const handleDelivery = () => {
    setOrderType("delivery");
    setStep("area");
  };

  const handleAreaSelect = (area: DeliveryArea) => {
    setDeliveryArea(area);
    // Mark as fully selected now
    markSelected();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="bg-foreground text-background px-6 py-5 text-center">
          <h2 className="font-display text-3xl tracking-wide">
            <span className="text-primary">B4U</span>
          </h2>
          <p className="text-background/50 text-xs uppercase tracking-[0.3em] mt-1">Broast For You</p>
        </div>

        <div className="p-6">
          {step === "type" ? (
            <>
              <h3 className="font-display text-xl text-center text-foreground mb-1">How would you like your order?</h3>
              <p className="text-muted-foreground text-sm text-center mb-6">Choose an option to continue</p>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={handlePickup}
                  className="flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-border bg-background hover:border-primary hover:bg-primary/5 transition-all group"
                >
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <ShoppingBag className="w-7 h-7 text-primary" />
                  </div>
                  <span className="font-semibold text-foreground text-sm">Pickup</span>
                  <span className="text-xs text-muted-foreground text-center">Come & collect from our restaurant</span>
                </button>

                <button
                  onClick={handleDelivery}
                  className="flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-border bg-background hover:border-primary hover:bg-primary/5 transition-all group"
                >
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Truck className="w-7 h-7 text-primary" />
                  </div>
                  <span className="font-semibold text-foreground text-sm">Delivery</span>
                  <span className="text-xs text-muted-foreground text-center">We deliver to your doorstep</span>
                </button>
              </div>
            </>
          ) : (
            <>
              <button onClick={() => setStep("type")} className="text-sm text-muted-foreground hover:text-foreground mb-3 flex items-center gap-1 transition-colors">
                ← Back
              </button>
              <h3 className="font-display text-xl text-center text-foreground mb-1">Select Your Area</h3>
              <p className="text-muted-foreground text-sm text-center mb-5">Gulistan-e-Johar, Karachi</p>

              <div className="flex flex-col gap-2.5">
                {DELIVERY_AREAS.map((area) => (
                  <button
                    key={area}
                    onClick={() => handleAreaSelect(area)}
                    className="flex items-center gap-3 px-4 py-3.5 rounded-xl border border-border bg-background hover:border-primary hover:bg-primary/5 transition-all text-left group"
                  >
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <MapPin className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">{area}</p>
                      <p className="text-xs text-muted-foreground">Gulistan-e-Johar</p>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderTypeModal;
