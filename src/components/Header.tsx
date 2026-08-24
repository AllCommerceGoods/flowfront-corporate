import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import logoLight from "@/assets/flowfront-logo-light.png";
import logoDark from "@/assets/flowfront-logo-dark.png";

const navLinks = [
  { label: "The problem", href: "#problem" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Proof", href: "#proof" },
  { label: "Fit", href: "#fit" },
  { label: "FAQ", href: "#faq" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b transition-colors duration-200 ${
        scrolled
          ? "border-border bg-nav/95 backdrop-blur supports-[backdrop-filter]:bg-nav/80"
          : "border-transparent bg-nav"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <a href="#top" className="flex items-center" aria-label="FlowFront Global, home">
          <img
            src={logoLight}
            alt="FlowFront Global"
            width={934}
            height={205}
            className="h-8 w-auto dark:hidden"
          />
          <img
            src={logoDark}
            alt="FlowFront Global"
            width={902}
            height={192}
            className="hidden h-8 w-auto dark:block"
          />
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-nav-foreground/70 transition-colors duration-200 hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a href="#audit">
          <Button
            size="sm"
            className="cursor-pointer rounded-full font-semibold shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            Get your free channel audit
          </Button>
        </a>
      </div>
    </header>
  );
}
