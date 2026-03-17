import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartPanel from "@/components/CartPanel";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: "By accessing or using the Broast 4 U (B4U) website, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our website.",
  },
  {
    title: "2. Use of Website",
    content: "This website is provided for informational and ordering purposes only. You agree to use it lawfully and not to engage in any conduct that could harm B4U or other users.",
  },
  {
    title: "3. Menu & Pricing",
    content: "Menu items and prices are subject to change without notice. All prices are listed in Pakistani Rupees (PKR). We strive to keep information accurate but errors may occur.",
  },
  {
    title: "4. Orders",
    content: "Orders placed via WhatsApp or contact form are subject to availability. We reserve the right to cancel or modify any order due to stock unavailability or other circumstances.",
  },
  {
    title: "5. Payment",
    content: "We currently accept cash on delivery and in-person payment only. No online payment is processed through this website. Payment methods are confirmed at the time of order.",
  },
  {
    title: "6. Delivery",
    content: "Delivery availability and timings are at the discretion of Broast 4 U. Delivery charges, if any, will be communicated at the time of order confirmation.",
  },
  {
    title: "7. Refunds & Cancellations",
    content: "Orders may be cancelled prior to preparation. Once cooking has begun, we cannot offer refunds. In case of incorrect or unsatisfactory items, please contact us immediately.",
  },
  {
    title: "8. Intellectual Property",
    content: "All content on this website, including text, graphics, and logos, is the property of Broast 4 U (B4U). Reproduction without written permission is prohibited.",
  },
  {
    title: "9. Limitation of Liability",
    content: "B4U shall not be liable for any indirect, incidental, or consequential damages arising from use of our website or services. Our liability is limited to the value of the order placed.",
  },
  {
    title: "10. Changes to Terms",
    content: "We reserve the right to modify these terms at any time. Continued use of the website after changes constitutes your acceptance of the updated terms.",
  },
  {
    title: "11. Contact",
    content: "For questions about these Terms, contact us at hello@broast4u.pk or WhatsApp: 0333-1351602.",
  },
];

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="bg-foreground text-background py-14 text-center">
        <div className="container">
          <p className="text-background/50 text-xs uppercase tracking-[0.3em] mb-2">Legal</p>
          <h1 className="font-display text-5xl md:text-6xl tracking-wide text-primary mb-3">Terms & Conditions</h1>
          <p className="text-background/60 text-sm">Last updated: February 2026</p>
        </div>
      </div>

      <main className="py-16">
        <div className="container max-w-3xl">
          <div className="space-y-8">
            <div className="p-5 bg-primary/5 border border-primary/20 rounded-xl text-sm text-foreground">
              Please read these Terms and Conditions carefully before using the Broast 4 U website or placing an order. These terms govern your use of our services.
            </div>

            {sections.map((s) => (
              <div key={s.title} className="border-b border-border pb-6">
                <h2 className="font-display text-xl tracking-wide text-foreground mb-3">{s.title}</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.content}</p>
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

export default Terms;
