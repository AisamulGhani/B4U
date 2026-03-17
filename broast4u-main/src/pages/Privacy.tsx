import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartPanel from "@/components/CartPanel";

const sections = [
  {
    title: "1. Information We Collect",
    content: "We collect information you voluntarily provide when placing an order or contacting us, such as your name, phone number, and delivery address. We do not collect payment information as all transactions are handled in person or via WhatsApp.",
  },
  {
    title: "2. How We Use Your Information",
    content: "Your information is used solely to process your food orders, respond to inquiries, and improve our service. We do not sell, trade, or transfer your personal information to outside parties.",
  },
  {
    title: "3. WhatsApp Communications",
    content: "When you order via WhatsApp, your conversation is subject to WhatsApp's own privacy policy. We only use the information shared to fulfill your order.",
  },
  {
    title: "4. Cookies",
    content: "Our website may use basic cookies to enhance your browsing experience. These are small files stored on your device. You can disable cookies through your browser settings.",
  },
  {
    title: "5. Data Security",
    content: "We implement reasonable security measures to protect your personal information. However, no method of internet transmission is 100% secure, and we cannot guarantee absolute security.",
  },
  {
    title: "6. Third-Party Links",
    content: "Our website may contain links to third-party sites such as Google Maps or WhatsApp. We are not responsible for the privacy practices of those websites.",
  },
  {
    title: "7. Changes to This Policy",
    content: "We reserve the right to update this Privacy Policy at any time. Updates will be posted on this page with a revised effective date.",
  },
  {
    title: "8. Contact Us",
    content: "If you have any questions about this Privacy Policy, please contact us at hello@broast4u.pk or WhatsApp us at 0333-1351602.",
  },
];

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="bg-foreground text-background py-14 text-center">
        <div className="container">
          <p className="text-background/50 text-xs uppercase tracking-[0.3em] mb-2">Legal</p>
          <h1 className="font-display text-5xl md:text-6xl tracking-wide text-primary mb-3">Privacy Policy</h1>
          <p className="text-background/60 text-sm">Last updated: February 2026</p>
        </div>
      </div>

      <main className="py-16">
        <div className="container max-w-3xl">
          <div className="prose-base space-y-8">
            <div className="p-5 bg-primary/5 border border-primary/20 rounded-xl text-sm text-foreground">
              <strong>Broast 4 U (B4U)</strong> is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information when you visit our website or order from us.
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

export default Privacy;
