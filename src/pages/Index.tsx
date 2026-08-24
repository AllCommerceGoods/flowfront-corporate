import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, X } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import keepaPeppermint from "@/assets/keepa-peppermint.png";
import keepaApple from "@/assets/keepa-apple.png";
import listingBefore from "@/assets/listing-before.png";
import listing01 from "@/assets/listing-01.jpg";
import listing02 from "@/assets/listing-02.jpg";
import listing03 from "@/assets/listing-03.jpg";
import listing04 from "@/assets/listing-04.jpg";
import listing05 from "@/assets/listing-05.jpg";
import listing06 from "@/assets/listing-06.jpg";
import listing07 from "@/assets/listing-07.jpg";
import brandStory from "@/assets/brand-story.jpg";
import horseAmourLogo from "@/assets/horse-amour-logo.jpeg";
// Web-optimized (resized, recompressed) copies for the hero strip only.
import heroImg01 from "@/assets/hero/listing-01.jpg";
import heroImg02 from "@/assets/hero/listing-02.jpg";
import heroImg03 from "@/assets/hero/listing-03.jpg";
import heroImg04 from "@/assets/hero/listing-04.jpg";
import heroImg05 from "@/assets/hero/listing-05.jpg";
import heroImg06 from "@/assets/hero/listing-06.jpg";
import heroImg07 from "@/assets/hero/listing-07.jpg";
import heroBrand from "@/assets/hero/brand-story.jpg";

const listingSet = [
  listing01,
  listing02,
  listing03,
  listing04,
  listing05,
  listing06,
  listing07,
];

/* One entrance, used sparingly. Reduced-motion is handled globally in index.css. */
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
};

/*
 * Restrained hover/focus for non-clickable feature cards: subtle lift, a touch
 * more shadow, and a border shift toward the accent. focus-visible mirrors the
 * hover for keyboard users. No cursor-pointer, since the cards aren't links.
 * Reduced-motion callers get the state change without the transition (index.css).
 */
const liftCard =
  "transition-[transform,box-shadow,border-color] duration-200 ease-out " +
  "hover:-translate-y-1 hover:border-primary/60 hover:shadow-md " +
  "focus-visible:-translate-y-1 focus-visible:border-primary/60 focus-visible:shadow-md " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40";

/* Same idea for the emphasized (already-elevated) step: deepen shadow, accent border. */
const liftCardFeatured =
  "transition-[transform,box-shadow,border-color] duration-200 ease-out " +
  "hover:border-primary/60 hover:shadow-2xl " +
  "focus-visible:border-primary/60 focus-visible:shadow-2xl " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40";

/* Consistent, generous section rhythm so each block reads as its own moment. */
function Section({
  id,
  tone = "light",
  className = "",
  children,
}: {
  id?: string;
  tone?: "light" | "white" | "dark";
  className?: string;
  children: React.ReactNode;
}) {
  const bg =
    tone === "dark"
      ? "bg-foreground text-background"
      : tone === "white"
        ? "bg-card"
        : "bg-background";
  return (
    <section id={id} className={`${bg} ${className}`}>
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-36">{children}</div>
    </section>
  );
}

/* --- 1. Hero: centered text up top, a strip of real listing imagery below.
   Intrinsic w/h are set on each img so the browser reserves the right width
   before the image loads (height is fixed in CSS, width follows the aspect). --- */
const heroStrip = [
  { src: heroImg01, w: 461, h: 640, offset: 0 },
  { src: heroImg02, w: 426, h: 640, offset: 18 },
  { src: heroImg03, w: 640, h: 640, offset: -10 },
  { src: heroImg04, w: 426, h: 640, offset: 12 },
  { src: heroImg05, w: 426, h: 640, offset: 4 },
  { src: heroImg06, w: 640, h: 640, offset: -6 },
  { src: heroImg07, w: 640, h: 640, offset: 22 },
  { src: heroBrand, w: 640, h: 400, offset: 8 },
];

