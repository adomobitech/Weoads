"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, BookOpen, BriefcaseBusiness, Building2, ChevronDown, FileText, Globe2, Handshake, Layers3, Lightbulb, Megaphone, Newspaper, PlayCircle, Rocket, Sparkles, UsersRound } from "lucide-react";

type MenuItem = { title: string; description: string; href: string; icon: React.ComponentType<{ className?: string }> };

const serviceGroups = [
  { label: "Performance marketing", color: "text-indigo-600", items: [
    { title: "Search Engine Optimization", description: "Grow sustainable organic demand.", href: "/services/search-engine-optimization", icon: BarChart3 },
    { title: "Search Engine Marketing", description: "Capture high-intent searches.", href: "/services/search-engine-marketing", icon: Rocket },
    { title: "Social Media Marketing", description: "Turn attention into action.", href: "/services/social-media-marketing", icon: Sparkles },
    { title: "Content Marketing", description: "Build authority that converts.", href: "/services/content-marketing", icon: FileText },
  ]},
  { label: "Growth channels", color: "text-fuchsia-600", items: [
    { title: "Affiliate Marketing", description: "Create a partner-led revenue engine.", href: "/services/affiliate-marketing", icon: Handshake },
    { title: "Influencer Marketing", description: "Work with credible creators.", href: "/services/influencer-marketing", icon: UsersRound },
    { title: "Email Marketing", description: "Make every customer moment count.", href: "/services/email-marketing", icon: Megaphone },
    { title: "Mobile Marketing", description: "Reach people on the move.", href: "/services/mobile-marketing", icon: Globe2 },
  ]},
  { label: "Digital solutions", color: "text-cyan-600", items: [
    { title: "Web Development", description: "Fast websites built to perform.", href: "/services/web-development", icon: Layers3 },
    { title: "Brand Strategy", description: "Clarify your category and voice.", href: "/services/brand-strategy", icon: Lightbulb },
    { title: "Lead Generation", description: "Fill your pipeline with intent.", href: "/services/lead-generation", icon: Rocket },
    { title: "Market Research", description: "Make decisions with confidence.", href: "/services/market-research-insights", icon: BookOpen },
  ]},
];

const companyItems: MenuItem[] = [
  { title: "About WeoAds", description: "Meet the people behind the platform.", href: "/about", icon: Building2 }, { title: "Careers", description: "Build the next era of growth with us.", href: "/careers", icon: BriefcaseBusiness }, { title: "Creator Program", description: "Partner with brands and audiences.", href: "/creator-program", icon: PlayCircle }, { title: "Partner Program", description: "Grow stronger together.", href: "/partner-program", icon: Handshake },
];
const resourceItems: MenuItem[] = [
  { title: "Insights", description: "Practical growth ideas and analysis.", href: "/resources", icon: Newspaper }, { title: "Case Studies", description: "See how teams scale with WeoAds.", href: "/case-studies", icon: BarChart3 }, { title: "Help Center", description: "Answers for every stage of growth.", href: "/help-center", icon: BookOpen }, { title: "API Documentation", description: "Build with our performance tools.", href: "/api-documentation", icon: FileText },
];

