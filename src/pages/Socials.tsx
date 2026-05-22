import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { z } from "zod";
import { CheckCircle2, Loader2, ArrowRight, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PrelaunchFooter } from "@/components/prelaunch/PrelaunchFooter";
import { ScrollHeader } from "@/components/ScrollHeader";
import { socialChannels, RedditIcon } from "@/data/socials";
import { presenceSurfaces } from "@/data/presence";
import { supabase } from "@/integrations/supabase/client";
import { pixelLead, pixelSubscribe } from "@/lib/metaPixel";

const REDDIT_URL = "https://www.reddit.com/r/Vellvii/s/ukaPOmsKiP";
const PAGE_URL = "https://vellvii.com/socials";

const emailSchema = z
  .string()
  .trim()
  .email({ message: "Please enter a valid email address." });

const Socials = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }
    setSubmitting(true);
    try {
      const { data, error: fnError } = await supabase.functions.invoke("mailchimp-subscribe", {
        body: { email: result.data, source: "socials_page" },
      });
      if (fnError) {
        const serverMsg = (fnError as any)?.context?.body
          ? (() => {
              try {
                return JSON.parse((fnError as any).context.body)?.error;
              } catch {
                return null;
              }
            })()
          : null;
        setError(serverMsg || fnError.message || "Something went wrong. Please try again.");
      } else if (data?.error) {
        setError(data.error);
      } else {
        pixelLead({ content_name: "socials_page" });
        pixelSubscribe();
        setSubmitted(true);
      }
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const sameAs = [
    ...socialChannels.map((c) => c.href),
    ...presenceSurfaces.map((p) => p.href),
  ];

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Vellvii",
    url: "https://vellvii.com",
    logo: "https://vellvii.com/uploads/Vellvii-full-logo-transparent.png",
    sameAs,
  };

  return (
    <div className="min-h-screen surface-dark text-light-primary">
      <Helmet>
        <title>Follow Vellvii - Socials & Community</title>
        <meta
          name="description"
          content="Follow Vellvii across Instagram, TikTok, YouTube, Reddit and more. Behind the design, launch updates and the r/Vellvii community."
        />
        <link rel="canonical" href={PAGE_URL} />
        <meta property="og:title" content="Follow Vellvii - Socials & Community" />
        <meta
          property="og:description"
          content="Behind the design, launch updates and the r/Vellvii community."
        />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(organizationJsonLd)}</script>
      </Helmet>

      <ScrollHeader />

      <main className="container mx-auto px-4 sm:px-6 pt-20 sm:pt-28 pb-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="font-baskerville italic text-primary/80 text-base sm:text-lg tracking-wide">
            The Art of &lsquo;O&rsquo;
          </p>
          <h1 className="mt-3 font-baskerville text-3xl sm:text-5xl font-bold text-light-primary">
            Follow Vellvii
          </h1>
          <p className="mt-4 font-montserrat text-sm sm:text-base text-light-secondary/85 leading-relaxed">
            Behind the design, launch updates and the r/Vellvii community - one
            place for every channel.
          </p>
          <span className="block w-16 h-px bg-primary/40 mx-auto mt-8" />
        </motion.div>

        {/* Featured: Reddit */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mt-14 sm:mt-20 max-w-3xl mx-auto"
        >
          <div className="relative overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 via-background/0 to-background/0 p-6 sm:p-10">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border border-primary/30 bg-background/60 flex items-center justify-center shrink-0">
                <RedditIcon className="w-9 h-9 sm:w-11 sm:h-11 text-primary" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <p className="font-montserrat text-[0.65rem] uppercase tracking-[0.22em] text-primary/80">
                  New - join the community
                </p>
                <h2 className="mt-2 font-baskerville text-2xl sm:text-3xl text-light-primary">
                  r/Vellvii on Reddit
                </h2>
                <p className="mt-3 font-montserrat text-sm sm:text-base text-light-secondary/85 leading-relaxed">
                  Behind-the-design previews, founder AMAs and early-access drops.
                  The most direct line to the team.
                </p>
                <ul className="mt-4 grid sm:grid-cols-3 gap-2 sm:gap-3 font-montserrat text-xs sm:text-[0.78rem] text-light-secondary/80">
                  <li className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                    Behind-the-design previews
                  </li>
                  <li className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                    Founder AMAs
                  </li>
                  <li className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                    Early-access drops
                  </li>
                </ul>
                <a
                  href={REDDIT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 h-11 px-6 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] text-black rounded-md font-montserrat font-bold text-sm shadow-elegant hover:shadow-glow transition-all duration-500 hover:bg-right"
                >
                  Join r/Vellvii
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Channels grid */}
        <section className="mt-16 sm:mt-24 max-w-5xl mx-auto">
          <div className="text-center mb-8 sm:mb-10">
            <p className="font-montserrat text-[0.65rem] uppercase tracking-[0.22em] text-light-secondary/55">
              Channels
            </p>
            <h2 className="mt-2 font-baskerville text-2xl sm:text-3xl text-light-primary">
              Where to follow us
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {socialChannels.map(({ id, label, handle, href, blurb, Icon }) => (
              <a
                key={id}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-primary/30 p-5 sm:p-6 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg border border-white/10 bg-background/60 flex items-center justify-center group-hover:border-primary/40 transition-colors">
                    <Icon className="w-5 h-5 text-light-secondary/85 group-hover:text-primary transition-colors" />
                  </div>
                  <div className="flex-1">
                    <p className="font-baskerville text-lg text-light-primary leading-none">
                      {label}
                    </p>
                    <p className="font-montserrat text-xs text-light-secondary/60 mt-1">
                      {handle}
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-light-secondary/40 group-hover:text-primary/80 transition-colors" />
                </div>
                <p className="mt-4 font-montserrat text-xs sm:text-sm text-light-secondary/80 leading-relaxed">
                  {blurb}
                </p>
              </a>
            ))}
          </div>
        </section>

        {/* Presence / external surfaces */}
        <section className="mt-20 sm:mt-28 max-w-5xl mx-auto">
          <div className="text-center mb-8 sm:mb-10">
            <p className="font-montserrat text-[0.65rem] uppercase tracking-[0.22em] text-light-secondary/55">
              Elsewhere
            </p>
            <h2 className="mt-2 font-baskerville text-2xl sm:text-3xl text-light-primary">
              Where to find Vellvii
            </h2>
            <p className="mt-3 font-montserrat text-sm text-light-secondary/70 max-w-xl mx-auto">
              Campaign pages, listings and press where Vellvii lives beyond the
              site.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {presenceSurfaces.map(({ id, label, href, blurb, logo }) => (
              <a
                key={id}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-primary/30 p-5 sm:p-6 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-white/95 flex items-center justify-center overflow-hidden shrink-0">
                    <img
                      src={logo}
                      alt={`${label} logo`}
                      className="max-w-[80%] max-h-[80%] object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-baskerville text-lg text-light-primary leading-none">
                      {label}
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-light-secondary/40 group-hover:text-primary/80 transition-colors" />
                </div>
                <p className="mt-4 font-montserrat text-xs sm:text-sm text-light-secondary/80 leading-relaxed">
                  {blurb}
                </p>
              </a>
            ))}
          </div>
        </section>

        {/* Newsletter capture - same edge function as homepage inline waitlist */}
        <section className="mt-20 sm:mt-28 border-t border-white/5 pt-12 sm:pt-16">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-primary font-montserrat text-xs sm:text-sm uppercase tracking-[0.2em] mb-2">
              Be First in Line
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-baskerville font-bold text-light-primary mb-3">
              When the Next Batch Drops
            </h2>
            <p className="text-sm sm:text-base text-light-secondary font-montserrat mb-6 sm:mb-8 leading-relaxed">
              We&apos;ll notify you when DOX, Lux and the rest of the Vellvii
              Collection open for restock - no spam, just the moment it matters.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl border border-primary/40 bg-primary/10"
              >
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span className="font-montserrat text-sm sm:text-base text-light-primary">
                  You&apos;re on the list. We&apos;ll be in touch.
                </span>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 h-12 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-primary"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="h-12 px-6 sm:px-8 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] text-black rounded-md font-montserrat font-bold text-sm shadow-elegant hover:shadow-glow transition-all duration-500 hover:bg-right disabled:opacity-50 flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  {submitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Join the Waitlist"
                  )}
                </button>
              </form>
            )}
            {error && (
              <p className="text-red-400 text-sm mt-3 font-montserrat">{error}</p>
            )}
          </div>
        </section>
      </main>

      <PrelaunchFooter />
    </div>
  );
};

export default Socials;
