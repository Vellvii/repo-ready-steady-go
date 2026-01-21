import { SEO } from "@/components/SEO";
import { PrelaunchFooter } from "@/components/prelaunch/PrelaunchFooter";

const PrivacyPolicy = () => {
  return (
    <>
      <SEO
        title="Privacy Policy | Vellvii"
        description="Vellvii's privacy policy outlines how we collect, use, and protect your personal information."
        canonical="/privacy-policy"
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
              Privacy Policy
            </h1>
            <p className="text-white/60 text-sm">Last updated: January 2026</p>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none space-y-8">
            <section>
              <h2 className="font-baskerville text-2xl text-primary mb-4">1. Introduction</h2>
              <p className="text-white/80 leading-relaxed">
                Vellvii ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website vellvii.com and use our services.
              </p>
            </section>

            <section>
              <h2 className="font-baskerville text-2xl text-primary mb-4">2. Information We Collect</h2>
              <p className="text-white/80 leading-relaxed mb-4">We may collect information about you in various ways:</p>
              <ul className="list-disc list-inside text-white/80 space-y-2">
                <li><strong>Personal Data:</strong> Name, email address, phone number, shipping address, and payment information when you make a purchase or sign up for our mailing list.</li>
                <li><strong>Usage Data:</strong> Information about how you interact with our website, including IP address, browser type, pages visited, and time spent on pages.</li>
                <li><strong>Communications:</strong> Records of correspondence if you contact us directly.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-baskerville text-2xl text-primary mb-4">3. How We Use Your Information</h2>
              <p className="text-white/80 leading-relaxed mb-4">We use the information we collect to:</p>
              <ul className="list-disc list-inside text-white/80 space-y-2">
                <li>Process and fulfill your orders</li>
                <li>Send you updates about your order status</li>
                <li>Communicate with you about products, promotions, and events</li>
                <li>Improve our website and customer experience</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="font-baskerville text-2xl text-primary mb-4">4. Information Sharing</h2>
              <p className="text-white/80 leading-relaxed">
                We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website, conducting our business, or serving you, provided they agree to keep this information confidential.
              </p>
            </section>

            <section>
              <h2 className="font-baskerville text-2xl text-primary mb-4">5. Data Security</h2>
              <p className="text-white/80 leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="font-baskerville text-2xl text-primary mb-4">6. Your Rights</h2>
              <p className="text-white/80 leading-relaxed mb-4">You have the right to:</p>
              <ul className="list-disc list-inside text-white/80 space-y-2">
                <li>Access, correct, or delete your personal information</li>
                <li>Opt out of marketing communications</li>
                <li>Request a copy of the data we hold about you</li>
                <li>Lodge a complaint with a supervisory authority</li>
              </ul>
            </section>

            <section>
              <h2 className="font-baskerville text-2xl text-primary mb-4">7. Cookies</h2>
              <p className="text-white/80 leading-relaxed">
                Our website uses cookies to enhance your browsing experience. Cookies are small files stored on your device that help us understand how you use our site. You can control cookie settings through your browser preferences.
              </p>
            </section>

            <section>
              <h2 className="font-baskerville text-2xl text-primary mb-4">8. Contact Us</h2>
              <p className="text-white/80 leading-relaxed">
                If you have questions about this Privacy Policy or our data practices, please contact us at:
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

export default PrivacyPolicy;
