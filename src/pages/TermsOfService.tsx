import { SEO } from "@/components/SEO";
import { PrelaunchFooter } from "@/components/prelaunch/PrelaunchFooter";

const TermsOfService = () => {
  return (
    <>
      <SEO
        title="Terms of Service | Vellvii"
        description="Read Vellvii's terms of service governing the use of our website and products."
        canonical="/terms-of-service"
      />
      <div className="min-h-screen bg-black">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <a href="/">
              <img
                src="/uploads/Vellvii-full-logo-transparent.png"
                alt="Vellvii"
                className="h-12 mx-auto mb-8"
              />
            </a>
            <h1 className="font-baskerville text-4xl md:text-5xl text-primary mb-4">
              Terms of Service
            </h1>
            <p className="text-white/60 text-sm">Last updated: January 2026</p>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none space-y-8">
            <section>
              <h2 className="font-baskerville text-2xl text-primary mb-4">1. Acceptance of Terms</h2>
              <p className="text-white/80 leading-relaxed">
                By accessing and using the Vellvii website (vellvii.com), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.
              </p>
            </section>

            <section>
              <h2 className="font-baskerville text-2xl text-primary mb-4">2. Age Requirement</h2>
              <p className="text-white/80 leading-relaxed">
                You must be at least 18 years of age to use this website and purchase our products. By using our website, you represent and warrant that you meet this age requirement.
              </p>
            </section>

            <section>
              <h2 className="font-baskerville text-2xl text-primary mb-4">3. Products and Services</h2>
              <p className="text-white/80 leading-relaxed">
                Vellvii offers luxury storage solutions for intimate products. All product descriptions, images, and specifications are provided for informational purposes. We reserve the right to modify product offerings, pricing, and availability without prior notice.
              </p>
            </section>

            <section>
              <h2 className="font-baskerville text-2xl text-primary mb-4">4. Orders and Payment</h2>
              <p className="text-white/80 leading-relaxed mb-4">When placing an order:</p>
              <ul className="list-disc list-inside text-white/80 space-y-2">
                <li>All orders are subject to acceptance and availability</li>
                <li>Prices are displayed in USD unless otherwise indicated</li>
                <li>Payment must be received in full before order processing</li>
                <li>We reserve the right to refuse or cancel any order</li>
              </ul>
            </section>

            <section id="shipping-delivery" className="scroll-mt-28">
              <h2 className="font-baskerville text-2xl text-primary mb-4">5. Shipping and Delivery</h2>
              <p className="text-white/80 leading-relaxed mb-4">
                Vellvii currently ships to the United States only. All shipments are prepared in plain, unbranded packaging with no external reference to the contents or to Vellvii. We are actively working to expand shipping to additional regions.
              </p>
              <ul className="list-disc list-inside text-white/80 space-y-2 mb-4">
                <li><span className="text-white/90">US shipping</span> - flat-rate or calculated at checkout based on destination.</li>
                <li><span className="text-white/90">Discreet packaging</span> - unbranded outer carton, no product imagery, no Vellvii markings on labels.</li>
                <li><span className="text-white/90">Tracked delivery</span> - tracking number issued by email once your order is dispatched.</li>
                <li><span className="text-white/90">In-stock items</span> - dispatched within 1 - 3 business days.</li>
                <li><span className="text-white/90">Pre-order items</span> - dispatched per the estimated ship window shown on each product page.</li>
              </ul>
              <p className="text-white/70 text-sm leading-relaxed">
                For warranty coverage and the registration window, see our{" "}
                <a href="/warranty" className="text-primary hover:underline">warranty policy</a>.
              </p>
            </section>

            <section>
              <h2 className="font-baskerville text-2xl text-primary mb-4">6. Returns and Refunds</h2>
              <p className="text-white/80 leading-relaxed">
                Due to the intimate nature of our products, we accept returns only for unopened, unused items in original packaging within 30 days of delivery. Defective products may be exchanged or refunded at our discretion. Please contact us at hello@vellvii.com for return authorization.
              </p>
            </section>

            <section>
              <h2 className="font-baskerville text-2xl text-primary mb-4">7. Intellectual Property</h2>
              <p className="text-white/80 leading-relaxed">
                All content on this website, including text, graphics, logos, images, and software, is the property of Vellvii and protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.
              </p>
            </section>

            <section>
              <h2 className="font-baskerville text-2xl text-primary mb-4">8. User Conduct</h2>
              <p className="text-white/80 leading-relaxed mb-4">You agree not to:</p>
              <ul className="list-disc list-inside text-white/80 space-y-2">
                <li>Use the website for any unlawful purpose</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with the proper functioning of the website</li>
                <li>Upload malicious code or content</li>
              </ul>
            </section>

            <section>
              <h2 className="font-baskerville text-2xl text-primary mb-4">9. Limitation of Liability</h2>
              <p className="text-white/80 leading-relaxed">
                Vellvii shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our website or products. Our total liability shall not exceed the amount paid for the specific product giving rise to the claim.
              </p>
            </section>

            <section>
              <h2 className="font-baskerville text-2xl text-primary mb-4">10. Changes to Terms</h2>
              <p className="text-white/80 leading-relaxed">
                We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website constitutes acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h2 className="font-baskerville text-2xl text-primary mb-4">11. Contact Information</h2>
              <p className="text-white/80 leading-relaxed">
                For questions regarding these Terms of Service, please contact us at:
              </p>
              <p className="text-primary mt-4">
                <a href="mailto:hello@vellvii.com" className="hover:underline">hello@vellvii.com</a>
              </p>
            </section>
          </div>
        </div>
        <PrelaunchFooter />
      </div>
    </>
  );
};

export default TermsOfService;
