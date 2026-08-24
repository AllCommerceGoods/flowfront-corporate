import { Mail, ArrowUpRight } from "lucide-react";
import logoDark from "@/assets/flowfront-logo-dark.png";

export function Footer() {
  return (
    <footer className="bg-footer text-footer-foreground">
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm space-y-3">
            <img
              src={logoDark}
              alt="FlowFront Global"
              width={902}
              height={192}
              className="h-9 w-auto"
            />
            <p className="text-sm leading-relaxed text-footer-foreground/80">
              We buy consumer product inventory at wholesale and grow it on Amazon. We only
              make money when the product sells.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            <div className="space-y-3">
              <h3 className="font-display text-xs font-semibold uppercase tracking-widest text-footer-foreground/60">
                Company
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="text-footer-foreground/90">FlowFront Global LLC</li>
                <li className="text-footer-foreground/70">California</li>
                <li className="text-footer-foreground/70">W-9 available on request</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-display text-xs font-semibold uppercase tracking-widest text-footer-foreground/60">
                Contact
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="mailto:owner@flowfrontglobal.com"
                    className="inline-flex items-center gap-2 text-footer-foreground/90 transition-colors duration-200 hover:text-primary"
                  >
                    <Mail className="h-4 w-4" />
                    owner@flowfrontglobal.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://shop.flowfrontglobal.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-footer-foreground/90 transition-colors duration-200 hover:text-primary"
                  >
                    our retail storefront
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-display text-xs font-semibold uppercase tracking-widest text-footer-foreground/60">
                Locations
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="text-footer-foreground/80">
                  4711 N Lamon Ave, STE 12
                  <br />
                  Chicago, IL 60630
                </li>
                <li className="text-footer-foreground/80">
                  1982 NE 25th Ave, STE 4
                  <br />
                  Hillsboro, OR 97124
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-footer-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} FlowFront Global LLC. All rights reserved.</p>
          <p>We buy the inventory and grow the channel. Only paid when it sells.</p>
        </div>
      </div>
    </footer>
  );
}
