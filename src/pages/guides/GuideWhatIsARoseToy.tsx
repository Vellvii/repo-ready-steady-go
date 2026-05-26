import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import { Loader2, Mail, ArrowRight } from "lucide-react";
import { GuideLayout } from "@/components/guides/GuideLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const FAQ = [
  {
    question: "What is a rose toy?",
    answer:
      "A rose toy is an intimate wellness product shaped like a small rose. It has become one of the most recognizable categories in modern intimate wellness because of its compact silhouette, discreet form, and design-led aesthetic.",
  },
  {
    question: "What should I look for in a premium rose toy?",
    answer:
      "Look for body-safe materials, a discreet and refined design, easy cleaning, reliable charging, simple controls, and a considered storage solution that protects the product between uses.",
  },
  {
    question: "Is Vellvii releasing a rose toy?",
    answer:
      "Vellvii is currently developing a rose-inspired intimate wellness product designed to fit into the broader Vellvii ecosystem, including compatibility with the Vellvii DOX storage and docking concept. More details will follow as development continues.",
  },
  {
    question: "How do I get notified when the Vellvii rose-inspired product launches?",
    answer:
      "Join the Vellvii mailing list. You will receive launch updates, product availability, restock alerts, and early access announcements as the rose-inspired product moves toward release.",
  },
];

const H2 = "font-baskerville text-2xl sm:text-3xl text-light-primary mt-12 mb-4";

const MailingListCTA = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || loading) return;
    setLoading(true);
    try {
      const { error } = await supabase.functions.invoke("mailchimp-subscribe", {
        body: { email: trimmed, source: "guide_rose_toy" },
      });
      if (error) throw error;
      setSubmitted(true);
    } catch (err) {
      console.error("Rose toy guide subscribe failed", err);
      toast({
        title: "Something went wrong",
        description:
          "We could not save your email just now. Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className="my-12 not-prose">
      <div className="card-dark rounded-2xl border border-primary/20 p-6 sm:p-8 text-center">
        <Mail className="w-5 h-5 text-primary mx-auto mb-3" strokeWidth={1.4} />
        <p className="font-montserrat text-[0.65rem] uppercase tracking-[0.28em] text-primary/80 mb-3">
          Launch Updates
        </p>
        <h3 className="font-baskerville text-2xl sm:text-3xl text-light-primary mb-3">
          Join the Vellvii List
        </h3>
        <p className="font-montserrat text-sm text-light-secondary leading-relaxed max-w-md mx-auto mb-6">
          Want to know when the Vellvii rose-inspired product becomes available?
          Join the Vellvii mailing list for launch updates, product availability,
          restock alerts, and early access announcements.
        </p>
        {submitted ? (
          <p className="font-montserrat text-sm text-primary">
            Thank you - you are on the list. We will be in touch with updates.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <Input
              type="email"
              required
              maxLength={255}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="bg-background/40 border-white/15 text-light-primary placeholder:text-light-muted/60 font-montserrat"
              aria-label="Email address"
              disabled={loading}
            />
            <Button type="submit" className="btn-premium whitespace-nowrap" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving
                </>
              ) : (
                "Join the Vellvii List"
              )}
            </Button>
          </form>
        )}
      </div>
    </aside>
  );
};

const EcosystemCTA = () => (
  <aside className="mt-12 not-prose">
    <div className="card-dark rounded-2xl border border-white/10 p-6 sm:p-8 text-center">
      <p className="font-montserrat text-[0.65rem] uppercase tracking-[0.28em] text-primary/80 mb-3">
        Explore the Vellvii Ecosystem
      </p>
      <h3 className="font-baskerville text-2xl sm:text-3xl text-light-primary mb-4">
        A storage-first approach to intimate wellness
      </h3>
      <p className="font-montserrat text-sm text-light-secondary leading-relaxed max-w-xl mx-auto mb-8">
        While our rose-inspired product is in development, explore the current
        Vellvii collection and discover the storage-first ecosystem designed
        around discretion, care, and refined presentation.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 font-montserrat text-xs uppercase tracking-[0.2em] text-primary border border-primary/40 rounded-md px-6 py-3 hover:bg-primary/10 transition-colors"
        >
          Shop Vellvii
          <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
        </Link>
        <Link
          to="/products/vellvii-lux"
          className="font-montserrat text-xs uppercase tracking-[0.2em] text-light-secondary border border-white/15 rounded-md px-6 py-3 hover:text-primary hover:border-primary/40 transition-colors"
        >
          Explore Vellvii Lux
        </Link>
        <Link
          to="/guides/how-the-vellvii-dox-docking-system-works"
          className="font-montserrat text-xs uppercase tracking-[0.2em] text-light-secondary hover:text-primary transition-colors"
        >
          Learn About DOX Compatibility
        </Link>
      </div>
    </div>
  </aside>
);

