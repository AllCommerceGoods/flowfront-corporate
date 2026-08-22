import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  X,
  ShoppingCart,
  PencilRuler,
  TrendingUp,
  Camera,
  Store,
  Megaphone,
  Tag,
  Boxes,
  FileText,
  CalendarDays,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5 },
};

/* --- Section eyebrow --- */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-primary">
      {children}
    </p>
  );
}

/* --- 1. Hero --- */
function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-border bg-background">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          background:
            "radial-gradient(60% 55% at 15% 0%, hsl(var(--primary) / 0.10), transparent 60%)",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:px-6 md:py-24 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            Growth partner for consumer product brands
          </span>
          <h1 className="font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[3.4rem]">
            We grow brands on Amazon.
            <br />
            <span className="text-primary">We just do it with our own money.</span>
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
            Most partners bill you a monthly fee and hope it works. We buy your inventory at
            wholesale, rebuild your listings, and grow the channel, because we only make money
            when the product sells.
          </p>
          <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
            <a href="#audit">
              <Button
                size="lg"
                className="cursor-pointer rounded-full px-7 text-base font-semibold shadow-lg shadow-primary/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30"
              >
                Get a free channel audit
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </a>
            <span className="text-sm text-muted-foreground">
              No fee. We buy the inventory, so the risk is ours.
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="space-y-3"
        >
          {/* TODO: pass beforeSrc / afterSrc once the real listing screenshots exist. */}
          <BeforeAfterSlider ratio="4 / 3" />
          <p className="text-center text-xs text-muted-foreground">
            Drag the handle to compare a rebuilt Amazon listing.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* --- 2. The problem --- */