function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[calc(100vh-4rem)] flex-col overflow-hidden bg-foreground text-background"
    >
      {/* Headline block: centered, narrow measure, fills the space above the strip. */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-6 pb-3 pt-16 text-center"
      >
        <h1 className="font-display text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
          We grow brands on Amazon. We just do it with our own money.
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-background/70 md:text-xl">
          Most partners charge you a monthly fee and hope it works. We buy your inventory
          at wholesale, rebuild your listings, and grow the channel.
        </p>
        <div className="mt-6">
          <a href="#audit">
            <Button
              size="lg"
              className="cursor-pointer rounded-full px-8 text-base font-semibold transition-all duration-200 hover:-translate-y-0.5"
            >
              Get your free channel audit
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
          </a>
        </div>
      </motion.div>

      {/* Bottom-third strip: the image IS the card — no frame, height fixed and
          width following each image's own aspect, staggered and slowly drifting. */}
      <div className="relative w-full overflow-hidden pb-14" aria-hidden="true">
        <div className="animate-hero-drift flex w-max items-center gap-3 pl-6">
          {[...heroStrip, ...heroStrip].map((card, i) => (
            <img
              key={i}
              src={card.src}
              alt=""
              width={card.w}
              height={card.h}
              className="h-[28vh] w-auto shrink-0 rounded-2xl shadow-xl md:h-[32vh]"
              style={{ transform: `translateY(${card.offset}px)` }}
              loading="lazy"
              draggable={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- 2. Proof bar: understated horizontal band, tabular figures, no icons. --- */
const proofBar = [
  { value: 6, prefix: "", suffix: "×", label: "rank improvement in five months" },
  { value: 4, prefix: "", suffix: "×", label: "units per month" },
  { value: 20, prefix: "$", suffix: "+", label: "price recovered and held" },
];

/**
 * Counts from 0 to `to` when scrolled into view, once. The numeral animates;
 * the prefix/suffix stay static. A reserved min-width (in ch) on the numeral
 * keeps the tabular figures from shifting width as digit count grows.
 * Respects prefers-reduced-motion by rendering the final value immediately.
 */
function CountUp({
  to,
  prefix = "",
  suffix = "",
}: {
  to: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(to);
      return;
    }
    const controls = animate(0, to, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, reduce]);

  return (
    <span
      ref={ref}
      className="font-mono-tabular text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
    >
      {prefix}
      <span
        className="inline-block text-right"
        style={{ minWidth: `${String(to).length}ch` }}
      >
        {display}
      </span>
      {suffix}
    </span>
  );
}

function ProofBar() {
  return (
    <section className="border-y border-border bg-card">
      <div className="mx-auto max-w-6xl px-6 py-10 md:py-12">
        <div className="grid gap-8 sm:grid-cols-3 sm:gap-0">
          {proofBar.map((item, i) => (
            <div
              key={item.label}
              className={`flex flex-col items-center text-center sm:px-6 ${
                i > 0 ? "sm:border-l sm:border-border" : ""
              }`}
            >
              <CountUp to={item.value} prefix={item.prefix} suffix={item.suffix} />
              <span className="mt-2 text-sm leading-snug text-muted-foreground">
                {item.label}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-muted-foreground">
          Horse Amour, March to August 2026. Verified via Keepa.
        </p>
      </div>
    </section>
  );
}

/* --- 3. The problem: left copy, right one-vs-seven comparison. --- */
function OneVsSeven() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 sm:items-stretch">
      <figure className="flex flex-col space-y-3">
        <p className="font-display text-sm font-semibold text-foreground">
          April 2026, one image
        </p>
        <div className="flex flex-1 items-center justify-center rounded-2xl border border-border bg-muted p-4">
          <img
            src={listingBefore}
            alt="Horse Amour listing in April 2026, a single product image showing discontinued packaging"
            className="h-auto max-h-full w-auto max-w-[300px] rounded-lg"
            loading="lazy"
          />
        </div>
        <figcaption className="text-xs text-muted-foreground">
          Single listing image, low resolution, discontinued packaging.
        </figcaption>
      </figure>
      <figure className="flex flex-col space-y-3">
        <p className="font-display text-sm font-semibold text-foreground">
          August 2026, full image set
        </p>
        <div className="flex flex-1 flex-wrap content-start justify-center gap-3">
          {listingSet.map((src, i) => (
            <div
              key={src}
              className="aspect-square w-[calc(50%-0.375rem)] overflow-hidden rounded-xl border border-border bg-card sm:w-[calc(33.333%-0.5rem)]"
            >
              <img
                src={src}
                alt={`Horse Amour rebuilt listing image ${i + 1} of 7, August 2026`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </figure>
    </div>
  );
}

function Problem() {
  return (
    <Section id="problem" tone="light">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <motion.div {...fadeUp} className="max-w-xl">
          <h2 className="font-display text-3xl font-bold leading-[1.15] tracking-tight text-foreground md:text-4xl">
            Most brands haven't looked at their own Amazon page in a year.
          </h2>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p>
              One product image, showing packaging the product no longer comes in. Variations
              sitting separately, competing with each other. A description written by someone
              who never used the product. No advertising. Three or four sellers you've never
              heard of racing each other down on price.
            </p>
            <p className="border-l-2 border-foreground pl-5 font-medium text-foreground">
              That page is doing more work for your brand than your website is. It just isn't
              doing it well.
            </p>
          </div>
        </motion.div>
        <motion.div {...fadeUp}>
          <OneVsSeven />
        </motion.div>
      </div>
    </Section>
  );
}

/* --- 4. What we fix: three columns, headache then fix. --- */
const fixes = [
  {
    eyebrow: "Listings",
    headline: "Your listings are working against you",
    body: "Outdated images, unmerged variations, missing content. We rebuild the full page: image set, enhanced content, brand storefront, copy, backend data.",
  },
  {
    eyebrow: "Pricing",
    headline: "Your pricing is out of your control",
    body: "Unauthorized sellers undercutting each other drags your brand down and trains customers to wait for a discount. We enforce MAP and consolidate the Buy Box.",
  },
  {
    eyebrow: "Channels",
    headline: "One channel is a single point of failure",
    body: "Once Amazon is solid and reordering, we open Walmart and TikTok Shop using the same catalog and the same discipline.",
  },
];

function WhatWeFix() {
  return (
    <Section tone="light">
      <motion.h2
        {...fadeUp}
        className="max-w-3xl font-display text-3xl font-bold leading-[1.15] tracking-tight text-foreground md:text-4xl"
      >
        What we fix.
      </motion.h2>
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {fixes.map((fix, i) => (
          <motion.div
            key={fix.headline}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            tabIndex={0}
            className={`flex h-full flex-col rounded-2xl border border-border bg-card p-8 shadow-sm md:p-9 ${liftCard}`}
          >
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
              {fix.eyebrow}
            </p>
            <h3 className="mt-4 font-display text-2xl font-bold leading-[1.15] tracking-tight text-foreground md:text-3xl">
              {fix.headline}
            </h3>
            <p className="mt-4 leading-relaxed text-muted-foreground">{fix.body}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* --- 5. How the partnership works: three steps, step two emphasized. --- */
const steps = [
  {
    n: "1",
    title: "The audit",
    body: "We pull your listings and show you exactly what's broken. Free, no commitment, and yours to keep whether you work with us or not.",
  },
  {
    n: "2",
    title: "The purchase order",
    body: "We buy inventory at wholesale. Our capital, our risk. You ship it and you're paid, same as any retailer.",
  },
  {
    n: "3",
    title: "Rebuild and scale",
    body: "We rebuild the listings, run advertising, enforce pricing, and reorder as it sells. All of it on our dime, because we only make money when the product sells.",
  },
];

function HowItWorks() {
  return (
    <Section id="how-it-works" tone="light">
      <motion.h2
        {...fadeUp}
        className="max-w-3xl font-display text-3xl font-bold leading-[1.15] tracking-tight text-foreground md:text-4xl"
      >
        How the partnership works.
      </motion.h2>
      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {steps.map((step, i) => {
          const featured = step.n === "2";
          return (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              tabIndex={0}
              className={`relative flex h-full flex-col rounded-2xl p-8 pt-12 md:p-9 md:pt-12 ${
                featured
                  ? `border border-transparent bg-foreground text-background shadow-xl md:-translate-y-3 ${liftCardFeatured}`
                  : `border border-border bg-card shadow-sm ${liftCard}`
              }`}
            >
              <span className="absolute -top-5 left-8 flex h-10 w-10 items-center justify-center rounded-full bg-primary font-mono-tabular text-base font-bold text-primary-foreground shadow-md">
                {step.n}
              </span>
              <h3
                className={`font-display text-2xl font-bold tracking-tight ${
                  featured ? "text-background" : "text-foreground"
                }`}
              >
                {step.title}
              </h3>
              <p
                className={`mt-3 leading-relaxed ${
                  featured ? "text-background/75" : "text-muted-foreground"
                }`}
              >
                {step.body}
              </p>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

/* --- 6. Proof: charts, rank table, brand story. --- */
const proofRows = [
  { metric: "Apple, Pet Supplies rank", before: "282,090", after: "46,182" },
  { metric: "Apple, Tack Care rank", before: "263", after: "18" },
  { metric: "Peppermint, Pet Supplies rank", before: "123,051", after: "40,000s" },
  { metric: "Units per month", before: "12", after: "50" },
];

function Proof() {
  return (
    <Section id="proof" tone="white">
      <motion.div {...fadeUp}>
        <h2 className="font-display text-3xl font-bold leading-[1.15] tracking-tight text-foreground md:text-4xl">
          Horse Amour.
        </h2>
        <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-16">
          <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p>
              Sue came to us after someone promised to fix her Amazon setup, charged her, and
              disappeared. Nothing came of it. She had paid for results she never got.
            </p>
            <p>
              Both variations were outdated and unmerged. One image each, showing packaging the
              product no longer came in. No advertising, no enhanced content, no description.
            </p>
            <p>
              We bought inventory. Then we set up brand registry, rebuilt both listings, built a
              full image set, added enhanced content, merged the variations, enrolled in FBA, and
              corrected the pricing.
            </p>
          </div>
          <img
            src={horseAmourLogo}
            alt="Horse Amour logo"
            className="h-44 w-44 shrink-0 self-start md:h-52 md:w-52 lg:h-60 lg:w-60"
            width={240}
            height={240}
          />
        </div>
      </motion.div>

      {/* Keepa sales rank charts */}
      <motion.div {...fadeUp} className="mt-14 grid gap-5 md:grid-cols-2">
        {[
          {
            src: keepaPeppermint,
            alt: "Keepa sales rank chart for the Peppermint variation, March to August 2026",
            caption: "Peppermint, sales rank March to August 2026",
          },
          {
            src: keepaApple,
            alt: "Keepa sales rank chart for the Apple variation, March to August 2026",
            caption: "Apple, sales rank March to August 2026",
          },
        ].map((chart) => (
          <figure key={chart.caption} className="space-y-3">
            <div className="overflow-hidden rounded-2xl border border-border bg-background">
              <img src={chart.src} alt={chart.alt} className="w-full" loading="lazy" />
            </div>
            <figcaption className="text-center text-xs text-muted-foreground">
              {chart.caption}
            </figcaption>
          </figure>
        ))}
      </motion.div>

      {/* Rank table */}
      <motion.div {...fadeUp} className="mt-6">
        <div className="overflow-hidden rounded-2xl border border-border bg-background">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-5 py-4 font-display text-sm font-semibold text-foreground md:px-6" />
                  <th className="px-5 py-4 text-right font-mono-tabular text-xs font-semibold uppercase tracking-widest text-muted-foreground md:px-6">
                    March 2026
                  </th>
                  <th className="px-5 py-4 text-right font-mono-tabular text-xs font-semibold uppercase tracking-widest text-foreground md:px-6">
                    August 2026
                  </th>
                </tr>
              </thead>
              <tbody>
                {proofRows.map((row) => (
                  <tr key={row.metric} className="border-b border-border last:border-0">
                    <td className="px-5 py-4 text-sm font-medium text-foreground md:px-6">
                      {row.metric}
                    </td>
                    <td className="px-5 py-4 text-right font-mono-tabular text-base text-muted-foreground line-through decoration-1 md:px-6">
                      {row.before}
                    </td>
                    <td className="px-5 py-4 text-right font-mono-tabular text-lg font-bold text-foreground md:px-6">
                      {row.after}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Rank and unit data via Keepa, read August 23, 2026.
        </p>
      </motion.div>

      {/* Brand story banner */}
      <motion.figure {...fadeUp} className="mt-14 space-y-3">
        <div className="overflow-hidden rounded-2xl border border-border bg-background">
          <img
            src={brandStory}
            alt="Horse Amour brand story, built August 2026"
            className="w-full"
            loading="lazy"
          />
        </div>
        <figcaption className="text-center text-xs text-muted-foreground">
          Brand Story, built August 2026
        </figcaption>
      </motion.figure>

      <motion.p
        {...fadeUp}
        className="mx-auto mt-14 max-w-2xl text-center text-lg leading-relaxed text-foreground"
      >
        Sue's cost was zero. We're a customer, not a vendor. That's the whole difference
        between us and whoever took her money.
      </motion.p>
    </Section>
  );
}

/* --- 7. Who we're a fit for --- */
const fitFor = [
  "You make a product people reorder.",
  "You're doing real volume on Amazon but nobody's minding it.",
  "You'd rather sell to one accountable partner than five anonymous sellers.",
];
const notFit = [
  "You're pre-revenue.",
  "Your margins can't support a wholesale tier.",
  "You aren't willing to put a MAP policy and seller authorization in writing.",
];

function Fit() {
  return (
    <Section id="fit" tone="light">
      <div className="grid gap-6 md:grid-cols-2">
        <motion.div
          {...fadeUp}
          tabIndex={0}
          className={`rounded-2xl border border-border bg-card p-8 shadow-sm ${liftCard}`}
        >
          <p className="mb-6 font-display text-sm font-bold uppercase tracking-widest text-foreground">
            A fit
          </p>
          <ul className="space-y-4">
            {fitFor.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-foreground text-background">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                <span className="leading-relaxed text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          {...fadeUp}
          tabIndex={0}
          className={`rounded-2xl border border-border bg-card p-8 shadow-sm ${liftCard}`}
        >
          <p className="mb-6 font-display text-sm font-bold uppercase tracking-widest text-muted-foreground">
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
      <motion.p
        {...fadeUp}
        className="mt-12 text-center font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl"
      >
        We'll tell you on the first call.
      </motion.p>
    </Section>
  );
}

/* --- 8. The operators: deep core color, text-forward. --- */
function Operators() {
  return (
    <Section tone="dark">
      <div className="mx-auto max-w-3xl">
        <motion.h2
          {...fadeUp}
          className="font-display text-3xl font-bold leading-[1.15] tracking-tight text-background md:text-4xl"
        >
          Two people, two facilities, no account managers.
        </motion.h2>
        <motion.div
          {...fadeUp}
          className="mt-8 space-y-5 text-lg leading-relaxed text-background/75"
        >
          <p>
            FlowFront is run by Angel Cardenas and Sebastian Fletes. Angel handles brand
            relationships and channel operations. Sebastian runs the backend.
          </p>
          <p>
            We prep and ship out of Chicago and Hillsboro. When you call, you get one of us.
          </p>
        </motion.div>
      </div>
    </Section>
  );
}

/* --- 9. FAQ --- */
const faqs = [
  { q: "What does this cost me?", a: "Nothing. We're a customer, not a vendor." },
  { q: "How do you make money?", a: "Wholesale margin, same as any retailer." },
  {
    q: "Will you undercut my pricing?",
    a: "No, we enforce it. Uncontrolled pricing is the problem we're solving.",
  },
  {
    q: "What if it doesn't work?",
    a: "We own the inventory. That risk is ours.",
  },
  {
    q: "Do you sell on other channels?",
    a: "Amazon first. Once it's stable and reordering, Walmart and TikTok Shop.",
  },
];

function FAQ() {
  return (
    <Section id="faq" tone="white">
      <div className="mx-auto max-w-3xl">
        <motion.h2
          {...fadeUp}
          className="font-display text-3xl font-bold leading-[1.15] tracking-tight text-foreground md:text-4xl"
        >
          The honest answers.
        </motion.h2>
        <motion.div {...fadeUp} className="mt-10">
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
    </Section>
  );
}

/* --- 10. CTA --- */
function CTA() {
  return (
    <section id="audit" className="bg-foreground">
      <div className="mx-auto max-w-4xl px-6 py-24 text-center md:py-36">
        <motion.h2
          {...fadeUp}
          className="mx-auto max-w-2xl font-display text-3xl font-bold leading-[1.15] tracking-tight text-background md:text-5xl"
        >
          Tell us what's broken. We'll show you what to fix first.
        </motion.h2>

        <motion.div {...fadeUp} className="mx-auto mt-10 max-w-2xl">
          <a href="mailto:owner@flowfrontglobal.com">
            <Button
              size="lg"
              className="cursor-pointer rounded-full px-8 text-base font-semibold transition-all duration-200 hover:-translate-y-0.5"
            >
              Get your free channel audit
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
          </a>

          {/* Calendar embed placeholder */}
          <div
            className="mt-8 flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-background/25 bg-background/5 p-10 text-center"
            style={{ minHeight: 180 }}
          >
            <p className="font-display font-semibold text-background">Calendar embed goes here</p>
            <p className="max-w-sm text-sm text-background/60">
              Drop in your scheduling embed (Calendly, Cal.com, or similar) so brands can book
              the audit directly.
            </p>
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
        <ProofBar />
        <Problem />
        <WhatWeFix />
        <HowItWorks />
        <Proof />
        <Fit />
        <Operators />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
