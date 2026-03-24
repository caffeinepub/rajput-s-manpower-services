import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle,
  Loader2,
  Mail,
  Menu,
  Phone,
  ShieldCheck,
  SprayCan,
  UserCog,
  Users,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useSubmitEnquiry } from "./hooks/useQueries";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Clients", href: "#mou" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#footer" },
];

const SERVICES = [
  {
    icon: UtensilsCrossed,
    title: "Professional Waiters",
    description:
      "Trained and well-groomed waitstaff for hotels, banquets, restaurants, and corporate events. Punctual, professional, and presentation-ready.",
  },
  {
    icon: ShieldCheck,
    title: "Security Guards",
    description:
      "Vigilant, certified security personnel for commercial premises, events, and residential properties. Safety is our priority.",
  },
  {
    icon: SprayCan,
    title: "Housekeeping Staff",
    description:
      "Professional housekeeping staff for hotels, offices, hospitals, and residential complexes. Clean, hygienic, and reliable service every day.",
  },
  {
    icon: UserCog,
    title: "Security Supervisor",
    description:
      "Experienced security supervisors to manage and oversee security teams, ensure compliance, and maintain a safe environment at your premises.",
  },
];

const SERVICE_OPTIONS = [
  "Professional Waiters",
  "Security Guards",
  "Housekeeping Staff",
  "Security Supervisor",
  "Other",
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    serviceRequired: "",
    details: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const { mutate: submitEnquiry, isPending } = useSubmitEnquiry();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.company || !form.serviceRequired || !form.details) {
      toast.error("Please fill in all fields.");
      return;
    }
    submitEnquiry(form, {
      onSuccess: () => {
        setSubmitted(true);
        setForm({ name: "", company: "", serviceRequired: "", details: "" });
        toast.success("Your request has been submitted successfully!");
      },
      onError: () => {
        toast.error("Failed to submit request. Please try again.");
      },
    });
  };

  const currentYear = new Date().getFullYear();

  const scrollToMou = () => {
    setMenuOpen(false);
    document.getElementById("mou")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background font-poppins">
      <Toaster />

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-50 bg-white shadow-nav">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-3"
            data-ocid="nav.link"
          >
            <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center shadow-sm flex-shrink-0">
              <span className="text-gold font-bold text-lg">R</span>
            </div>
            <div className="leading-tight">
              <div className="text-navy font-bold text-sm md:text-base">
                Rajput's Manpower
              </div>
              <div className="text-teal text-xs font-medium">Services</div>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-foreground hover:text-teal transition-colors"
                data-ocid="nav.link"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a href="#mou" className="hidden md:block">
              <Button
                className="bg-teal text-white hover:bg-teal/90 rounded-full text-sm px-5"
                data-ocid="nav.primary_button"
              >
                Request Quote
              </Button>
            </a>
            <button
              type="button"
              className="md:hidden p-2 rounded-md text-navy"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              data-ocid="nav.toggle"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-border px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-foreground hover:text-teal transition-colors"
                onClick={() => setMenuOpen(false)}
                data-ocid="nav.link"
              >
                {link.label}
              </a>
            ))}
            <Button
              type="button"
              className="bg-teal text-white hover:bg-teal/90 rounded-full text-sm w-full"
              onClick={scrollToMou}
              data-ocid="nav.primary_button"
            >
              Request Quote
            </Button>
          </div>
        )}
      </header>

      <main>
        {/* ── HERO ── */}
        <section
          id="home"
          className="relative min-h-[580px] flex items-center justify-center text-center overflow-hidden"
        >
          <img
            src="/assets/generated/hero-manpower.dim_1400x700.jpg"
            alt="Rajput's Manpower Services team"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/70 to-white/85" />
          <div className="relative z-10 px-6 py-20 max-w-3xl mx-auto">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xs font-semibold tracking-widest text-navy uppercase mb-3"
            >
              Rajput's Manpower Services
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold text-teal leading-tight mb-5"
            >
              Trusted Professionals,
              <br />
              Exceptional Service
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base text-foreground/80 mb-8 max-w-xl mx-auto"
            >
              We provide skilled manpower across hospitality, security, and
              general operations. Quick deployment within 15–20 working days.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a href="#services">
                <Button
                  className="bg-navy text-white hover:bg-navy/90 rounded-full px-7 py-6 text-sm font-semibold w-full sm:w-auto"
                  data-ocid="hero.primary_button"
                >
                  Our Services
                </Button>
              </a>
              <a href="#mou">
                <Button
                  className="bg-teal text-white hover:bg-teal/90 rounded-full px-7 py-6 text-sm font-semibold w-full sm:w-auto"
                  data-ocid="hero.secondary_button"
                >
                  Get A Quote
                </Button>
              </a>
            </motion.div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section id="services" className="py-16 md:py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <p className="text-xs font-semibold tracking-widest text-teal uppercase mb-2">
                What We Offer
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-navy uppercase tracking-wide">
                Our Core Services
              </h2>
            </motion.div>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              data-ocid="services.list"
            >
              {SERVICES.map((svc, i) => (
                <motion.div
                  key={svc.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="bg-white border border-border rounded-xl p-6 shadow-card hover:shadow-md transition-shadow"
                  data-ocid={`services.item.${i + 1}`}
                >
                  <div className="mb-4 p-3 bg-sky rounded-lg w-fit">
                    <svc.icon className="text-navy" size={28} />
                  </div>
                  <h3 className="font-bold text-navy mb-2 text-base">
                    {svc.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {svc.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MOU & QUOTATION ── */}
        <section id="mou" className="py-16 md:py-20 bg-sky">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <p className="text-xs font-semibold tracking-widest text-teal uppercase mb-2">
                MOU & Quotation Offer
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-navy uppercase tracking-wide">
                Get Your Service Proposal Today
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Form */}
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-xl p-8 shadow-card flex flex-col items-center justify-center text-center gap-4"
                  data-ocid="mou.success_state"
                >
                  <CheckCircle className="text-teal" size={52} />
                  <h3 className="text-xl font-bold text-navy">
                    Request Submitted!
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Thank you for your enquiry. We will review your request and
                    get back to you within 1–2 business days.
                  </p>
                  <Button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-2 bg-teal text-white hover:bg-teal/90 rounded-full"
                    data-ocid="mou.secondary_button"
                  >
                    Submit Another Request
                  </Button>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-white rounded-xl p-8 shadow-card space-y-5"
                  data-ocid="mou.panel"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label
                        className="text-xs font-semibold text-navy uppercase tracking-wide"
                        htmlFor="name"
                      >
                        Your Name
                      </label>
                      <Input
                        id="name"
                        placeholder="Rahul Sharma"
                        value={form.name}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, name: e.target.value }))
                        }
                        className="border-border text-sm"
                        data-ocid="mou.input"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label
                        className="text-xs font-semibold text-navy uppercase tracking-wide"
                        htmlFor="company"
                      >
                        Company
                      </label>
                      <Input
                        id="company"
                        placeholder="Your Company Ltd."
                        value={form.company}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, company: e.target.value }))
                        }
                        className="border-border text-sm"
                        data-ocid="mou.input"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      className="text-xs font-semibold text-navy uppercase tracking-wide"
                      htmlFor="service"
                    >
                      Service Required
                    </label>
                    <select
                      id="service"
                      value={form.serviceRequired}
                      onChange={(e) =>
                        setForm((p) => ({
                          ...p,
                          serviceRequired: e.target.value,
                        }))
                      }
                      className="w-full border border-border rounded-md px-3 py-2 text-sm bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-teal/40"
                      data-ocid="mou.select"
                    >
                      <option value="">Select a service...</option>
                      {SERVICE_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      className="text-xs font-semibold text-navy uppercase tracking-wide"
                      htmlFor="details"
                    >
                      Requirement Details
                    </label>
                    <Textarea
                      id="details"
                      placeholder="Describe your manpower requirements, number of staff, duration, location..."
                      rows={4}
                      value={form.details}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, details: e.target.value }))
                      }
                      className="border-border text-sm resize-none"
                      data-ocid="mou.textarea"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-navy text-white hover:bg-navy/90 rounded-full font-semibold tracking-wide py-5"
                    data-ocid="mou.submit_button"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "SUBMIT REQUEST"
                    )}
                  </Button>
                </form>
              )}

              {/* Terms Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg font-bold text-navy mb-3">
                    How It Works
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        num: "01",
                        title: "MoU Agreement",
                        text: "Clients are required to sign a Memorandum of Understanding (MoU) before services commence. This document outlines the scope, terms, and legal obligations of both parties.",
                      },
                      {
                        num: "02",
                        title: "20% Confirmation Amount",
                        text: "A confirmation advance of 20% of the total service value is required to initiate the deployment process. This secures your booking and allows us to begin staff allocation.",
                      },
                      {
                        num: "03",
                        title: "15–20 Days Deployment",
                        text: "After receipt of the MoU and confirmation amount, we guarantee deployment of qualified staff within 15 to 20 working days.",
                      },
                    ].map((step) => (
                      <div key={step.num} className="flex gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-navy text-gold font-bold text-sm flex items-center justify-center">
                          {step.num}
                        </div>
                        <div>
                          <p className="font-semibold text-navy text-sm mb-1">
                            {step.title}
                          </p>
                          <p className="text-sm text-foreground/70 leading-relaxed">
                            {step.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-card border-l-4 border-teal">
                  <p className="text-xs font-semibold text-teal uppercase tracking-wide mb-2">
                    Legal Notice
                  </p>
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    All service agreements are governed by applicable Indian
                    labour and commercial laws. Both parties are bound by the
                    signed MoU. Any breach will be subject to legal proceedings
                    as per the terms therein.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="text-teal flex-shrink-0" size={18} />
                  <a
                    href="mailto:karankumarjundhar@gmail.com"
                    className="text-sm text-navy font-medium hover:text-teal transition-colors"
                  >
                    karankumarjundhar@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="text-teal flex-shrink-0" size={18} />
                  <a
                    href="tel:+918091318061"
                    className="text-sm text-navy font-medium hover:text-teal transition-colors"
                  >
                    +91 80913 18061
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── ABOUT US ── */}
        <section id="about" className="py-16 md:py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-navy uppercase tracking-wide">
                About Us
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <img
                  src="/assets/generated/about-founder.dim_600x500.jpg"
                  alt="Rajput Karan – Founder"
                  className="rounded-2xl shadow-card w-full object-cover max-h-[420px]"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-5"
              >
                <p className="text-xs font-semibold tracking-widest text-teal uppercase">
                  Who We Are
                </p>
                <h3 className="text-2xl md:text-3xl font-bold text-navy">
                  Rajput's Manpower Services
                </h3>
                <p className="text-sm font-semibold text-teal">
                  Founded by Rajput Karan
                </p>
                <p className="text-sm text-foreground/75 leading-relaxed">
                  Rajput's Manpower Services is a dedicated staffing firm
                  providing end-to-end manpower solutions across India. We
                  specialize in deploying professionally trained waiters,
                  vigilant security guards, skilled housekeeping staff, and
                  experienced security supervisors for businesses of all sizes.
                </p>
                <p className="text-sm text-foreground/75 leading-relaxed">
                  Founded by <strong className="text-navy">Rajput Karan</strong>
                  , our company was built on a foundation of trust, discipline,
                  and commitment to quality. Every member of our team is
                  screened, trained, and deployed with the highest professional
                  standards. We believe that great businesses are powered by
                  great people — and that's exactly what we provide.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  {[
                    { label: "Services", value: "4+" },
                    { label: "Staff Deployed", value: "500+" },
                    { label: "Happy Clients", value: "120+" },
                    { label: "Years Experience", value: "5+" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-sky rounded-xl p-4 text-center"
                    >
                      <div className="text-2xl font-bold text-teal">
                        {stat.value}
                      </div>
                      <div className="text-xs text-navy font-medium mt-1">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer id="footer" className="bg-navy text-white">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* About */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                  <span className="text-gold font-bold">R</span>
                </div>
                <span className="font-bold text-sm">Rajput's Manpower</span>
              </div>
              <p className="text-xs text-white/60 leading-relaxed">
                Rajput's Manpower Services is a trusted staffing firm providing
                professional waiters, security guards, housekeeping staff, and
                security supervisors across India.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-sm mb-4 text-gold uppercase tracking-wide">
                Quick Links
              </h4>
              <ul className="space-y-2">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-xs text-white/60 hover:text-teal transition-colors"
                      data-ocid="nav.link"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold text-sm mb-4 text-gold uppercase tracking-wide">
                Our Services
              </h4>
              <ul className="space-y-2">
                {SERVICES.map((svc) => (
                  <li key={svc.title}>
                    <span className="text-xs text-white/60">{svc.title}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-sm mb-4 text-gold uppercase tracking-wide">
                Contact Us
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Mail size={14} className="text-teal flex-shrink-0 mt-0.5" />
                  <a
                    href="mailto:karankumarjundhar@gmail.com"
                    className="text-xs text-white/60 hover:text-teal transition-colors break-all"
                  >
                    karankumarjundhar@gmail.com
                  </a>
                </div>
                <div className="flex items-start gap-2">
                  <Phone size={14} className="text-teal flex-shrink-0 mt-0.5" />
                  <a
                    href="tel:+918091318061"
                    className="text-xs text-white/60 hover:text-teal transition-colors"
                  >
                    +91 80913 18061
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 py-5">
          <p className="text-center text-xs text-white/40">
            © {currentYear} Rajput's Manpower Services. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-teal transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
