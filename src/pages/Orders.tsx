import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Package, Clock, CheckCircle2, XCircle, RefreshCw, ChevronDown, ChevronUp } from "lucide-react";

interface OrderItem {
  id: string;
  item_name: string;
  item_category: string;
  item_price: number;
  quantity: number;
  subtotal: number;
}

interface Order {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string | null;
  notes: string | null;
  payment_method: string;
  status: string;
  total_amount: number;
  created_at: string;
  order_items?: OrderItem[];
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  confirmed: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  preparing: "bg-orange-500/10 text-orange-600 border-orange-500/20",
  delivered: "bg-green-500/10 text-green-600 border-green-500/20",
  cancelled: "bg-red-500/10 text-red-600 border-red-500/20",
};

const statusIcons: Record<string, React.ReactNode> = {
  pending: <Clock className="w-3.5 h-3.5" />,
  confirmed: <Package className="w-3.5 h-3.5" />,
  delivered: <CheckCircle2 className="w-3.5 h-3.5" />,
  cancelled: <XCircle className="w-3.5 h-3.5" />,
};

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setOrders(data);
    }
    setLoading(false);
  };

  const fetchItems = async (orderId: string) => {
    if (orders.find(o => o.id === orderId)?.order_items) {
      setExpandedId(expandedId === orderId ? null : orderId);
      return;
    }
    const { data } = await supabase
      .from("order_items")
      .select("*")
      .eq("order_id", orderId);

    if (data) {
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, order_items: data } : o));
    }
    setExpandedId(expandedId === orderId ? null : orderId);
  };

  const updateStatus = async (orderId: string, status: string) => {
    await supabase.from("orders").update({ status }).eq("id", orderId);
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  useEffect(() => { fetchOrders(); }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="bg-foreground text-background py-10 text-center">
        <div className="container">
          <h1 className="font-display text-5xl tracking-wide text-primary mb-2">Orders 📋</h1>
          <p className="text-background/60 text-sm">View and manage all placed orders</p>
        </div>
      </div>

      <main className="py-12">
        <div className="container max-w-4xl">
          <div className="flex justify-between items-center mb-6">
            <p className="text-muted-foreground text-sm">{orders.length} order(s)</p>
            <button onClick={fetchOrders} className="flex items-center gap-1.5 text-sm text-primary hover:underline">
              <RefreshCw className="w-3.5 h-3.5" /> Refresh
            </button>
          </div>

          {loading ? (
            <div className="text-center py-20 text-muted-foreground">Loading orders...</div>
          ) : orders.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <Package className="w-16 h-16 mx-auto mb-4 opacity-20" />
              <h2 className="font-display text-2xl text-foreground mb-2">No orders yet</h2>
              <p className="text-sm">Orders will appear here when customers place them.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map(order => (
                <div key={order.id} className="bg-card border border-border rounded-xl overflow-hidden">
                  <button
                    onClick={() => fetchItems(order.id)}
                    className="w-full p-4 flex items-center gap-4 text-left hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-foreground text-sm">{order.customer_name}</p>
                        <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${statusColors[order.status] || statusColors.pending}`}>
                          {statusIcons[order.status] || statusIcons.pending}
                          {order.status}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {order.customer_phone} • {order.payment_method === "whatsapp" ? "📱 WhatsApp" : "💵 Cash"} • {new Date(order.created_at).toLocaleString()}
                      </p>
                    </div>
                    <p className="font-display text-xl text-primary whitespace-nowrap">Rs {order.total_amount}</p>
                    {expandedId === order.id ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                  </button>

                  {expandedId === order.id && (
                    <div className="border-t border-border p-4 bg-muted/30 animate-fade-in">
                      {order.customer_address && (
                        <p className="text-xs text-muted-foreground mb-2">📍 {order.customer_address}</p>
                      )}
                      {order.notes && (
                        <p className="text-xs text-muted-foreground mb-3">📝 {order.notes}</p>
                      )}

                      {order.order_items ? (
                        <div className="space-y-1 mb-4">
                          {order.order_items.map(item => (
                            <div key={item.id} className="flex justify-between text-xs py-1 border-b border-border/50">
                              <span className="text-foreground">{item.item_name} <span className="text-muted-foreground">x{item.quantity}</span></span>
                              <span className="text-foreground font-medium">Rs {item.subtotal}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-muted-foreground mb-4">Loading items...</p>
                      )}

                      <div className="flex gap-2 flex-wrap">
                        {["pending", "confirmed", "preparing", "delivered", "cancelled"].map(s => (
                          <button
                            key={s}
                            onClick={() => updateStatus(order.id, s)}
                            className={`text-[10px] font-semibold px-3 py-1 rounded-full border transition-all ${
                              order.status === s
                                ? statusColors[s]
                                : "border-border text-muted-foreground hover:border-primary/40"
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Orders;
