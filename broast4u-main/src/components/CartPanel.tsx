import { X, Plus, Minus, ShoppingBag, ArrowLeft, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";

const CartPanel = () => {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeItem, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate("/cart");
  };

  return (
    <>
      <div className="fixed inset-0 bg-foreground/40 z-40" onClick={() => setIsCartOpen(false)} />
      <aside className="cart-panel animate-slide-in-right flex flex-col">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="font-display text-2xl tracking-wide flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-primary" /> Your Cart
          </h2>
          <button onClick={() => setIsCartOpen(false)} className="p-1 hover:bg-muted rounded-lg transition-colors" aria-label="Close cart">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="font-medium">Your cart is empty</p>
              <p className="text-sm mt-1">Add some delicious items!</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl border border-border">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate text-foreground">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.category}</p>
                    <p className="text-primary font-display text-lg">Rs {item.price * item.quantity}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted transition-colors">
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center font-semibold text-sm">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted transition-colors">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive transition-colors p-1">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Subtotal</span>
              <span className="font-display text-2xl text-primary">Rs {totalPrice}</span>
            </div>
            <button onClick={handleCheckout} className="btn-cart w-full py-3 text-sm rounded-full font-semibold flex items-center justify-center gap-2">
              <ShoppingCart className="w-4 h-4" /> Proceed to Checkout
            </button>
            <button onClick={() => setIsCartOpen(false)} className="w-full py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

export default CartPanel;
