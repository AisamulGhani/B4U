import { Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { MenuItem } from "@/data/menuData";
import { useState } from "react";

interface MenuItemCardProps {
  item: MenuItem;
  compact?: boolean;
}

const MenuItemCard = ({ item, compact = false }: MenuItemCardProps) => {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({ id: item.id, name: item.name, price: item.price, category: item.category });
    setAdded(true);
    setTimeout(() => setAdded(false), 600);
  };

  return (
    <div className="menu-card flex flex-col group">
      {/* Food image */}
      <div className="relative h-36 overflow-hidden rounded-t-xl">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />
        {item.badge && (
          <span className="absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-primary text-primary-foreground">
            {item.badge}
          </span>
        )}
      </div>

      <div className={`p-4 flex-1 flex flex-col ${compact ? "p-3" : "p-5"}`}>
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-card-foreground leading-snug text-sm flex-1">{item.name}</h3>
          <span className="font-display text-lg text-primary whitespace-nowrap">Rs {item.price}</span>
        </div>
        {!compact && (
          <p className="text-xs text-muted-foreground mt-1 flex-1 leading-relaxed">{item.description}</p>
        )}
        <button
          onClick={handleAdd}
          className={`mt-3 btn-cart flex items-center justify-center gap-1.5 w-full transition-all text-xs py-2 rounded-lg ${
            added ? "bg-accent text-accent-foreground scale-95" : ""
          }`}
        >
          <Plus className="w-3.5 h-3.5" />
          {added ? "Added! ✓" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default MenuItemCard;
