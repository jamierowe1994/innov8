import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Nav from "@/components/Nav";
import Parallax from "@/components/Parallax";
import Reveal, { MaskHeading } from "@/components/Reveal";
import ServicesPanel from "@/components/ServicesPanel";
import StackLayer from "@/components/StackLayer";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import { clients, contact, leader, manifesto, nav } from "@/lib/content";

const wrap = "mx-auto w-full max-w-[1440px] px-5 sm:px-10 lg:px-14";
const label = "text-[11px] uppercase tracking-[0.26em] text-slate";
const heading = "text-[clamp(2.6rem,5.6vw,5.2rem)] leading-[1] text-ink";
const field =
  "mt-2 w-full border-0 border-b border-ink/15 bg-transparent px-0 py-3 text-[15px] text-ink outline-none transition-colors duration-300 focus:border-ink";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />

        {/* Layers 0-2: each sheet slides up over the one before */}
        <div className="relative">
          {/* ---------- Layer 0: statement + numbers ---------- */}
          <StackLayer z={0}>
            <section id="approach" className="bg-white py-32 sm:py-44 lg:py-52">
              <div className={wrap}>
                <div className="max-w-[1180px]">
                  <Manifesto text={manifesto} accent={["quietly", "confidence"]} />
                </div>
                <div className="mt-28 sm:mt-36">
                  <Reveal>
                    <Stats />
                  </Reveal>
                </div>
              </div>
            </section>
          </StackLayer>

          {/* ---------- Layer 1: services (navy panel) ---------- */}
          <StackLayer z={10} rounded="rounded-[32px] sm:rounded-[48px]">
            <ServicesPanel />
          </StackLayer>

          {/* ---------- Layer 2: team ---------- */}
          <section
            id="team"
            className="relative z-20 rounded-t-[32px] bg-white py-28 shadow-[0_-40px_80px_-40px_rgba(11,26,40,0.45)] sm:rounded-t-[48px] sm:py-40"
          >
            <div className={`${wrap} grid items-end gap-12 lg:grid-cols-12 lg:gap-16`}>
              <Reveal className="curtain lg:col-span-7">
                <Parallax className="aspect-[4/3] rounded-[24px] bg-haze" amount={5}>
                  <Image src="/images/team.jpg" alt="The Innov8Search team" fill sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover" />
                </Parallax>
              </Reveal>
              <div className="lg:col-span-5 lg:pb-4">
                <Reveal className={`reveal ${label}`}>Our Team</Reveal>
                <Reveal delay={100} className="reveal mt-6 text-[15px] leading-7 text-slate">
                  {leader.intro}
                </Reveal>
                <MaskHeading
                  as="p"
                  className="accent mt-8 text-[clamp(1.9rem,3.2vw,3rem)] leading-[1.15] text-ink"
                  lines={[`“${leader.quote}”`]}
                />
                <Reveal delay={250} className="reveal mt-10">
                  <p className="font-display text-xl text-ink">{leader.name}</p>
                  <p className={`${label} mt-1`}>{leader.role}</p>
                </Reveal>
              </div>
            </div>
          </section>
        </div>

        {/* ---------- Clients + testimonials ---------- */}
        <section className="relative z-20 -mt-px bg-white pb-16 sm:pb-20">
          <div className={wrap}>
            <Reveal className={`reveal ${label}`}>Trusted across the sector</Reveal>
          </div>
          <div className="marquee-wrap fade-edges mt-10 overflow-hidden">
            <div className="marquee flex w-max items-center" style={{ "--speed": "60s" } as React.CSSProperties}>
              {[...clients, ...clients].map((c, i) => (
                <div key={i} className="flex h-24 w-44 shrink-0 items-center justify-center px-5 sm:w-56">
                  <Image
                    src={c.src}
                    alt={i < clients.length ? c.name : ""}
                    width={c.w}
                    height={c.h}
                    className="max-h-12 w-auto max-w-[150px] object-contain opacity-60 mix-blend-multiply grayscale transition duration-700 hover:opacity-100 hover:grayscale-0"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className={`${wrap} mt-24 sm:mt-32`}>
            <div className="mx-auto max-w-4xl text-center">
              <Reveal>
                <Testimonials />
              </Reveal>
            </div>
          </div>
        </section>

        {/* ---------- Contact ---------- */}
        <section id="contact" className="bg-white pb-36 pt-16 sm:pb-48 sm:pt-20">
          <div className={`${wrap} grid gap-16 lg:grid-cols-12`}>
            <div className="lg:col-span-5">
              <Reveal className={`reveal ${label}`}>Contact</Reveal>
              <MaskHeading className={`${heading} mt-6`} lines={["Let’s", <span key="a" className="accent">Talk.</span>]} />
              <Reveal delay={200} className="reveal mt-10 space-y-2 text-[15px] text-slate">
                <a href={`mailto:${contact.email}`} className="block w-fit text-ink underline-offset-4 hover:underline">
                  {contact.email}
                </a>
                {contact.phones.map((p) => (
                  <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="block w-fit hover:text-ink">
                    {p}
                  </a>
                ))}
              </Reveal>
              <Reveal delay={300} className="reveal mt-12">
                <a href="#contact" className="group inline-flex items-center gap-2 text-sm text-ink">
                  Looking for your next role? View vacancies
                  <ArrowUpRight size={15} strokeWidth={1.5} className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
                <p className="mt-2 text-xs text-slate/70">Live roles will feed from Atlas.</p>
              </Reveal>
            </div>

            <Reveal delay={150} className="reveal lg:col-span-6 lg:col-start-7">
              <form className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
                <label className="block">
                  <span className={label}>Name</span>
                  <input name="name" type="text" autoComplete="name" className={field} />
                </label>
                <label className="block">
                  <span className={label}>Email</span>
                  <input name="email" type="email" autoComplete="email" className={field} />
                </label>
                <label className="block sm:col-span-2">
                  <span className={label}>I&rsquo;m interested in</span>
                  <select name="type" defaultValue="" className={`${field} appearance-none`}>
                    <option value="" disabled>
                      Please choose
                    </option>
                    {contact.enquiryTypes.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </label>
                <label className="block sm:col-span-2">
                  <span className={label}>Message</span>
                  <textarea name="message" rows={3} className={`${field} resize-none`} />
                </label>
                <div className="flex flex-col-reverse items-start gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-slate/80">Handled in strict confidence.</p>
                  <button
                    type="button"
                    className="group inline-flex items-center gap-4 rounded-full bg-ink py-3 pl-6 pr-3 text-sm font-medium text-white transition-colors duration-500 hover:bg-navy"
                  >
                    Send
                    <span className="grid size-8 place-items-center rounded-full bg-white/15 transition-transform duration-500 group-hover:translate-x-0.5">
                      <ArrowRight size={15} strokeWidth={1.6} />
                    </span>
                  </button>
                </div>
              </form>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ---------- Footer ---------- */}
      <footer className="relative overflow-clip rounded-t-[32px] bg-ink text-white sm:rounded-t-[48px]">
        <div className={`${wrap} flow-root pt-20 sm:pt-28`}>
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
            <p className="accent text-3xl leading-tight text-white/90 sm:col-span-2 lg:col-span-6 lg:text-4xl">Get it right the first time.</p>
            <nav className="flex flex-col gap-3 text-sm text-white/60 lg:col-span-3">
              {nav.map((n) => (
                <a key={n.href} href={n.href} className="w-fit transition-colors hover:text-white">
                  {n.label}
                </a>
              ))}
            </nav>
            <div className="flex flex-col gap-3 text-sm text-white/60 lg:col-span-3">
              {contact.phones.map((p) => (
                <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="w-fit transition-colors hover:text-white">
                  {p}
                </a>
              ))}
              <a href={`mailto:${contact.email}`} className="w-fit transition-colors hover:text-white">
                {contact.email}
              </a>
            </div>
          </div>

          <div className="mt-20 flex flex-wrap justify-between gap-4 text-xs text-white/40 sm:mt-28">
            <span>&copy; Innov8Search</span>
            <span>Sydney &middot; Wellington &middot; London</span>
          </div>

          {/* Wordmark runs off the bottom of the page, fading as it goes */}
          <div className="mt-6 -mb-[6vw] sm:mt-8">
            <img
              src="/images/innov8-logo-white.svg"
              alt="Innov8Search"
              className="w-full [mask-image:linear-gradient(180deg,#000_20%,transparent_100%)]"
            />
          </div>
        </div>
      </footer>
    </>
  );
}
