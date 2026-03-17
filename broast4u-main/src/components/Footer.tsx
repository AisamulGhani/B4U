import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const whatsappNumber = "923331351602";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hi%20B4U!%20I'd%20like%20to%20place%20an%20order.`;

  return (
    <footer id="contact-section" className="bg-foreground text-background">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="font-display text-3xl tracking-wide mb-1">
              <span className="text-primary">B4U</span>
            </h3>
            <p className="text-background/60 text-xs uppercase tracking-widest mb-4 font-body">Broast For You</p>
            <p className="text-background/70 mb-6 text-sm leading-relaxed">
              Karachi's beloved fast-food spot. Fresh ingredients, crispy broast, affordable prices — since day one.
            </p>
            <div className="flex gap-3 mt-4">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg tracking-wide mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2 text-sm text-background/70">
              {[
                { label: "Home", path: "/" },
                { label: "Menu", path: "/menu" },
                { label: "About Us", path: "/about" },
                { label: "Contact", path: "/contact" },
                { label: "Privacy Policy", path: "/privacy" },
                { label: "Terms & Conditions", path: "/terms" },
              ].map((l) => (
                <Link key={l.path} to={l.path} className="hover:text-primary transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-lg tracking-wide mb-4">Contact Us</h4>
            <div className="space-y-3 text-sm text-background/70">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span>Usman Gardens, Broast4U, Karachi, 75300</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>0333-1351602</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>hello@broast4u.pk</span>
              </div>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[hsl(142,70%,35%)] text-white text-sm font-semibold hover:brightness-110 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              Order on WhatsApp
            </a>
          </div>

          {/* Map */}
          <div>
            <h4 className="font-display text-lg tracking-wide mb-4">Find Us</h4>
            <div className="w-full h-44 rounded-xl overflow-hidden border border-background/20">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.5!2d67.1!3d24.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb339c78ec178ff%3A0xd57b15af859e3593!2sBroast%204%20U!5e0!3m2!1sen!2s!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="B4U Location"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-background/10 py-4">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-background/40">
          <p>© 2026 Broast 4 U (B4U). All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-background/70 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-background/70 transition-colors">Terms & Conditions</Link>
          </div>
          <p>Made by <span className="text-background/60 font-medium">Aisam ul Ghani</span></p>
        </div>
      </div>

      <div className="border-t border-background/10 py-3 bg-background/5">
        <div className="container text-center text-xs text-background/50">
          <p>Wanna buy websites like this? Contact <a href="tel:03702993613" className="text-primary hover:underline font-medium">0370-2993613</a> or <a href="mailto:aisampro6@gmail.com" className="text-primary hover:underline font-medium">aisampro6@gmail.com</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
