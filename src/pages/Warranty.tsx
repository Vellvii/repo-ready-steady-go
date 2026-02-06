import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { PrelaunchFooter } from "@/components/prelaunch/PrelaunchFooter";
import { ScrollHeader } from "@/components/ScrollHeader";
import { Shield, CheckCircle, XCircle, Mail, AlertTriangle } from "lucide-react";

const Warranty = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title="Lifetime Warranty | Vellvii"
        description="Vellvii offers a lifetime warranty on DOX and LUX luxury storage products. All sales are final with no refunds. Coverage includes manufacturing defects."
        canonical="/warranty"
      />
      
      <ScrollHeader />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground font-baskerville mb-4">
              Lifetime Warranty
            </h1>
            <p className="text-xl text-muted-foreground font-light">
              Our Promise of Lasting Quality
            </p>
          </div>

          {/* Lifetime Warranty Section */}
          <section className="mb-16">
            <div className="bg-card/50 border border-border rounded-2xl p-8 sm:p-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground font-baskerville mb-6">
                DOX & LUX Lifetime Warranty
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Your Vellvii DOX and Vellvii LUX storage products are built to last a lifetime. 
                We stand behind our craftsmanship with a comprehensive lifetime warranty covering 
                manufacturing defects and material failures under normal use.
              </p>

              {/* What's Covered */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-4">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  What's Covered
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    Hinge mechanism failure
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    Fingerprint lock malfunction
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    Leather fading or discoloration under normal use
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    Charging dock issues
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    Velvet lining defects
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    Structural integrity issues
                  </li>
                </ul>
              </div>

              {/* What's NOT Covered */}
              <div>
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-4">
                  <XCircle className="w-5 h-5 text-destructive" />
                  What's NOT Covered
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 mt-2 flex-shrink-0" />
                    Intentional damage or misuse
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 mt-2 flex-shrink-0" />
                    Physical trauma (drops, crushing, forcing open)
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 mt-2 flex-shrink-0" />
                    Damage from improper cleaning products
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 mt-2 flex-shrink-0" />
                    Normal wear and tear from excessive use
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 mt-2 flex-shrink-0" />
                    Modifications or unauthorized repairs
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 mt-2 flex-shrink-0" />
                    Water damage (submerging the product)
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Toy Product Warranty */}
          <section className="mb-16">
            <div className="bg-card/30 border border-border rounded-2xl p-8 sm:p-10">
              <h2 className="text-2xl font-bold text-foreground font-baskerville mb-4">
                Standard Product Warranty
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                The Vellvii Pulse, Vibe, and G-Vibe are covered by a <strong className="text-foreground">standard 1-year warranty</strong> from 
                the date of purchase. This warranty covers manufacturing defects only. For warranty 
                inquiries regarding these products, please contact our support team.
              </p>
            </div>
          </section>

          {/* No Refunds Policy */}
          <section className="mb-16">
            <div className="bg-destructive/5 border border-destructive/20 rounded-2xl p-8 sm:p-10">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-2 rounded-lg bg-destructive/10">
                  <AlertTriangle className="w-6 h-6 text-destructive" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground font-baskerville mb-2">
                    No Refunds Policy
                  </h2>
                  <p className="text-muted-foreground font-medium">
                    All Sales Are Final
                  </p>
                </div>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Due to the intimate nature of our products, <strong className="text-foreground">all sales are final</strong> and 
                  we do not offer refunds under any circumstances.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-destructive/50 mt-2 flex-shrink-0" />
                    Returns are not accepted for any reason
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-destructive/50 mt-2 flex-shrink-0" />
                    Warranty claims result in <strong className="text-foreground">repair or replacement only</strong>, not refunds
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-destructive/50 mt-2 flex-shrink-0" />
                    Defective items will be replaced at Vellvii's discretion
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* How to File a Claim */}
          <section className="mb-16">
            <div className="bg-card/50 border border-border rounded-2xl p-8 sm:p-10">
              <div className="flex items-center gap-3 mb-6">
                <Mail className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground font-baskerville">
                  How to File a Warranty Claim
                </h2>
              </div>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Contact Us</h3>
                    <p className="text-muted-foreground">
                      Email <a href="mailto:hello@vellvii.com" className="text-primary hover:underline">hello@vellvii.com</a> with 
                      your order number and a description of the issue.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Document the Issue</h3>
                    <p className="text-muted-foreground">
                      Include clear photos of the defect or malfunction.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Review Process</h3>
                    <p className="text-muted-foreground">
                      Our team will review your claim within 48 hours.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Resolution</h3>
                    <p className="text-muted-foreground">
                      Receive repair, replacement, or further instructions based on our assessment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Questions */}
          <section className="text-center">
            <p className="text-muted-foreground">
              Have questions about our warranty? Contact us at{" "}
              <a href="mailto:hello@vellvii.com" className="text-primary hover:underline">
                hello@vellvii.com
              </a>
            </p>
          </section>
        </div>
      </main>

      <PrelaunchFooter />
    </div>
  );
};

export default Warranty;
