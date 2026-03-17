import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartPanel from "@/components/CartPanel";
import { useCart } from "@/context/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Minus, X, ShoppingBag, MessageCircle, CheckCircle2, ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type Step = "cart" | "details" | "confirm";

const Cart = () => {
  const { items, updateQuantity, removeItem, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("cart");
  const [form, setForm] = useState({ name: "", phone: "", address: "", notes: "" });
  const payMethod = "cash";
  const [ordered, setOrdered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const deliveryFee = 100;
  const grandTotal = totalPrice + deliveryFee;

  const saveOrderToDb = async () => {
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        customer_name: form.name,
        customer_phone: form.phone,
        customer_address: form.address || null,
        notes: form.notes || null,
        payment_method: payMethod,
        total_amount: grandTotal,
        status: "pending",
      })
      .select()
      .single();

    if (orderError || !order) throw orderError;

    const orderItems = items.map(i => ({
      order_id: order.id,
      item_name: i.name,
      item_category: i.category,
      item_price: i.price,
      quantity: i.quantity,
      subtotal: i.price * i.quantity,
    }));

    const { error: itemsError } = await supabase.from("order_items").insert(orderItems);
    if (itemsError) throw itemsError;

    return order;
  };

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);
    try {
      await saveOrderToDb();

      const lines = items.map(i => `• ${i.name} x${i.quantity} = Rs ${i.price * i.quantity}`).join("\n");
      const msg = encodeURIComponent(
        `🍗 *New Order from B4U Website*\n\n*Name:* ${form.name}\n*Phone:* ${form.phone}\n*Address:* ${form.address}\n\n*Items:*\n${lines}\n\n*Delivery:* Rs 100\n*Total:* Rs ${grandTotal}\n*Payment:* Cash on Delivery\n\n${form.notes ? `*Notes:* ${form.notes}` : ""}`
      );
      window.open(`https://wa.me/923702993613?text=${msg}`, "_blank");

      setOrdered(true);
      clearCart();
    } catch (err) {
      console.error("Order error:", err);
      toast({ title: "Order failed", description: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (ordered) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-24 text-center">
          <div className="container max-w-md">
            <div className="animate-fade-in">
              <CheckCircle2 className="w-20 h-20 text-primary mx-auto mb-6" />
              <h1 className="font-display text-4xl tracking-wide text-foreground mb-3">Order Placed! 🎉</h1>
              <p className="text-muted-foreground text-sm leading-relaxed mb-2">
                Thank you, <strong className="text-foreground">{form.name}</strong>! Your order has been received.
              </p>
              <p className="text-muted-foreground text-sm mb-8">
                We'll confirm via WhatsApp at <strong className="text-foreground">{form.phone}</strong> shortly.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button onClick={() => navigate("/")} className="btn-cart px-8 py-3 rounded-full font-semibold">
                  Back to Home
                </button>
                <button onClick={() => navigate("/menu")} className="px-8 py-3 rounded-full border border-border text-foreground font-semibold hover:bg-muted transition-all">
                  Order Again
                </button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="bg-foreground text-background py-10 text-center">
        <div className="container">
          <h1 className="font-display text-5xl tracking-wide text-primary mb-2">Your Order 🛒</h1>
          <p className="text-background/60 text-sm">Review, add details, and checkout</p>
        </div>
      </div>

      <main className="py-12">
        <div className="container max-w-5xl">

          {/* Progress steps */}
          <div className="flex items-center justify-center gap-2 mb-10">
            {(["cart", "details", "confirm"] as Step[]).map((s, i) => {
              const allSteps: Step[] = ["cart", "details", "confirm"];
              const currentIdx = allSteps.indexOf(step);
              return (
                <div key={s} className="flex items-center gap-2">
                  <div className={`flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full transition-all ${
                    step === s
                      ? "bg-primary text-primary-foreground"
                      : i < currentIdx
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}>
                    <span className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold bg-current/20">{i + 1}</span>
                    {s === "cart" ? "Cart" : s === "details" ? "Details" : "Confirm"}
                  </div>
                  {i < 2 && <div className="w-6 h-px bg-border" />}
                </div>
              );
            })}
          </div>

          {items.length === 0 && !ordered ? (
            <div className="text-center py-20 text-muted-foreground">
              <ShoppingBag className="w-16 h-16 mx-auto mb-4 opacity-20" />
              <h2 className="font-display text-2xl text-foreground mb-2">Your cart is empty</h2>
              <p className="text-sm mb-6">Add some delicious items from our menu!</p>
              <button onClick={() => navigate("/menu")} className="btn-cart px-8 py-3 rounded-full font-semibold">
                Browse Menu
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

              {/* Left: Step content */}
              <div className="lg:col-span-3">

                {/* STEP 1: Cart review */}
                {step === "cart" && (
                  <div className="animate-fade-in">
                    <h2 className="font-display text-2xl tracking-wide mb-5 text-foreground">Review Your Items</h2>
                    <div className="space-y-3">
                      {items.map(item => (
                        <div key={item.id} className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border">
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm text-foreground truncate">{item.name}</p>
                            <p className="text-xs text-muted-foreground">{item.category}</p>
                            <p className="text-primary font-display text-lg">Rs {item.price * item.quantity}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 rounded-full bg-muted border border-border flex items-center justify-center hover:bg-primary/10 transition-colors">
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center font-semibold text-sm">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 rounded-full bg-muted border border-border flex items-center justify-center hover:bg-primary/10 transition-colors">
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive transition-colors p-1">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-3 mt-6">
                      <button onClick={() => navigate("/menu")} className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-border text-muted-foreground hover:text-foreground transition-all text-sm">
                        <ArrowLeft className="w-4 h-4" /> Add More
                      </button>
                      <button onClick={() => setStep("details")} className="flex-1 btn-cart py-2.5 rounded-xl font-semibold">
                        Continue to Details →
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: Customer details */}
                {step === "details" && (
                  <div className="animate-fade-in">
                    <h2 className="font-display text-2xl tracking-wide mb-5 text-foreground">Delivery Details</h2>
                    <form
                      onSubmit={e => { e.preventDefault(); setStep("confirm"); }}
                      className="space-y-4"
                    >
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Full Name *</label>
                        <input
                          required
                          type="text"
                          placeholder="Your name"
                          value={form.name}
                          onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Phone / WhatsApp *</label>
                        <input
                          required
                          type="tel"
                          placeholder="0300-1234567"
                          value={form.phone}
                          onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Delivery Address</label>
                        <input
                          type="text"
                          placeholder="Street, area, Karachi"
                          value={form.address}
                          onChange={e => setForm(p => ({ ...p, address: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Special Instructions</label>
                        <textarea
                          rows={3}
                          placeholder="Any special requests or notes..."
                          value={form.notes}
                          onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                        />
                      </div>

                      <div className="p-3 bg-primary/5 border border-primary/20 rounded-xl text-sm text-foreground">
                        💵 Payment: <strong>Cash on Delivery</strong>
                      </div>

                      <div className="flex gap-3 pt-2">
                        <button type="button" onClick={() => setStep("cart")} className="px-4 py-2.5 rounded-xl border border-border text-muted-foreground hover:text-foreground transition-all text-sm">
                          ← Back
                        </button>
                        <button type="submit" className="flex-1 btn-cart py-2.5 rounded-xl font-semibold">
                          Review Order →
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* STEP 3: Confirm */}
                {step === "confirm" && (
                  <div className="animate-fade-in">
                    <h2 className="font-display text-2xl tracking-wide mb-5 text-foreground">Confirm Order</h2>

                    <div className="p-4 bg-card rounded-xl border border-border mb-4 space-y-2">
                      <p className="text-sm"><span className="text-muted-foreground">Name:</span> <span className="font-medium text-foreground">{form.name}</span></p>
                      <p className="text-sm"><span className="text-muted-foreground">Phone:</span> <span className="font-medium text-foreground">{form.phone}</span></p>
                      {form.address && <p className="text-sm"><span className="text-muted-foreground">Address:</span> <span className="font-medium text-foreground">{form.address}</span></p>}
                      <p className="text-sm"><span className="text-muted-foreground">Payment:</span> <span className="font-medium text-foreground">💵 Cash on Delivery</span></p>
                      {form.notes && <p className="text-sm"><span className="text-muted-foreground">Notes:</span> <span className="font-medium text-foreground">{form.notes}</span></p>}
                    </div>

                    <div className="space-y-2 mb-4">
                      {items.map(item => (
                        <div key={item.id} className="flex justify-between text-sm py-1.5 border-b border-border">
                          <span className="text-foreground">{item.name} <span className="text-muted-foreground">x{item.quantity}</span></span>
                          <span className="font-medium text-foreground">Rs {item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-3 mt-6">
                      <button onClick={() => setStep("details")} className="px-4 py-2.5 rounded-xl border border-border text-muted-foreground hover:text-foreground transition-all text-sm">
                        ← Back
                      </button>
                      <button
                        onClick={handlePlaceOrder}
                        disabled={isSubmitting}
                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all disabled:opacity-50 btn-cart"
                      >
                        {isSubmitting ? (
                          <><Loader2 className="w-4 h-4 animate-spin" /> Placing Order...</>
                        ) : (
                          <>✅ Place Order</>
                        )}
                      </button>
                    </div>
                  </div>
                )}

              </div>

              {/* Right: Order Summary */}
              <div className="lg:col-span-2">
                <div className="bg-card border border-border rounded-xl p-5 sticky top-24">
                  <h3 className="font-display text-xl tracking-wide text-foreground mb-4">Order Summary</h3>
                  <div className="space-y-2 mb-4">
                    {items.map(item => (
                      <div key={item.id} className="flex justify-between text-xs">
                        <span className="text-muted-foreground truncate flex-1 pr-2">{item.name} ×{item.quantity}</span>
                        <span className="text-foreground font-medium">Rs {item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-border pt-3 space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="text-foreground">Rs {totalPrice}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Delivery</span>
                      <span className="text-foreground">Rs {deliveryFee}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-base border-t border-border pt-2 mt-2">
                      <span className="text-foreground">Total</span>
                      <span className="font-display text-2xl text-primary">Rs {grandTotal}</span>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-lg text-xs text-muted-foreground">
                    📞 To order by phone: <a href="tel:03702993613" className="text-primary font-semibold">0370-2993613</a>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      </main>

      <Footer />
      <CartPanel />
    </div>
  );
};

export default Cart;