function MegaPanel({ groups, items, cyan = false }: { groups?: typeof serviceGroups; items?: MenuItem[]; cyan?: boolean }) {
  if (groups) return <div className="absolute left-1/2 top-full z-50 hidden w-[min(1120px,calc(100vw-48px))] -translate-x-1/2 pt-5 group-hover:block"><div className="rounded-[28px] border border-slate-100 bg-white p-6 shadow-[0_30px_80px_rgba(36,48,83,.18)]"><div className="grid grid-cols-3 gap-5">{groups.map((group) => <div key={group.label} className="rounded-2xl bg-slate-50/70 p-4"><p className={`mb-3 text-[10px] font-black uppercase tracking-[.16em] ${group.color}`}>{group.label}</p><div className="space-y-1">{group.items.map((item) => <Link key={item.href} href={item.href} className="group/item flex gap-3 rounded-xl p-2.5 transition hover:bg-white hover:shadow-sm"><item.icon className={`mt-0.5 h-4 w-4 shrink-0 ${group.color}`} /><span><span className="block text-xs font-bold text-slate-900 group-hover/item:text-indigo-600">{item.title}</span><span className="block text-[10px] leading-4 text-slate-500">{item.description}</span></span></Link>)}</div></div>)}</div><div className="mt-5 flex items-center justify-between rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-600 to-cyan-500 px-5 py-4 text-white"><div><p className="text-sm font-bold">Not sure where to start?</p><p className="text-xs text-indigo-100">Let’s make a plan built around your next growth goal.</p></div><Link href="/contact" className="rounded-xl bg-white px-4 py-2 text-xs font-bold text-indigo-600">Talk to an expert →</Link></div></div></div>;
  return <div className="absolute left-1/2 top-full z-50 hidden w-[520px] -translate-x-1/2 pt-5 group-hover:block"><div className="rounded-[28px] border border-slate-100 bg-white p-4 shadow-[0_30px_80px_rgba(36,48,83,.18)]"><div className="grid grid-cols-2 gap-2">{items?.map((item) => <Link key={item.href} href={item.href} className="group/item flex gap-3 rounded-2xl p-3 transition hover:bg-slate-50"><div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${cyan ? "bg-cyan-50 text-cyan-600" : "bg-indigo-50 text-indigo-600"}`}><item.icon className="h-5 w-5" /></div><span><span className="block text-sm font-bold text-slate-900">{item.title}</span><span className="block text-xs leading-4 text-slate-500">{item.description}</span></span></Link>)}</div></div></div>;
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false); const [mobileServices, setMobileServices] = useState(false); const pathname = usePathname(); const active = (href: string) => href === "/" ? pathname === href : pathname.startsWith(href);
  const mobileLinks = [{ label: "Advertisers", href: "/advertisers" }, { label: "Publishers", href: "/publishers" }, { label: "Resources", href: "/resources" }, { label: "Company", href: "/about" }];
  return <nav className="relative z-50 w-full bg-[#FAFBFF]"><div className="flex min-h-[80px] items-center justify-between px-6 py-4 md:px-12"><Link href="/" className="relative h-12 w-44 shrink-0 md:h-14 md:w-52"><Image src="/logo.png" alt="WeoAds" fill priority className="object-contain object-left mix-blend-multiply" /></Link><div className="hidden items-center gap-7 text-sm font-semibold text-slate-600 lg:flex"><Link className={active("/") ? "border-b-2 border-indigo-600 pb-1 text-indigo-600" : "pb-1 hover:text-indigo-600"} href="/">Home</Link><Link className={active("/advertisers") ? "border-b-2 border-indigo-600 pb-1 text-indigo-600" : "pb-1 hover:text-indigo-600"} href="/advertisers">Advertisers</Link><Link className={active("/publishers") ? "border-b-2 border-indigo-600 pb-1 text-indigo-600" : "pb-1 hover:text-indigo-600"} href="/publishers">Publishers</Link><div className="group relative"><button className={`flex items-center gap-1 pb-1 hover:text-indigo-600 ${pathname.startsWith("/services") ? "border-b-2 border-indigo-600 text-indigo-600" : ""}`}>Services <ChevronDown className="h-3.5 w-3.5" /></button><MegaPanel groups={serviceGroups} /></div><div className="group relative"><button className="flex items-center gap-1 pb-1 hover:text-indigo-600">Resources <ChevronDown className="h-3.5 w-3.5" /></button><MegaPanel items={resourceItems} cyan /></div><div className="group relative"><button className="flex items-center gap-1 pb-1 hover:text-indigo-600">Company <ChevronDown className="h-3.5 w-3.5" /></button><MegaPanel items={companyItems} /></div></div><Link href="/contact" className="hidden rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 lg:block">Get Started →</Link><button onClick={() => setMobileOpen(!mobileOpen)} className="rounded-lg p-2 text-slate-800 lg:hidden" aria-label="Toggle menu"><span className="block text-2xl leading-none">{mobileOpen ? "×" : "☰"}</span></button></div>{mobileOpen && <div className="absolute w-full border-t border-slate-100 bg-white px-6 py-5 shadow-xl lg:hidden"><div className="flex flex-col gap-1">{mobileLinks.map((link) => <Link key={link.href} onClick={() => setMobileOpen(false)} href={link.href} className="rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-indigo-50">{link.label}</Link>)}<button onClick={() => setMobileServices(!mobileServices)} className="flex items-center justify-between rounded-xl px-3 py-3 text-left text-sm font-semibold text-slate-700">Services <ChevronDown className="h-4 w-4" /></button>{mobileServices && <div className="grid grid-cols-2 gap-2 px-3 pb-3">{serviceGroups.flatMap((group) => group.items).map((item) => <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className="text-xs font-medium text-slate-500 hover:text-indigo-600">{item.title}</Link>)}</div>}<Link onClick={() => setMobileOpen(false)} href="/contact" className="mt-3 rounded-xl bg-indigo-600 px-4 py-3 text-center text-sm font-bold text-white">Get Started →</Link></div></div>}</nav>;
}
