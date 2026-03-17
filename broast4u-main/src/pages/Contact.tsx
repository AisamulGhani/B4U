import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartPanel from "@/components/CartPanel";
import { MapPin, Phone, Mail, MessageCircle, Clock } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: "", phone: "", message: "" });
    setTimeout(() => setSubmitted(false), 4000);
  };

  const whatsappUrl = `https://wa.me/923331351602?text=Hi%20B4U!%20I'd%20like%20to%20place%20an%20order.`;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="bg-foreground text-background py-14 text-center">
        <div className="container">
          <p className="text-background/50 text-xs uppercase tracking-[0.3em] mb-2">Get in Touch</p>
          <h1 className="font-display text-5xl md:text-6xl tracking-wide text-primary mb-3">Contact Us</h1>
          <p className="text-background/70 max-w-md mx-auto text-sm">
            Questions? Orders? Feedback? We'd love to hear from you.
          </p>
        </div>
      </div>

      <main className="py-16">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Info Column */}
            <div>
              <h2 className="font-display text-2xl tracking-wide mb-6 text-foreground">Restaurant Info</h2>

              <div className="space-y-5">
                <div className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">Address</p>
                    <p className="text-muted-foreground text-sm mt-0.5">Usman Gardens, Broast4U<br />Karachi, 75300</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">Phone / WhatsApp</p>
                    <a href="tel:03331351602" className="text-primary text-sm mt-0.5 hover:underline block">0333-1351602</a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">Opening Hours</p>
                    <p className="text-muted-foreground text-sm mt-0.5">Daily: 12:00 PM – 12:00 AM</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">Email</p>
                    <p className="text-muted-foreground text-sm mt-0.5">hello@broast4u.pk</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[hsl(142,70%,35%)] text-white font-semibold hover:brightness-110 transition-all text-sm"
              >
                <MessageCircle className="w-5 h-5" />
                Order on WhatsApp — 0333-1351602
              </a>

              {/* Map Placeholder */}
              <div className="mt-6 w-full h-48 rounded-xl bg-muted flex items-center justify-center border border-border">
                <div className="text-center text-muted-foreground">
                  <MapPin className="w-8 h-8 mx-auto mb-2 text-primary/40" />
                  <p className="text-sm font-medium">Google Maps</p>
                  <p className="text-xs mt-1">Usman Gardens, Karachi</p>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div>
              <h2 className="font-display text-2xl tracking-wide mb-6 text-foreground">Send a Message</h2>

              {submitted ? (
                <div className="p-8 bg-primary/5 border border-primary/20 rounded-xl text-center animate-fade-in">
                  <div className="text-4xl mb-3">✅</div>
                  <h3 className="font-display text-xl text-foreground mb-1">Message Sent!</h3>
                  <p className="text-sm text-muted-foreground">We'll get back to you on WhatsApp shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ali Khan"
                      value={formData.name}
                      onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      placeholder="e.g. 0300-1234567"
                      value={formData.phone}
                      onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Message</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Your question or order details..."
                      value={formData.message}
                      onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                    />
                  </div>
                  <button type="submit" className="btn-cart w-full py-3.5 rounded-xl font-semibold text-sm">
                    Send Message ✉️
                  </button>
                </form>
              )}

              {/* QR Placeholder */}
              <div className="mt-8 p-5 bg-card border border-border rounded-xl text-center">
                <p className="text-sm font-semibold text-foreground mb-3">Scan to Order on WhatsApp</p>
                <div className="w-28 h-28 mx-auto bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                  <div className="text-center text-muted-foreground">
                    <div className="grid grid-cols-3 gap-0.5 w-12 mx-auto">
                      {Array.from({ length: 9 }).map((_, i) => (
                        <div key={i} className={`w-3.5 h-3.5 rounded-sm ${[0,2,6,8,4].includes(i) ? "bg-foreground" : "bg-muted"}`} />
                      ))}
                    </div>
                    <p className="text-[10px] mt-2 text-muted-foreground">QR Code</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">0333-1351602</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <CartPanel />
    </div>
  );
};

export default Contact;
