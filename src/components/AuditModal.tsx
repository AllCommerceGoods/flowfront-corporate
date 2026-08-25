import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { X, ArrowRight } from "lucide-react";
import intlTelInput from "intl-tel-input/intlTelInputWithUtils";
import "intl-tel-input/styles";
import { Button } from "@/components/ui/button";

const CALENDLY_URL = "https://calendly.com/owner-flowfrontglobal/30min";
const CAL_JS = "https://assets.calendly.com/assets/external/widget.js";
const CAL_CSS = "https://assets.calendly.com/assets/external/widget.css";

type CalendlyGlobal = {
  Calendly?: {
    initInlineWidget: (o: { url: string; parentElement: HTMLElement }) => void;
  };
};

/** Loads the Calendly assets once, resolving when the global is ready. */
function loadCalendly(): Promise<void> {
  return new Promise((resolve) => {
    if (typeof document === "undefined") return resolve();
    if (!document.querySelector(`link[href="${CAL_CSS}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = CAL_CSS;
      document.head.appendChild(link);
    }
    if ((window as unknown as CalendlyGlobal).Calendly) return resolve();
    const existing = document.querySelector(
      `script[src="${CAL_JS}"]`,
    ) as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener("load", () => resolve());
      return;
    }
    const script = document.createElement("script");
    script.src = CAL_JS;
    script.async = true;
    script.addEventListener("load", () => resolve());
    document.body.appendChild(script);
  });
}

/* --- Context so any button (header, hero, CTA) can open the modal --- */
type AuditModalContextValue = { open: () => void };
const AuditModalContext = createContext<AuditModalContextValue | null>(null);

export function useAuditModal() {
  const ctx = useContext(AuditModalContext);
  if (!ctx) throw new Error("useAuditModal must be used within <AuditModalProvider>");
  return ctx;
}

export function AuditModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  return (
    <AuditModalContext.Provider value={{ open }}>
      {children}
      {isOpen && <AuditModal onClose={close} />}
    </AuditModalContext.Provider>
  );
}

/* --- The modal itself --- */
type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  website: string;
  revenue: string;
  consent: boolean;
};

const REVENUE_OPTIONS = ["Under $500K", "$500K to $2M", "$2M to $10M", "$10M+"];

const inputClass =
  "h-12 w-full rounded-lg border border-border bg-background px-4 text-[15px] text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/30";
const labelClass = "mb-2 block text-[15px] font-semibold text-foreground";

function AuditModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<1 | 2>(1);
  const cardRef = useRef<HTMLDivElement>(null);
  const calRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const itiRef = useRef<ReturnType<typeof intlTelInput> | null>(null);
  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    website: "",
    revenue: "",
    consent: false,
  });

  // Start loading Calendly as soon as the modal opens (never on page load).
  useEffect(() => {
    void loadCalendly();
  }, []);

  // Escape + Tab trap, body scroll lock, and focus restore on close.
  useEffect(() => {
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const focusables = cardRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables || focusables.length === 0) return;
      const list = Array.from(focusables).filter(
        (el) => el.offsetParent !== null || el.tagName === "IFRAME",
      );
      if (list.length === 0) return;
      const first = list[0];
      const last = list[list.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      restoreFocusRef.current?.focus?.();
    };
  }, [onClose]);

  // Move focus into the modal when it opens and when the step changes.
  useEffect(() => {
    const target = cardRef.current?.querySelector<HTMLElement>(
      'input, select, button:not([data-close])',
    );
    target?.focus();
  }, [step]);

  // International phone input (flag + dial code on the left), form step only.
  useEffect(() => {
    if (step !== 1 || !phoneInputRef.current) return;
    const el = phoneInputRef.current;
    const iti = intlTelInput(el, {
      initialCountry: "us",
      separateDialCode: true,
      dropdownParent: document.body,
    });
    itiRef.current = iti;
    const sync = () => setForm((f) => ({ ...f, phone: iti.getNumber() || "" }));
    el.addEventListener("input", sync);
    el.addEventListener("countrychange", sync);
    return () => {
      el.removeEventListener("input", sync);
      el.removeEventListener("countrychange", sync);
      iti.destroy();
    };
  }, [step]);

  // Step 2: render the Calendly widget, prefilled from the form answers.
  useEffect(() => {
    if (step !== 2) return;
    let cancelled = false;
    void loadCalendly().then(() => {
      if (cancelled || !calRef.current) return;
      const calendly = (window as unknown as CalendlyGlobal).Calendly;
      if (!calendly) return;
      const name = `${form.firstName} ${form.lastName}`.trim();
      const params = new URLSearchParams();
      if (name) params.set("name", name);
      if (form.email) params.set("email", form.email);
      // Extra answers travel with the booking as UTM parameters.
      params.set("utm_source", "flowfront-website");
      params.set("utm_medium", "audit-modal");
      params.set("utm_campaign", "free-channel-audit");
      params.set("utm_content", `revenue:${form.revenue}`);
      params.set("utm_term", `website:${form.website}; phone:${form.phone}`);
      if (form.phone) params.set("phone", form.phone);
      calRef.current.innerHTML = "";
      calendly.initInlineWidget({
        url: `${CALENDLY_URL}?${params.toString()}`,
        parentElement: calRef.current,
      });
    });
    return () => {
      cancelled = true;
    };
  }, [step, form]);

  const update =
    <K extends keyof FormState>(key: K) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value =
        e.target.type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : e.target.value;
      setForm((f) => ({ ...f, [key]: value }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="audit-modal-title"
    >
      <div
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
        aria-hidden="true"
        onClick={onClose}
      />
      <div
        ref={cardRef}
        className={`relative z-10 flex w-full flex-col overflow-hidden rounded-2xl bg-card shadow-2xl ${
          step === 2 ? "max-w-[900px]" : "max-w-[1000px]"
        }`}
      >
        <button
          type="button"
          data-close
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-card/90 text-muted-foreground shadow-sm outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/40"
        >
          <X className="h-5 w-5" />
        </button>

        {step === 1 ? (
          <div className="max-h-[90vh] overflow-y-auto overscroll-contain">
            <form onSubmit={handleSubmit} className="p-8 md:p-12">
              <h2
                id="audit-modal-title"
                className="font-display text-2xl font-bold tracking-tight text-foreground"
              >
                Book your free channel audit
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                A few quick details, then pick a time that works for you.
              </p>

              <div className="mt-8 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="af-first" className={labelClass}>
                      First name
                    </label>
                    <input
                      id="af-first"
                      type="text"
                      required
                      autoComplete="given-name"
                      className={inputClass}
                      value={form.firstName}
                      onChange={update("firstName")}
                    />
                  </div>
                  <div>
                    <label htmlFor="af-last" className={labelClass}>
                      Last name
                    </label>
                    <input
                      id="af-last"
                      type="text"
                      required
                      autoComplete="family-name"
                      className={inputClass}
                      value={form.lastName}
                      onChange={update("lastName")}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="af-email" className={labelClass}>
                    Business email
                  </label>
                  <input
                    id="af-email"
                    type="email"
                    required
                    autoComplete="email"
                    className={inputClass}
                    value={form.email}
                    onChange={update("email")}
                  />
                </div>

                <div>
                  <label htmlFor="af-phone" className={labelClass}>
                    Phone number
                  </label>
                  {/* Uncontrolled: intl-tel-input manages the value; we read it
                      via getNumber() in the init effect above. */}
                  <input
                    ref={phoneInputRef}
                    id="af-phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="af-website" className={labelClass}>
                    Brand website
                  </label>
                  <input
                    id="af-website"
                    type="url"
                    required
                    inputMode="url"
                    placeholder="https://"
                    autoComplete="url"
                    className={inputClass}
                    value={form.website}
                    onChange={update("website")}
                  />
                </div>

                <div>
                  <label htmlFor="af-revenue" className={labelClass}>
                    Annual revenue
                  </label>
                  <select
                    id="af-revenue"
                    required
                    className={inputClass}
                    value={form.revenue}
                    onChange={update("revenue")}
                  >
                    <option value="" disabled>
                      Select a range
                    </option>
                    {REVENUE_OPTIONS.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>

                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    required
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-border text-primary accent-primary focus-visible:ring-2 focus-visible:ring-primary/40"
                    checked={form.consent}
                    onChange={update("consent")}
                  />
                  <span className="text-sm leading-relaxed text-muted-foreground">
                    I agree to be contacted about this audit.
                  </span>
                </label>
              </div>

              <Button
                type="submit"
                size="lg"
                className="mt-8 h-12 w-full cursor-pointer rounded-full text-base font-semibold"
              >
                Continue to calendar
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </form>
          </div>
        ) : (
          <>
            <h2 id="audit-modal-title" className="sr-only">
              Book your free channel audit
            </h2>
            <div ref={calRef} className="h-[80vh] md:h-[700px]" />
          </>
        )}
      </div>
    </div>
  );
}
