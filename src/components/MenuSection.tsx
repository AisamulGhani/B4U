import { menuCategories } from "@/data/menuData";
import MenuItemCard from "./MenuItemCard";
import { useState } from "react";

const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredCategories = activeCategory === "all"
    ? menuCategories
    : menuCategories.filter((c) => c.id === activeCategory);

  return (
    <section id="menu" className="py-16 md:py-24">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="section-heading">Our Menu</h2>
          <p className="text-muted-foreground mt-2 max-w-md mx-auto">
            From crispy broast to sizzling burgers — pick your favorites and order away
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeCategory === "all" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"}`}
          >
            All
          </button>
          {menuCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeCategory === cat.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"}`}
            >
              {cat.emoji} {cat.name}
            </button>
          ))}
        </div>

        {/* Menu items */}
        {filteredCategories.map((cat) => (
          <div key={cat.id} className="mb-12">
            <h3 className="text-2xl font-display tracking-wide text-foreground mb-6 flex items-center gap-2">
              <span className="text-3xl">{cat.emoji}</span> {cat.name}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {cat.items.map((item) => (
                <MenuItemCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MenuSection;
