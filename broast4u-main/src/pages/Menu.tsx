import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartPanel from "@/components/CartPanel";
import MenuItemCard from "@/components/MenuItemCard";
import { menuCategories } from "@/data/menuData";

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [search, setSearch] = useState("");

  const filtered = menuCategories
    .filter(c => activeCategory === "all" || c.id === activeCategory)
    .map(c => ({
      ...c,
      items: c.items.filter(i =>
        search === "" ||
        i.name.toLowerCase().includes(search.toLowerCase()) ||
        i.description.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter(c => c.items.length > 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Page Hero */}
      <div className="bg-foreground text-background py-12 text-center">
        <div className="container">
          <p className="text-background/50 text-xs uppercase tracking-[0.3em] font-body mb-2">Broast 4 U — B4U</p>
          <h1 className="font-display text-5xl md:text-6xl tracking-wide text-primary mb-3">Our Menu 🍽️</h1>
          <p className="text-background/70 max-w-md mx-auto text-sm">
            Fresh ingredients, crispy flavors, unbeatable prices — right here in Karachi.
          </p>
        </div>
      </div>

      <main className="py-12">
        <div className="container">
          {/* Search bar */}
          <div className="max-w-md mx-auto mb-8">
            <input
              type="text"
              placeholder="🔍 Search menu items..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </div>

          {/* Category filter tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                activeCategory === "all"
                  ? "bg-primary text-primary-foreground border-primary shadow-md"
                  : "bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-primary"
              }`}
            >
              🍽️ All Categories
            </button>
            {menuCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground border-primary shadow-md"
                    : "bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-primary"
                }`}
              >
                {cat.emoji} {cat.name}
              </button>
            ))}
          </div>

          {/* Menu categories */}
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <p className="text-4xl mb-3">🤔</p>
              <p className="font-medium">No items found for "{search}"</p>
              <button onClick={() => setSearch("")} className="mt-3 text-sm text-primary underline">Clear search</button>
            </div>
          ) : (
            filtered.map((cat) => (
              <div key={cat.id} className="mb-14">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-4xl">{cat.emoji}</span>
                  <div>
                    <h2 className="font-display text-2xl md:text-3xl tracking-wide text-foreground leading-none">{cat.name}</h2>
                    <p className="text-xs text-muted-foreground mt-0.5">{cat.items.length} item{cat.items.length !== 1 ? "s" : ""}</p>
                  </div>
                  <div className="flex-1 h-px bg-border ml-2" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {cat.items.map((item) => (
                    <MenuItemCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      <Footer />
      <CartPanel />
    </div>
  );
};

export default MenuPage;
