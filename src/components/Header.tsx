import { useState } from "react";
import { ShoppingCart, Menu, X, User, LogOut, MapPin, Clock, Phone } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Menu", path: "/menu" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const Header = () => {
  const { totalItems, setIsCartOpen } = useCart();
  const { user, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const handleNavClick = (path: string) => {
    setMobileOpen(false);
    navigate(path);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
    <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-1">
          <span className="text-3xl md:text-4xl font-display text-primary tracking-wider">B4U</span>
          <div className="flex flex-col leading-none ml-1">
            <span className="text-[10px] font-body font-semibold text-muted-foreground uppercase tracking-widest">Broast</span>
            <span className="text-[10px] font-body font-semibold text-muted-foreground uppercase tracking-widest">For You</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-medium transition-colors duration-200 text-sm ${
                isActive(link.path)
                  ? "text-primary font-semibold"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <button
              onClick={handleSignOut}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
              title={user.email || ""}
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          ) : (
            <Link
              to="/auth"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Login</span>
            </Link>
          )}

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative btn-cart flex items-center gap-2"
            aria-label="Open cart"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="hidden sm:inline">Cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center font-bold animate-cart-bounce">
                {totalItems}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-border bg-card animate-fade-in">
          <div className="container py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                className={`font-medium transition-colors py-2.5 text-left text-sm ${
                  isActive(link.path)
                    ? "text-primary font-semibold"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </nav>
      )}
    </header>

    {/* Info Bar */}
    <div className="sticky top-16 md:top-20 z-30 bg-muted/80 backdrop-blur-sm border-b border-border">
      <div className="container flex items-center justify-center md:justify-between h-8 text-[10px] md:text-xs text-muted-foreground gap-3 md:gap-4">
        <div className="flex items-center gap-1 shrink-0">
          <MapPin className="w-3 h-3 text-primary hidden sm:block" />
          <a href="https://www.google.com/maps/place/broast+4+u/data=!4m2!3m1!1s0x3eb339c78ec178ff:0xd57b15af859e3593" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
            📍 Johar, Karachi
          </a>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <span>🕐 3 PM – 1 AM</span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <a href="tel:03331351602" className="hover:text-primary transition-colors">📞 0333-1351602</a>
        </div>
      </div>
    </div>
    </>
  );
};

export default Header;
