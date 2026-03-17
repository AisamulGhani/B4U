import heroImage from "@/assets/hero-food.jpg";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative h-[80vh] min-h-[540px] flex items-center justify-center overflow-hidden">
      <img
        src={heroImage}
        alt="Delicious crispy broast, burgers and fries at Broast 4 U"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0" style={{ background: "var(--hero-overlay)" }} />

      <div className="relative z-10 text-center px-4 max-w-3xl animate-fade-in">
        {/* Food emojis */}
        <div className="flex justify-center gap-3 text-2xl mb-4 opacity-80">
          🍔 🍗 🥪 🍟 🥢
        </div>
        <div className="mb-2">
          <span className="inline-block font-display text-xl tracking-[0.4em] text-primary-foreground/70 uppercase">Broast For You</span>
        </div>
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-display text-primary-foreground tracking-wider mb-4 drop-shadow-lg leading-none">
          B4U
        </h1>
        <p className="text-lg md:text-xl text-primary-foreground/90 font-body mb-2 max-w-xl mx-auto font-medium">
          Freshly Fried. Perfectly Seasoned. Made For You.
        </p>
        <p className="text-sm text-primary-foreground/60 font-body mb-8">
          Usman Gardens, Karachi &nbsp;·&nbsp; 0333-1351602
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => navigate("/menu")}
            className="btn-cart text-base px-8 py-3.5 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all text-lg"
          >
            Order Now 🍗
          </button>
          <button
            onClick={() => navigate("/menu")}
            className="px-8 py-3.5 rounded-full font-semibold text-base text-primary-foreground/90 border-2 border-primary-foreground/30 hover:bg-primary-foreground/10 transition-all"
          >
            View Menu
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
