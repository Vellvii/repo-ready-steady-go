import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { SEO } from "@/components/SEO";
import { ScrollHeader } from "@/components/ScrollHeader";
import { PrelaunchFooter } from "@/components/prelaunch/PrelaunchFooter";

export interface GuideFAQItem {
  question: string;
  answer: string;
}

export interface GuideLayoutProps {
  seoTitle: string;
  seoDescription: string;
  canonical: string;
  category: string;
  title: string;
  intro: string;
  datePublished?: string;
  dateModified?: string;
  faq: GuideFAQItem[];
  children: ReactNode;
}

export const GuideLayout = ({
  seoTitle,
  seoDescription,
  canonical,
  category,
  title,
  intro,
  datePublished = "2026-05-13",
  dateModified = "2026-05-13",
  faq,
  children,
}: GuideLayoutProps) => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SEO
        title={seoTitle}
        description={seoDescription}
        canonical={canonical}
        type="article"
        faqData={faq}
        articleData={{
          headline: title,
          description: seoDescription,
          datePublished,
          dateModified,
          section: category,
          url: canonical,
        }}
        breadcrumbs={[
          { name: "Guides", url: "/guides" },
          { name: title, url: canonical },
        ]}
      />

      <ScrollHeader />

      <main className="pt-28 sm:pt-32 pb-20">
        <article className="container mx-auto px-5 sm:px-6 max-w-2xl">
          {/* Breadcrumb / back */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <Link
              to="/guides"
              className="inline-flex items-center gap-2 font-montserrat text-xs uppercase tracking-[0.2em] text-light-secondary hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-3 w-3" strokeWidth={1.5} />
              Back to Guides
            </Link>
          </nav>

          {/* Header */}
          <header className="mb-12">
            <p className="font-montserrat text-[0.65rem] uppercase tracking-[0.32em] text-primary/80 mb-4">
              {category}
            </p>
            <h1 className="font-baskerville text-3xl sm:text-4xl md:text-5xl text-light-primary leading-tight mb-6">
              {title}
            </h1>
            <p className="font-montserrat text-base text-light-secondary leading-relaxed">
              {intro}
            </p>
            <span className="block w-16 h-px bg-gradient-to-r from-primary/40 to-transparent mt-8" />
          </header>

          {/* Body */}
          <div className="guide-body font-montserrat text-[0.95rem] text-light-secondary leading-[1.8] space-y-6">
            {children}
          </div>

          {/* FAQ */}
          {faq.length > 0 && (
            <section className="mt-16 pt-10 border-t border-white/10" aria-labelledby="guide-faq">
              <h2
                id="guide-faq"
                className="font-baskerville text-2xl sm:text-3xl text-light-primary mb-8"
              >
                Frequently Asked Questions
              </h2>
              <dl className="space-y-8">
                {faq.map((item) => (
                  <div key={item.question}>
                    <dt className="font-baskerville text-lg text-light-primary mb-2">
                      {item.question}
                    </dt>
                    <dd className="font-montserrat text-sm text-light-secondary leading-relaxed">
                      {item.answer}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {/* Footer nav */}
          <div className="mt-16 pt-10 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <Link
              to="/guides"
              className="inline-flex items-center gap-2 font-montserrat text-xs uppercase tracking-[0.2em] text-light-secondary hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-3 w-3" strokeWidth={1.5} />
              Back to Guides
            </Link>
            <Link
              to="/shop"
              className="font-montserrat text-xs uppercase tracking-[0.2em] text-primary hover:text-primary/80 transition-colors"
            >
              Explore the Shop
            </Link>
          </div>
        </article>
      </main>

      <PrelaunchFooter />
    </div>
  );
};

export default GuideLayout;
