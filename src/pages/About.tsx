import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartPanel from "@/components/CartPanel";
import { UtensilsCrossed, Heart, Leaf, DollarSign } from "lucide-react";

const values = [
  { icon: UtensilsCrossed, title: "Family Recipes", desc: "Recipes passed down through generations, made with love and care in every bite." },
  { icon: Leaf, title: "Fresh Ingredients", desc: "We source the freshest ingredients daily — no compromises, no shortcuts." },
  { icon: DollarSign, title: "Affordable Prices", desc: "Great food shouldn't break the bank. Enjoy premium taste at family-friendly prices." },
  { icon: Heart, title: "Community First", desc: "Proudly serving the Karachi community with warmth, flavor, and a smile." },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-16 md:py-24">
        <div className="container max-w-4xl">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="section-heading mb-4">Our Story</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Crunchy Bites started as a simple dream — a family-owned fast-food spot where
              every meal feels like home. Born and raised in the heart of Karachi, we set out to
              bring bold, crispy, unforgettable flavors to our neighborhood at prices everyone can enjoy.
            </p>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed mt-4">
              What began as a small kitchen has grown into a beloved community favorite, but our
              values remain the same: fresh ingredients, family recipes, and a commitment to making
              every customer smile. From our signature crispy broast to our loaded zinger burgers,
              every item is made fresh to order — because you deserve nothing less.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <div key={v.title} className="menu-card p-6 animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <v.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-xl tracking-wide mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <CartPanel />
    </div>
  );
};

export default About;