function Problem() {
  return (
    <section id="problem" className="border-b border-border bg-card">
      <div className="mx-auto max-w-4xl px-4 py-16 md:px-6 md:py-24">
        <motion.div {...fadeUp} className="space-y-6">
          <Eyebrow>The problem</Eyebrow>
          <h2 className="font-display text-3xl font-bold leading-tight text-foreground md:text-4xl">
            Most brands we talk to haven't looked at their own Amazon page in a year.
          </h2>
          <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p>
              One product photo. No brand store. A description written by someone who's never
              used the product. Three or four sellers you've never heard of racing each other
              down on price.
            </p>
            <p className="border-l-2 border-primary pl-5 font-medium text-foreground">
              That page is doing more work for your brand than your website is. It's just not
              doing it well.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* --- 3. How it works --- */
const steps = [
  {
    icon: ShoppingCart,
    title: "We buy at wholesale.",
    body: "A real purchase order, our capital, our risk. You ship it and you're paid.",
  },
  {
    icon: PencilRuler,
    title: "We rebuild the page.",
    body: "Photography, enhanced content, brand storefront, copy. At no cost to you.",
  },
  {
    icon: TrendingUp,
    title: "We grow the channel.",
    body: "Pricing enforcement, advertising, ranking. Then we reorder.",
  },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="border-b border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <motion.div {...fadeUp} className="mb-12 max-w-2xl">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="font-display text-3xl font-bold leading-tight text-foreground md:text-4xl">
            One partner, one accountable path from wholesale to reorder.
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="relative flex h-full flex-col rounded-2xl border border-border bg-card p-7"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <step.icon className="h-5 w-5" />
                </span>
                <span className="font-mono-tabular text-sm font-semibold text-muted-foreground">
                  0{i + 1}
                </span>
              </div>
              <h3 className="font-display text-xl font-bold text-foreground">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{step.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- 4. Proof --- */
const proofStats = [
  {
    label: "Best Sellers Rank",
    unit: "lower is better",
    before: "#000,000",
    after: "#0,000",
  },
  {
    label: "Units per month",
    unit: "trailing 30 days",
    before: "00",
    after: "000",
  },
  {
    label: "Price recovery, Apple variation",
    unit: "list price held",
    before: "$00.00",
    after: "$20+",
  },
];

function Proof() {
  return (
    <section id="proof" className="border-b border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <motion.div {...fadeUp} className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Eyebrow>Proof</Eyebrow>
            <h2 className="font-display text-3xl font-bold leading-tight text-foreground md:text-4xl">
              Horse Amour, equine care.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              We bought the inventory, rebuilt the page, and enforced the price. These are the
              receipts. Real numbers, dated, straight from Seller Central.
            </p>
          </div>
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold text-muted-foreground">
            <FileText className="h-3.5 w-3.5" />
            Placeholders below, swap in the real figures
          </span>
        </motion.div>

        {/* Receipt-style stat row */}
        <div className="grid gap-5 md:grid-cols-3">
          {proofStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="rounded-2xl border border-border bg-background p-6"
            >
              <p className="font-display text-sm font-semibold text-foreground">{stat.label}</p>
              <p className="mt-0.5 text-xs uppercase tracking-wider text-muted-foreground">
                {stat.unit}
              </p>
              <div className="mt-5 flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Before
                  </p>
                  <p className="font-mono-tabular text-2xl font-semibold text-muted-foreground line-through decoration-1">
                    {stat.before}
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 shrink-0 text-primary" />
                <div className="text-right">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-success">
                    After
                  </p>
                  <p className="font-mono-tabular text-3xl font-bold text-foreground">
                    {stat.after}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Listing before/after + dated screenshots */}
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <motion.div {...fadeUp} className="space-y-3">
            <p className="font-display text-sm font-semibold text-foreground">
              Listing rebuild, before and after
            </p>
            {/* TODO: pass beforeSrc / afterSrc for the Horse Amour listing. */}
            <BeforeAfterSlider
              ratio="16 / 10"
              beforeLabel="Before"
              afterLabel="After"
            />
          </motion.div>

          <motion.div {...fadeUp} className="space-y-3">
            <p className="font-display text-sm font-semibold text-foreground">
              Dated screenshots
            </p>
            <div className="grid h-full grid-cols-1 gap-4 sm:grid-cols-2">
              {["Before", "After"].map((tag) => (
                <div
                  key={tag}
                  className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-background p-6 text-center"
                  style={{ minHeight: 200 }}
                >
                  <CalendarDays className="h-6 w-6 text-muted-foreground" />
                  <p className="font-mono-tabular text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {tag}, date TBD
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Drop the dated Seller Central screenshot here
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* --- 5. What we handle --- */
const capabilities = [
  { icon: PencilRuler, label: "Listing rebuilds" },
  { icon: Camera, label: "Photography and enhanced content" },
  { icon: Store, label: "Brand storefront" },
  { icon: Megaphone, label: "Advertising" },
  { icon: Tag, label: "Pricing enforcement" },
  { icon: Boxes, label: "Inventory and fulfillment" },
];

function WhatWeHandle() {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <motion.div {...fadeUp} className="mb-12 max-w-2xl">
          <Eyebrow>What we handle</Eyebrow>
          <h2 className="font-display text-3xl font-bold leading-tight text-foreground md:text-4xl">
            Everything the channel needs, handled by us.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            We grow the brands whose inventory we buy, so the work below is ours to do and ours
            to pay for.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-colors duration-200 hover:border-primary/40"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <cap.icon className="h-5 w-5" />
              </span>
              <span className="font-display font-semibold text-foreground">{cap.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- 6. Who we're a fit for --- */
const fitFor = [
  "You make a product people reorder.",
  "You're doing real volume on Amazon but nobody's minding it.",
  "You'd rather sell to one accountable partner than five anonymous sellers.",
];
const notFit = [
  "You're pre revenue.",
  "Your margins can't support a wholesale tier.",
  "You want to keep selling direct on Amazon yourself.",
];

function Fit() {
  return (
    <section id="fit" className="border-b border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <motion.div {...fadeUp} className="mb-12 max-w-2xl">
          <Eyebrow>Who we're a fit for</Eyebrow>
          <h2 className="font-display text-3xl font-bold leading-tight text-foreground md:text-4xl">
            We'll tell you on the first call.
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          <motion.div
            {...fadeUp}
            className="rounded-2xl border border-success/30 bg-success/5 p-7"
          >
            <p className="mb-5 font-display text-sm font-bold uppercase tracking-widest text-success">
              A fit
            </p>
            <ul className="space-y-4">
              {fitFor.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success text-success-foreground">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span className="leading-relaxed text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            {...fadeUp}
            className="rounded-2xl border border-border bg-background p-7"
          >
            <p className="mb-5 font-display text-sm font-bold uppercase tracking-widest text-muted-foreground">
              Not a fit
            </p>
            <ul className="space-y-4">
              {notFit.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <X className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span className="leading-relaxed text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* --- 7. FAQ --- */
const faqs = [
  {
    q: "What does this cost me?",
    a: "Nothing. We're a customer, not a vendor.",
  },
  {
    q: "So how do you make money?",
    a: "Wholesale margin, same as any retailer.",
  },
  {
    q: "Will you undercut my pricing?",
    a: "No, we enforce it. Uncontrolled pricing is the problem we're solving.",
  },
  {
    q: "What if it doesn't work?",
    a: "We own the inventory. That risk is ours, not yours.",
  },
];

function FAQ() {
  return (
    <section id="faq" className="border-b border-border bg-background">
      <div className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-24">
        <motion.div {...fadeUp} className="mb-10">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="font-display text-3xl font-bold leading-tight text-foreground md:text-4xl">
            The honest answers.
          </h2>
        </motion.div>

        <motion.div {...fadeUp}>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={faq.q} value={`item-${i}`} className="border-border">
                <AccordionTrigger className="text-left font-display text-lg font-semibold text-foreground hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}

/* --- 8. CTA --- */
function CTA() {
  return (
    <section id="audit" className="bg-foreground">
      <div className="mx-auto max-w-4xl px-4 py-20 text-center md:px-6 md:py-28">
        <motion.div {...fadeUp} className="space-y-6">
          <h2 className="font-display text-3xl font-bold leading-tight text-background md:text-4xl">
            Get a free channel audit.
          </h2>
          <p className="mx-auto max-w-xl text-lg leading-relaxed text-background/70">
            We grow brands on Amazon with our own capital. We buy the inventory to do it, so the
            audit costs you nothing and commits you to nothing. Pick a time and we'll show you
            what your page is leaving on the table.
          </p>

          {/* Calendar embed placeholder */}
          <div className="mx-auto mt-4 max-w-2xl">
            <div
              className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-background/25 bg-background/5 p-10 text-center"
              style={{ minHeight: 220 }}
            >
              <CalendarDays className="h-8 w-8 text-background/60" />
              <p className="font-display font-semibold text-background">
                Calendar embed goes here
              </p>
              <p className="max-w-sm text-sm text-background/60">
                Drop in your scheduling embed (Calendly, Cal.com, or similar) so founders can book
                the audit directly.
              </p>
              <a href="mailto:owner@flowfrontglobal.com" className="mt-1">
                <Button
                  size="lg"
                  className="cursor-pointer rounded-full px-7 text-base font-semibold shadow-lg transition-all duration-200 hover:-translate-y-0.5"
                >
                  Get a free channel audit
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function Index() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Problem />
        <HowItWorks />
        <Proof />
        <WhatWeHandle />
        <Fit />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
