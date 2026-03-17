import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import CartPanel from "@/components/CartPanel";
import MenuItemCard from "@/components/MenuItemCard";
import { menuCategories, bestSellers } from "@/data/menuData";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";


const useInView = (threshold = 0.15) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
};

const Index = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(menuCategories[0].id);
  const activeCategory = menuCategories.find(c => c.id === activeTab)!;

  const menuSection = useInView();
  const bestSection = useInView();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />

        {/* ── Explore Menu Section ── */}
        <section ref={menuSection.ref} className={`py-16 md:py-20 bg-background transition-all duration-700 ${menuSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="container">
            <div className="text-center mb-10">
              <h2 className="section-heading">Explore Our Menu</h2>
              <p className="text-muted-foreground mt-2 max-w-md mx-auto text-sm">
                From crispy broast 🍗 to sizzling burgers 🍔 — pick your favorite and dig in
              </p>
            </div>

            {/* Category tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {menuCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                    activeTab === cat.id
                      ? "bg-primary text-primary-foreground border-primary shadow-md"
                      : "bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-primary"
                  }`}
                >
                  {cat.emoji} {cat.name}
                </button>
              ))}
            </div>

            {/* Items grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 animate-fade-in">
              {activeCategory.items.map((item) => (
                <MenuItemCard key={item.id} item={item} />
              ))}
            </div>

            <div className="text-center mt-8">
              <button
                onClick={() => navigate("/menu")}
                className="btn-cart px-8 py-3 rounded-full font-semibold text-sm hover-scale"
              >
                See Full Menu →
              </button>
            </div>
          </div>
        </section>

        {/* ── Best Sellers Section ── */}
        <section ref={bestSection.ref} className={`py-16 bg-muted/40 transition-all duration-700 delay-100 ${bestSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="container">
            <div className="text-center mb-10">
              <span className="badge-category mb-3 inline-flex">⭐ Customer Favorites</span>
              <h2 className="section-heading">Best Sellers</h2>
              <p className="text-muted-foreground mt-2 max-w-md mx-auto text-sm">
                Our most loved dishes — tried, trusted, and always delicious
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {bestSellers.map((item) => (
                <MenuItemCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>


        {/* ── CTA Section ── */}
        <section className="py-16 md:py-20 bg-primary text-primary-foreground">
          <div className="container text-center">
            <h2 className="font-display text-4xl md:text-5xl tracking-wide mb-4">
              Ready to Order? 🍔
            </h2>
            <p className="text-primary-foreground/80 max-w-md mx-auto mb-8 text-sm leading-relaxed">
              Order online, call us, or drop by. Fresh, crispy, made-to-order — every single time.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => navigate("/menu")}
                className="px-8 py-3.5 rounded-full bg-primary-foreground text-primary font-semibold hover:brightness-95 transition-all shadow-lg hover-scale"
              >
                View Full Menu
              </button>
              <a
                href="https://wa.me/923331351602?text=Hi%20B4U!%20I'd%20like%20to%20place%20an%20order."
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-full border-2 border-primary-foreground/40 text-primary-foreground font-semibold hover:bg-primary-foreground/10 transition-all hover-scale"
              >
                Order on WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <CartPanel />
    </div>
  );
};

export default Index;