const GuideWhatIsARoseToy = () => {
  return (
    <GuideLayout
      seoTitle="What Is a Rose Toy? A Premium Buyer's Guide | Vellvii"
      seoDescription="Learn what a rose toy is, what to look for in a premium design, and how Vellvii is developing a rose-inspired product designed to fit the Vellvii DOX ecosystem."
      canonical="/guides/what-is-a-rose-toy"
      category="Buyer's Guide"
      title="What Is a Rose Toy? A Premium Guide to Design, Storage, and Discretion"
      intro="The rose toy has become one of the most searched intimate wellness categories of the modern era - recognizable by its compact, rose-shaped silhouette and the discretion it invites. This refined buyer's guide explains what a rose toy is, what to look for in a premium one, and how Vellvii is approaching the category with a storage-first design philosophy."
      heroImage="/uploads/vellvii-rose-toy-lux-case.png"
      heroImageAlt="A rose-shaped intimate wellness product paired with a soft pink Vellvii leather case - a tasteful look at how a premium rose toy can be stored and presented"
      faq={FAQ}
    >
      <h2 className={H2}>What is a rose toy?</h2>
      <p>
        A rose toy is an intimate wellness product shaped like a small rose. The
        silhouette is its signature - petals folded around a quiet center, sized
        to sit comfortably in the palm. It is the shape, more than anything
        else, that has turned the rose toy into a category of its own.
      </p>
      <p>
        Beyond the form, the appeal of a rose toy is the same appeal that
        defines premium intimate wellness in general - a product that does not
        announce itself, that lives discreetly within a personal space, and that
        can be stored, cared for, and presented with intention.
      </p>

      <h2 className={H2}>Why rose toys became so popular</h2>
      <p>
        Rose toys moved from a niche shape to one of the most recognizable
        designs in intimate wellness for a few clear reasons. The form is small
        and considered. The silhouette reads as decorative before it reads as
        anything else. And the category appeals to a generation of buyers who
        treat personal wellness as an extension of their wider lifestyle - thoughtful,
        design-led, and quietly luxurious.
      </p>
      <p>
        The result is a category that is searched constantly, photographed
        often, and asked about by people exploring intimate wellness for the
        first time as well as long-time collectors.
      </p>

      <h2 className={H2}>What to look for in a premium rose toy</h2>
      <p>
        Not every rose toy is built to the same standard. When evaluating a
        premium rose toy, the details matter more than the marketing.
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Body-safe materials.</strong> A premium rose toy uses medical-grade silicone or comparable body-safe materials with a soft, non-porous finish.</li>
        <li><strong>Discreet design.</strong> A refined silhouette that belongs on a shelf, in a drawer, or inside a considered storage piece - not in a generic plastic package.</li>
        <li><strong>Easy cleaning.</strong> Smooth, sealed surfaces that can be cleaned simply and stored dry.</li>
        <li><strong>Reliable charging.</strong> Modern USB-C charging with a battery that holds a charge between uses.</li>
        <li><strong>Simple controls.</strong> Intuitive buttons and clear feedback - no learning curve required.</li>
        <li><strong>Secure storage.</strong> A considered storage solution, ideally lockable, that protects the product and keeps it private.</li>
        <li><strong>Refined presentation.</strong> Packaging and finish that match the quality of the product itself.</li>
      </ul>

      <h2 className={H2}>Why storage matters as much as the product itself</h2>
      <p>
        A rose toy lives most of its life outside of use - in a drawer, on a
        shelf, in a bag. The way it is stored shapes how private, protected,
        and well-kept it stays over time. Storage is also the moment most
        intimate wellness products are noticed by guests, partners, or
        roommates, which is why a refined storage piece is part of the product
        experience itself.
      </p>
      <p>
        For a deeper look at how Vellvii thinks about this, see our guide on{" "}
        <Link to="/guides/discreet-storage-for-intimate-wellness-products" className="text-primary hover:underline">
          discreet storage for intimate wellness products
        </Link>
        , and the role of a portable fingerprint-lock case like{" "}
        <Link to="/products/vellvii-lux" className="text-primary hover:underline">
          Vellvii Lux
        </Link>
        .
      </p>

      <MailingListCTA />

      <h2 className={H2}>How Vellvii is approaching the rose toy category</h2>
      <p>
        Vellvii is currently developing a rose-inspired intimate wellness
        product designed to fit into the broader Vellvii ecosystem, including
        compatibility with the Vellvii DOX storage and docking concept. The
        intent is to bring the same storage-first philosophy that defines DOX
        and Lux to a category that has, until now, been dominated by lookalike
        products with little consideration for how they live in a refined home.
      </p>
      <p>
        The Vellvii rose-inspired product is in development, with more details
        to follow as it moves toward launch. To learn more about how the
        ecosystem fits together, read our guide on{" "}
        <Link to="/guides/how-the-vellvii-dox-docking-system-works" className="text-primary hover:underline">
          how the Vellvii DOX docking system works
        </Link>
        .
      </p>

      <h2 className={H2}>Caring for a refined rose toy</h2>
      <p>
        Premium intimate wellness products reward simple, consistent care -
        clean between uses, store dry, keep batteries topped up, and protect
        the finish with a considered storage piece. Our short guide on{" "}
        <Link to="/guides/how-to-care-for-your-vellvii-products" className="text-primary hover:underline">
          how to care for your Vellvii products
        </Link>{" "}
        covers the essentials.
      </p>

      <EcosystemCTA />
    </GuideLayout>
  );
};

export default GuideWhatIsARoseToy;
