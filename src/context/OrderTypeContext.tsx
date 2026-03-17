import React, { createContext, useContext, useState } from "react";

export type OrderType = "pickup" | "delivery" | null;
export type DeliveryArea = "Block 11" | "Block 12" | "Block 13" | "Block 14" | "Block 15" | null;

interface OrderTypeContextType {
  orderType: OrderType;
  deliveryArea: DeliveryArea;
  setOrderType: (type: OrderType) => void;
  setDeliveryArea: (area: DeliveryArea) => void;
  isSelected: boolean;
  markSelected: () => void;
  resetSelection: () => void;
}

const OrderTypeContext = createContext<OrderTypeContextType | undefined>(undefined);

export const OrderTypeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orderType, setOrderTypeState] = useState<OrderType>(null);
  const [deliveryArea, setDeliveryArea] = useState<DeliveryArea>(null);
  const [isSelected, setIsSelected] = useState(false);

  const setOrderType = (type: OrderType) => {
    setOrderTypeState(type);
    if (type === "pickup") {
      setIsSelected(true);
    }
  };

  const markSelected = () => setIsSelected(true);

  const resetSelection = () => {
    setOrderTypeState(null);
    setDeliveryArea(null);
    setIsSelected(false);
  };

  return (
    <OrderTypeContext.Provider value={{ orderType, deliveryArea, setOrderType, setDeliveryArea, isSelected, markSelected, resetSelection }}>
      {children}
    </OrderTypeContext.Provider>
  );
};

export const useOrderType = () => {
  const ctx = useContext(OrderTypeContext);
  if (!ctx) throw new Error("useOrderType must be used within OrderTypeProvider");
  return ctx;
};
