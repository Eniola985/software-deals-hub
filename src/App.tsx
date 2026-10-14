import React, { useState, useEffect } from 'react';
import {
  DollarSign,
  TrendingUp,
  Sparkles,
  ExternalLink,
  Search,
  Filter,
  CheckCircle2,
  Copy,
  Check,
  ShieldCheck,
  Zap,
  Sliders,
  ArrowRight,
  MousePointerClick,
  Settings,
  Gift,
  HelpCircle,
  Eye,
  Star,
  Layers,
  ShoppingBag,
  Server,
  CreditCard,
  BarChart3,
  Bot,
  Percent,
  Bookmark,
  Share2,
} from 'lucide-react';

export interface SoftwareTool {
  id: string;
  name: string;
  tagline: string;
  category: 'Hosting' | 'E-commerce' | 'Banking & Payments' | 'SEO & Growth' | 'AI & Automation';
  rating: number;
  reviewCount: number;
  verifiedBadge: string;
  visitorDeal: string;
  dealCode?: string;
  description: string;
  keyFeatures: string[];
  // Affiliate & monetization properties
  defaultAffiliateUrl: string;
  customAffiliateUrl?: string;
  commissionType: string;
  payoutRate: string;
  avgEpcUsd: number; // estimated earnings per click
  clicksCount: number;
  bestFor: string;
}

const DEFAULT_TOOLS: SoftwareTool[] = [
  {
    id: 'hostinger',
    name: 'Hostinger Cloud & Web Hosting',
    tagline: 'High-speed cloud hosting with free domain & 1-click WordPress / Node setup.',
    category: 'Hosting',
    rating: 4.9,
    reviewCount: 3840,
    verifiedBadge: 'Editor Choice #1 Hosting',
    visitorDeal: 'Up to 75% OFF + Free Domain & SSL',
    dealCode: 'SAVE75PRO',
    description:
      'Ideal for deploying new web apps, blogs, ecommerce stores, and client websites. Industry-leading 99.9% uptime and 24/7 priority support.',
    keyFeatures: ['Free custom domain for 1 year', 'Unlimited SSL certificates', 'Automated daily backups', 'Worldwide Cloudflare CDN'],
    defaultAffiliateUrl: 'https://www.hostinger.com/web-hosting',
    commissionType: 'CPA Bounty',
    payoutRate: '$65 to $150 per paid sale',
    avgEpcUsd: 4.25,
    clicksCount: 184,
    bestFor: 'Developers, startups & agencies building web apps or client sites.',
  },
  {
    id: 'shopify',
    name: 'Shopify E-Commerce Platform',
    tagline: 'The world’s leading commerce engine powering millions of global stores.',
    category: 'E-commerce',
    rating: 4.9,
    reviewCount: 7120,
    verifiedBadge: 'Top High-Yield Bounty',
    visitorDeal: '$1/Month for First 3 Months Special Promotion',
    dealCode: 'SHOPIFY1',
    description:
      'Turn any idea into a high-converting online storefront. Handles credit cards, inventory, shipping labels, and global sales taxes out of the box.',
    keyFeatures: ['Point-of-sale & online store sync', 'Built-in payment processor (Shop Pay)', 'Over 8,000 app store extensions', 'Automated abandoned cart recovery'],
    defaultAffiliateUrl: 'https://www.shopify.com/free-trial',
    commissionType: 'High Bounty Referral',
    payoutRate: '$150 flat per paying merchant',
    avgEpcUsd: 6.8,
    clicksCount: 96,
    bestFor: 'Entrepreneurs launching physical, digital, or dropshipping stores.',
  },
  {
    id: 'semrush',
    name: 'Semrush SEO & Competitor Spy Suite',
    tagline: 'Uncover your competitors’ exact keywords, backlink strategies, and top ad campaigns.',
    category: 'SEO & Growth',
    rating: 4.8,
    reviewCount: 2950,
    verifiedBadge: 'Dual Bounty ($200 + $10)',
    visitorDeal: '14-Day Free Pro Trial ($129.95 Value)',
    dealCode: 'SEMPRO14',
    description:
      'The definitive all-in-one digital marketing tool. Analyze search volume, organic search rankings, backlink profiles, and social benchmarks.',
    keyFeatures: ['Keyword magic tool with 25B+ queries', 'Full site SEO audit & health report', 'Competitor ad spend & copy tracker', 'Rank tracking with daily alerts'],
    defaultAffiliateUrl: 'https://www.semrush.com',
    commissionType: 'Dual Bounty',
    payoutRate: '$200 per sale + $10 for every Free Trial',
    avgEpcUsd: 8.5,
    clicksCount: 112,
    bestFor: 'Founders, SEO specialists & agencies seeking high organic Google rankings.',
  },
  {
    id: 'wise',
    name: 'Wise Business (TransferWise)',
    tagline: 'Send, receive, and spend money globally with the real mid-market exchange rate.',
    category: 'Banking & Payments',
    rating: 4.9,
    reviewCount: 5410,
    verifiedBadge: 'Lowest Fee Guarantee',
    visitorDeal: 'First $600 International Transfer Completely Fee-Free',
    dealCode: 'WISEFREE',
    description:
      'Get local bank account numbers in USD, EUR, GBP, AUD, and CAD. Say goodbye to 3-5% hidden bank fees when receiving international client payments.',
    keyFeatures: ['Multi-currency debit business cards', 'Direct integration with Xero & QuickBooks', 'Real exchange rates without hidden markups', 'Batch payments to 1,000 people at once'],
    defaultAffiliateUrl: 'https://wise.com/business',
    commissionType: 'Lead Bounty',
    payoutRate: '$50 per verified business account',
    avgEpcUsd: 3.9,
    clicksCount: 78,
    bestFor: 'Freelancers, digital nomads, and companies receiving overseas payments.',
  },
  {
    id: 'jasper',
    name: 'Jasper AI Content & Viral Copy Engine',
    tagline: 'Enterprise-grade AI copywriting trained on the top 10% highest-converting marketing copy.',
    category: 'AI & Automation',
    rating: 4.7,
    reviewCount: 4100,
    verifiedBadge: 'Recurring Lifetime Income',
    visitorDeal: '7-Day Free Trial + 10,000 Bonus Words',
    dealCode: 'AI10KWORDS',
    description:
      'Creates viral X threads, long-form SEO articles, high-converting Facebook ads, and personalized email nurture sequences in seconds.',
    keyFeatures: ['Brand Voice memory & custom tone matching', 'Over 50+ proven copywriting frameworks', 'Plagiarism detection built-in', 'Chrome extension for Google Docs & Gmail'],
    defaultAffiliateUrl: 'https://www.jasper.ai',
    commissionType: '30% Lifetime Recurring',
    payoutRate: '30% recurring monthly ($15 – $45/mo forever)',
    avgEpcUsd: 5.6,
    clicksCount: 145,
    bestFor: 'Marketers, solo creators & copywriters scaling their publishing pipeline.',
  },
];

export default function App() {
  // Navigation & state
  const [tools, setTools] = useState<SoftwareTool[]>(() => {
    const saved = localStorage.getItem('creative_studio_tools_v1');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_TOOLS;
      }
    }
    return DEFAULT_TOOLS;
  });

  const [activeTab, setActiveTab] = useState<'directory' | 'stack-builder' | 'launch-kit' | 'admin-settings' | 'payout-guide'>('directory');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [clickAlert, setClickAlert] = useState<{ name: string; payout: string } | null>(null);

  // Stack Builder Quiz state
  const [projectGoal, setProjectGoal] = useState<'saas' | 'ecommerce' | 'agency' | 'creator'>('saas');
  const [monthlyBudgetTier, setMonthlyBudgetTier] = useState<number>(50);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('creative_studio_tools_v1', JSON.stringify(tools));
  }, [tools]);

  // Aggregate stats
  const totalClicks = tools.reduce((acc, t) => acc + t.clicksCount, 0);
  const totalSimulatedEarnings = tools.reduce((acc, t) => acc + t.clicksCount * t.avgEpcUsd, 0);

  const handleToolClick = (tool: SoftwareTool) => {
    // 1. Increment clicks and revenue in state
    setTools((prev) =>
      prev.map((t) => (t.id === tool.id ? { ...t, clicksCount: t.clicksCount + 1 } : t))
    );

    // 2. Trigger notification
    setClickAlert({ name: tool.name, payout: tool.payoutRate });
    setTimeout(() => setClickAlert(null), 4500);

    // 3. Open tracking URL
    const targetUrl = tool.customAffiliateUrl && tool.customAffiliateUrl.trim() !== ''
      ? tool.customAffiliateUrl
      : tool.defaultAffiliateUrl;

    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleUpdateAffiliateLink = (toolId: string, customUrl: string) => {
    setTools((prev) =>
      prev.map((t) => (t.id === toolId ? { ...t, customAffiliateUrl: customUrl } : t))
    );
  };

  const [showGuideBanner, setShowGuideBanner] = useState(true);

  // Helper to ensure shared link is the PUBLIC accessible URL (ais-pre instead of private ais-dev)
  const getPublicShareUrl = () => {
    return 'https://ais-pre-i5swhufpphwqtudv5qzoxd-68290194744.europe-west2.run.app';
  };

  const handleShareWhatsApp = () => {
    const url = getPublicShareUrl();
    const msg = encodeURIComponent(`Hey! Check out this free hub for up to 75% off hosting, e-commerce, and business tools: ${url}`);
    window.open(`https://api.whatsapp.com/send?text=${msg}`, '_blank');
  };

  const handleShareTwitter = () => {
    const url = getPublicShareUrl();
    const msg = encodeURIComponent(`Top software discounts and verified startup tools in one place: ${url}`);
    window.open(`https://twitter.com/intent/tweet?text=${msg}`, '_blank');
  };

  // Filter tools
  const filteredTools = tools.filter((tool) => {
    const matchesCat = selectedCategory === 'All' || tool.category === selectedCategory;
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Value Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 px-4 py-2 text-center text-xs font-semibold text-white tracking-wide flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 animate-pulse" />
        <span>Verified Partner Hub: Claim up to $500 in Exclusive Software Discounts & Extended Free Trials</span>
      </div>

      {/* Main Header */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <DollarSign className="w-5 h-5 text-slate-950 font-black" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white tracking-tight text-base">Creative Studio</span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                  SaaS Affiliate Hub
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Curated high-converting business tools with exclusive deals
              </p>
            </div>
          </div>

          {/* Real-time Earnings & Click Counter Bar */}
          <div className="flex items-center gap-3">
            <div className="bg-slate-950 px-3.5 py-1.5 rounded-xl border border-emerald-500/30 flex items-center gap-3 shadow-inner">
              <div className="text-right">
                <span className="text-[10px] uppercase text-slate-400 block font-mono">Your Est. Earnings</span>
                <span className="text-sm font-bold font-mono text-emerald-400">
                  ${totalSimulatedEarnings.toFixed(2)}
                </span>
              </div>
              <div className="h-6 w-px bg-slate-800" />
              <div className="text-right">
                <span className="text-[10px] uppercase text-slate-400 block font-mono">Total Clicks</span>
                <span className="text-sm font-bold font-mono text-white">{totalClicks}</span>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('admin-settings')}
              title="Configure your custom affiliate IDs"
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                activeTab === 'admin-settings'
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                  : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white hover:border-slate-600'
              }`}
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="border-b border-slate-800/80 bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-6 py-2.5 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setActiveTab('directory')}
              className={`px-3.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'directory'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Software Directory & Deals</span>
            </button>

            <button
              onClick={() => setActiveTab('stack-builder')}
              className={`px-3.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'stack-builder'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Smart Stack Recommender</span>
            </button>

            <button
              onClick={() => setActiveTab('launch-kit')}
              className={`px-3.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'launch-kit'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Viral Launch & Promo Kit</span>
            </button>

            <button
              onClick={() => setActiveTab('admin-settings')}
              className={`px-3.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'admin-settings'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Your Affiliate Links & Setup</span>
            </button>

            <button
              onClick={() => setActiveTab('payout-guide')}
              className={`px-3.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'payout-guide'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5" />
              <span>Payout Rates & Networks</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShareWhatsApp}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
            >
              <span>Share on WhatsApp</span>
            </button>

            <button
              onClick={() => {
                const url = getPublicShareUrl();
                navigator.clipboard.writeText(url);
                setCopiedId('top-url');
                setTimeout(() => setCopiedId(null), 2000);
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 flex items-center gap-1.5 cursor-pointer"
            >
              {copiedId === 'top-url' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedId === 'top-url' ? 'Copied Public Link!' : 'Copy Public Link'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Click Alert */}
      {clickAlert && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-950/95 border border-emerald-500 text-emerald-200 px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-md animate-in slide-in-from-bottom">
          <div className="w-9 h-9 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">
            <DollarSign className="w-5 h-5 font-black" />
          </div>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>Affiliate Link Clicked!</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">Redirecting</span>
            </div>
            <div className="text-[11px] text-emerald-300">
              Visitor opened <strong className="text-white">{clickAlert.name}</strong> ({clickAlert.payout}).
            </div>
          </div>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-8 space-y-8">
        {/* BEGINNER EXPLANATION BANNER */}
        {showGuideBanner && (
          <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950/70 via-slate-900 to-slate-900 border border-emerald-500/40 relative shadow-2xl space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Beginner Guide &bull; How This Earns You Money</span>
                </span>
                <h2 className="text-lg font-bold text-white">
                  How You Get Paid Into Your Bank Account in 4 Simple Steps
                </h2>
              </div>
              <button
                onClick={() => setShowGuideBanner(false)}
                className="text-xs text-slate-500 hover:text-slate-300 px-2 py-1 rounded bg-slate-950 border border-slate-800 cursor-pointer"
              >
                Hide Guide
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs pt-1">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-xs">
                  1
                </div>
                <div className="font-bold text-white">You Share This Website</div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Click <strong>"Share on WhatsApp"</strong> or post your website link on social media or group chats.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center text-xs">
                  2
                </div>
                <div className="font-bold text-white">People Find Free Deals</div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Visitors use the free calculators and see exclusive discounts on hosting, Shopify, and tools.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 font-bold flex items-center justify-center text-xs">
                  3
                </div>
                <div className="font-bold text-white">They Click & Sign Up</div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  When they click <strong>"Claim Deal & Open"</strong>, the company knows they came through your link.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <div className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 font-black flex items-center justify-center text-xs">
                  $
                </div>
                <div className="font-bold text-emerald-400">Company Pays You Cash</div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Hostinger gives you $65, Shopify gives you $150, Wise gives you $50 sent directly to your PayPal/Bank.
                </p>
              </div>
            </div>

            {/* PUBLIC SHARE LINK BOX */}
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-emerald-500/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase font-mono text-emerald-400 font-bold block">
                  🌐 Your Public Share Link (Works for Anyone on WhatsApp & Mobile Without Login):
                </span>
                <span className="font-mono text-slate-200 text-xs break-all select-all">
                  {getPublicShareUrl()}
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    const url = getPublicShareUrl();
                    navigator.clipboard.writeText(url);
                    setCopiedId('public-box');
                    setTimeout(() => setCopiedId(null), 2000);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1 cursor-pointer"
                >
                  {copiedId === 'public-box' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === 'public-box' ? 'Copied Public URL!' : 'Copy Link'}</span>
                </button>
                <a
                  href={getPublicShareUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs flex items-center gap-1"
                >
                  <span>Test in New Tab</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 border-t border-slate-800/80">
              <span className="text-emerald-300">
                💡 <strong>Realistic Math:</strong> If just 5 people sign up for Hostinger or Shopify this month, you make <strong>$325 to $750</strong>!
              </span>
              <button
                onClick={() => setActiveTab('admin-settings')}
                className="text-xs text-emerald-400 hover:text-emerald-300 font-bold underline cursor-pointer"
              >
                Plug in your real affiliate links &rarr;
              </button>
            </div>
          </div>
        )}
        {/* ========================================================= */}
        {/* TAB 1: SOFTWARE DIRECTORY & EXCLUSIVE DEALS               */}
        {/* ========================================================= */}
        {activeTab === 'directory' && (
          <div className="space-y-6">
            {/* Hero Header */}
            <div className="bg-gradient-to-br from-slate-900/90 via-slate-900 to-emerald-950/30 p-6 md:p-8 rounded-3xl border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-2xl space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                  <Percent className="w-3.5 h-3.5" />
                  <span>Verified Deals & Direct Partner Links</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  High-Performance Software & Business Deals
                </h1>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Every tool below has been hand-tested for founders, creators, and online businesses.
                  Click <strong className="text-emerald-400">"Claim Deal & Open"</strong> to unlock exclusive promo pricing or extended free trials.
                </p>
              </div>

              {/* Quick stats badge */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 shrink-0 space-y-1 text-xs">
                <div className="text-slate-400">Total Available Discounts</div>
                <div className="text-2xl font-bold font-mono text-emerald-400">$650+ / User</div>
                <div className="text-[11px] text-slate-500">Updated Daily &bull; 100% Free Access</div>
              </div>
            </div>

            {/* Filters & Search Controls */}
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
                {['All', 'Hosting', 'E-commerce', 'SEO & Growth', 'Banking & Payments', 'AI & Automation'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                        : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search tools or features..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 pl-9 pr-3 py-2 rounded-xl text-xs text-white placeholder-slate-500 outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            {/* Tools Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredTools.map((tool) => (
                <div
                  key={tool.id}
                  className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all duration-200 flex flex-col justify-between space-y-5 shadow-lg group relative overflow-hidden"
                >
                  <div className="space-y-4">
                    {/* Card Top: Badges & Rating */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {tool.verifiedBadge}
                      </span>
                      <div className="flex items-center gap-1 text-amber-400 text-xs font-semibold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{tool.rating}</span>
                        <span className="text-slate-500 text-[10px]">({tool.reviewCount})</span>
                      </div>
                    </div>

                    {/* Title & Tagline */}
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors flex items-center justify-between">
                        <span>{tool.name}</span>
                        <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-emerald-400" />
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        {tool.tagline}
                      </p>
                    </div>

                    {/* Exclusive Promo Deal Box */}
                    <div className="p-3.5 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[11px] font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                          <Gift className="w-3.5 h-3.5" />
                          <span>{tool.visitorDeal}</span>
                        </span>
                        {tool.dealCode && (
                          <button
                            onClick={() => handleCopyCode(tool.dealCode!, tool.id)}
                            className="text-[10px] font-mono bg-slate-900 hover:bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700 flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            {copiedId === tool.id ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span>Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Code: {tool.dealCode}</span>
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Key Features Bullet List */}
                    <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                      {tool.keyFeatures.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom CTA & Affiliate Payout Info */}
                  <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="text-[11px] text-slate-400">
                      <span className="text-slate-500 block text-[10px]">BEST FOR</span>
                      <span className="line-clamp-1 text-slate-300">{tool.bestFor}</span>
                    </div>

                    <button
                      onClick={() => handleToolClick(tool)}
                      className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-lg shadow-emerald-500/20 cursor-pointer shrink-0"
                    >
                      <span>Claim Deal & Open</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: SMART STACK RECOMMENDER (INTERACTIVE QUIZ)         */}
        {/* ========================================================= */}
        {activeTab === 'stack-builder' && (
          <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-8">
            <div className="max-w-2xl space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Interactive Tool Matcher</span>
              </div>
              <h2 className="text-2xl font-bold text-white">Find Your Perfect Software Stack in 30 Seconds</h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Answer 2 quick questions to calculate your optimal software stack, projected monthly costs, and instant bonus savings.
              </p>
            </div>

            {/* Question 1: Goal */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                1. What is your primary venture or project?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { id: 'saas', label: 'Web / SaaS App', icon: Server, desc: 'Hosting + Payments + SEO' },
                  { id: 'ecommerce', label: 'Online Store / Brand', icon: ShoppingBag, desc: 'Shopify + Payments' },
                  { id: 'agency', label: 'Agency / Freelancer', icon: CreditCard, desc: 'Wise + AI Copy + SEO' },
                  { id: 'creator', label: 'Content Creator', icon: Bot, desc: 'Jasper AI + Hosting' },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = projectGoal === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setProjectGoal(item.id as any)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-950/20 border-emerald-500 text-white shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500/40'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <Icon className={`w-5 h-5 mb-2 ${isSelected ? 'text-emerald-400' : 'text-slate-500'}`} />
                      <div className="font-bold text-sm text-white">{item.label}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{item.desc}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Question 2: Monthly Budget */}
            <div className="space-y-3 p-5 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-bold uppercase tracking-wider">
                  2. What is your monthly software budget?
                </span>
                <span className="font-mono text-emerald-400 font-bold text-sm">${monthlyBudgetTier}/mo</span>
              </div>
              <input
                type="range"
                min="10"
                max="250"
                step="10"
                value={monthlyBudgetTier}
                onChange={(e) => setMonthlyBudgetTier(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>$10/mo (Bootstrapped)</span>
                <span>$100/mo (Growth)</span>
                <span>$250+/mo (Scale)</span>
              </div>
            </div>

            {/* Generated Bundle Result */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/30 via-slate-950 to-slate-900 border border-emerald-500/40 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div>
                  <span className="text-[11px] font-mono text-emerald-400 font-bold">RECOMMENDED STACK</span>
                  <h3 className="text-lg font-bold text-white capitalize">
                    {projectGoal === 'saas' && 'The High-Growth SaaS Builder Stack'}
                    {projectGoal === 'ecommerce' && 'The 6-Figure E-Commerce Storefront Stack'}
                    {projectGoal === 'agency' && 'The Remote Agency & Freelance Cashflow Stack'}
                    {projectGoal === 'creator' && 'The Autonomous AI Creator Pipeline'}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">Total Combined Savings</span>
                  <span className="text-lg font-bold font-mono text-emerald-400">$380+ Off Year 1</span>
                </div>
              </div>

              {/* Matching Tools */}
              <div className="space-y-3">
                {tools
                  .filter((t) => {
                    if (projectGoal === 'saas') return t.id === 'hostinger' || t.id === 'semrush';
                    if (projectGoal === 'ecommerce') return t.id === 'shopify' || t.id === 'wise';
                    if (projectGoal === 'agency') return t.id === 'wise' || t.id === 'semrush';
                    return t.id === 'jasper' || t.id === 'hostinger';
                  })
                  .map((recTool) => (
                    <div
                      key={recTool.id}
                      className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">{recTool.name}</span>
                          <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
                            {recTool.visitorDeal}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">{recTool.tagline}</p>
                      </div>

                      <button
                        onClick={() => handleToolClick(recTool)}
                        className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer shrink-0"
                      >
                        <span>Activate Bonus & Open</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB: VIRAL LAUNCH & PROMO KIT                             */}
        {/* ========================================================= */}
        {activeTab === 'launch-kit' && (
          <div className="space-y-6">
            <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                <Share2 className="w-3.5 h-3.5" />
                <span>Ready-To-Post Promotion Kit</span>
              </div>
              <h2 className="text-2xl font-bold text-white">How to Get 500+ Visitors in the Next 48 Hours</h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Copy and paste these pre-written, high-engagement promotional posts directly to X (Twitter), LinkedIn, Reddit, or your blog.
                Each template is crafted to spark curiosity and drive people to test your software deals!
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Template 1: X / Twitter Viral Thread */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      X / Twitter Thread
                    </span>
                    <span className="text-xs text-slate-500">Est. 2,000 - 15,000 Impressions</span>
                  </div>
                  <h3 className="font-bold text-white text-base">The "5 Tools to Launch for $30" Thread</h3>
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto">
{`Most founders overpay thousands on software.

Here is the exact 5-tool stack I use to launch & scale businesses for under $30/mo (with secret discount codes): 🧵

1. Hostinger: High-speed cloud hosting (75% off + free domain)
2. Shopify: $1/mo for 3 months to sell anything
3. Wise: Zero international banking & transfer fees
4. Semrush: 14-day free pro trial to steal competitor keywords
5. Jasper AI: 30% faster copywriting & viral social hooks

I compiled all the discount links & promo codes in one free calculator here:
${getPublicShareUrl()}`}
                  </div>
                </div>

                <button
                  onClick={() => {
                    const text = `Most founders overpay thousands on software.\n\nHere is the exact 5-tool stack I use to launch & scale businesses for under $30/mo (with secret discount codes): 🧵\n\n1. Hostinger: 75% off + free domain\n2. Shopify: $1/mo for 3 months\n3. Wise: Zero foreign exchange fees\n4. Semrush: 14-day free pro trial\n5. Jasper AI: Viral marketing copy\n\nI compiled all the discount links & promo codes in one free hub here:\n${getPublicShareUrl()}`;
                    handleCopyCode(text, 'x-thread');
                  }}
                  className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
                >
                  {copiedId === 'x-thread' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedId === 'x-thread' ? 'Copied to Clipboard!' : 'Copy X / Twitter Thread'}</span>
                </button>
              </div>

              {/* Template 2: LinkedIn Value Post */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      LinkedIn Post
                    </span>
                    <span className="text-xs text-slate-500">Best for B2B & Agency Clients</span>
                  </div>
                  <h3 className="font-bold text-white text-base">The "Software Overhead Audit" Post</h3>
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto">
{`A quick software audit saved our team $4,200 this year.

If you are running an online store, agency, or digital project, you might be paying full price for tools that offer massive upfront promotions:

- Hostinger offers 75% off with free domain & SSL
- Shopify has a $1/month pilot for your first 90 days
- Wise saves 3-5% on overseas vendor wires
- Semrush provides a 14-day full Pro trial
- Jasper AI gives 10k complimentary words for content

I created a free interactive directory that matches your monthly budget with verified discounts.

Check it out free here: ${getPublicShareUrl()}`}
                  </div>
                </div>

                <button
                  onClick={() => {
                    const text = `A quick software audit saved our team $4,200 this year.\n\nIf you are running an online store, agency, or digital project, you might be paying full price for tools that offer massive upfront promotions:\n\n- Hostinger offers 75% off with free domain & SSL\n- Shopify has a $1/month pilot for your first 90 days\n- Wise saves 3-5% on overseas vendor wires\n- Semrush provides a 14-day full Pro trial\n- Jasper AI gives 10k complimentary words for content\n\nI created a free interactive directory that matches your monthly budget with verified discounts.\n\nCheck it out free here: ${getPublicShareUrl()}`;
                    handleCopyCode(text, 'linkedin-post');
                  }}
                  className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
                >
                  {copiedId === 'linkedin-post' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedId === 'linkedin-post' ? 'Copied to Clipboard!' : 'Copy LinkedIn Post'}</span>
                </button>
              </div>

              {/* Template 3: Reddit Post (r/SideProject, r/Entrepreneur) */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-orange-500/10 text-orange-400 border border-orange-500/20">
                      Reddit (r/SideProject, r/SaaS)
                    </span>
                    <span className="text-xs text-slate-500">High Organic Trust</span>
                  </div>
                  <h3 className="font-bold text-white text-base">Humble Launch & Feedback Request</h3>
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto">
{`Title: I got tired of overpaying for software tools, so I built a free directory with verified deals & stack recommender

Hey everyone! As someone building side projects, software subscriptions can quickly eat up your entire runway.

I built a free tool that curates verified promotional deals (like Hostinger 75% off, Shopify $1/mo, Semrush Pro trials, Wise fee-free transfers).

There is also a 2-question quiz to recommend your ideal stack based on your budget.

Link: ${getPublicShareUrl()}

Would love your thoughts on what other tools or deals I should add!`}
                  </div>
                </div>

                <button
                  onClick={() => {
                    const text = `Title: I got tired of overpaying for software tools, so I built a free directory with verified deals & stack recommender\n\nHey everyone! As someone building side projects, software subscriptions can quickly eat up your entire runway.\n\nI built a free tool that curates verified promotional deals (like Hostinger 75% off, Shopify $1/mo, Semrush Pro trials, Wise fee-free transfers).\n\nThere is also a 2-question quiz to recommend your ideal stack based on your budget.\n\nLink: ${getPublicShareUrl()}\n\nWould love your thoughts on what other tools or deals I should add!`;
                    handleCopyCode(text, 'reddit-post');
                  }}
                  className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
                >
                  {copiedId === 'reddit-post' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedId === 'reddit-post' ? 'Copied to Clipboard!' : 'Copy Reddit Post'}</span>
                </button>
              </div>

              {/* Template 4: Embed Widget for Blogs & GitHub */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20">
                      Embed Widget & Badge
                    </span>
                    <span className="text-xs text-slate-500">For Your Website, Blog, or GitHub</span>
                  </div>
                  <h3 className="font-bold text-white text-base">Embeddable Promo Banner Badge</h3>
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto">
{`<a href="${getPublicShareUrl()}" target="_blank" rel="noopener noreferrer">
  <img src="https://img.shields.io/badge/Verified_Deals-Save_$500_on_Software-059669?style=for-the-badge&logo=sparkles" alt="Verified Software Deals" />
</a>`}
                  </div>
                </div>

                <button
                  onClick={() => {
                    const text = `<a href="${getPublicShareUrl()}" target="_blank" rel="noopener noreferrer">\n  <img src="https://img.shields.io/badge/Verified_Deals-Save_$500_on_Software-059669?style=for-the-badge&logo=sparkles" alt="Verified Software Deals" />\n</a>`;
                    handleCopyCode(text, 'embed-code');
                  }}
                  className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
                >
                  {copiedId === 'embed-code' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedId === 'embed-code' ? 'Copied to Clipboard!' : 'Copy Embed Code'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: ADMIN SETTINGS (SET CUSTOM AFFILIATE IDS)          */}
        {/* ========================================================= */}
        {activeTab === 'admin-settings' && (
          <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                <Settings className="w-3.5 h-3.5" />
                <span>Your Affiliate Link Dashboard</span>
              </div>
              <h2 className="text-2xl font-bold text-white">Plug In Your Real Affiliate URLs</h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Replace any of the default demo links below with your personal referral links from Hostinger, Shopify, Wise, Semrush, or Jasper.
                The changes are saved instantly, so every visitor click earns you real cash.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              {tools.map((tool) => (
                <div key={tool.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-sm font-bold text-white">{tool.name}</span>
                      <span className="ml-2 text-xs font-mono text-emerald-400">({tool.payoutRate})</span>
                    </div>
                    <div className="text-xs text-slate-400">
                      Total Clicks Recorded:{' '}
                      <strong className="text-white font-mono">{tool.clicksCount}</strong>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400 block">
                      Your Custom Affiliate Tracking Link (e.g. from Impact, PartnerStack, or Direct Program)
                    </label>
                    <input
                      type="url"
                      placeholder={tool.defaultAffiliateUrl}
                      value={tool.customAffiliateUrl || ''}
                      onChange={(e) => handleUpdateAffiliateLink(tool.id, e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 px-3 py-2 rounded-xl text-xs text-white outline-none focus:border-emerald-500 font-mono"
                    />
                  </div>
                  <p className="text-[10px] text-slate-500">
                    If left blank, it redirects to the default demo partner page: <code className="text-slate-400">{tool.defaultAffiliateUrl}</code>
                  </p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-300 flex items-center justify-between">
              <span>All changes are automatically saved to your browser!</span>
              <button
                onClick={() => setActiveTab('directory')}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all cursor-pointer"
              >
                Back to Directory
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: PAYOUT RATES & HOW TO SIGN UP                      */}
        {/* ========================================================= */}
        {activeTab === 'payout-guide' && (
          <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-8">
            <div className="max-w-2xl space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                <DollarSign className="w-3.5 h-3.5" />
                <span>Zero-Guesswork Monetization Guide</span>
              </div>
              <h2 className="text-2xl font-bold text-white">How You Get Paid & Where to Join</h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                These programs are 100% free to join. Here are the exact affiliate networks where they manage their payouts and links:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  brand: 'Hostinger Affiliate',
                  network: 'Direct / CJ Affiliate',
                  payout: '$65 to $150 per sale',
                  link: 'https://www.hostinger.com/affiliates',
                  details: '60% rev-share or $65 flat minimum. Instant approvals for website and app owners.',
                },
                {
                  brand: 'Shopify Partners',
                  network: 'Impact.com',
                  payout: '$150 flat per merchant',
                  link: 'https://www.shopify.com/affiliates',
                  details: 'Pays direct to your bank or PayPal via Impact. 30-day cookie window.',
                },
                {
                  brand: 'Wise Affiliate Network',
                  network: 'Partnerize',
                  payout: '$50 per verified business',
                  link: 'https://wise.com/affiliates',
                  details: 'High brand trust worldwide. Great conversion rate for cross-border businesses.',
                },
                {
                  brand: 'Semrush BeRush',
                  network: 'Impact.com',
                  payout: '$200 per sale + $10 free trial',
                  link: 'https://www.semrush.com/affiliate/',
                  details: 'Unmatched in SEO. Even when visitors only start a free trial, you receive $10.',
                },
                {
                  brand: 'Jasper AI Partner Program',
                  network: 'PartnerStack',
                  payout: '30% recurring monthly',
                  link: 'https://www.jasper.ai/partners',
                  details: 'Best for compounding wealth. 20 customers paying $50/mo earns you $300/mo on autopilot.',
                },
              ].map((prog, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-bold text-white text-base">{prog.brand}</h4>
                      <span className="text-[11px] font-mono text-emerald-400 font-bold bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">
                        {prog.payout}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 font-mono">Managed on: {prog.network}</div>
                    <p className="text-xs text-slate-400 leading-relaxed">{prog.details}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-800">
                    <a
                      href={prog.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-medium"
                    >
                      <span>Join Official Program (Free)</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Practical Traffic Strategy */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-emerald-950/20 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>How to Get Your First 500 Visitors & First $1,000</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                1. <strong>X & LinkedIn Threads:</strong> Post <em>"The 5 tools I use to build a profitable web app for under $30/mo"</em>. Put your page link at the end.<br />
                2. <strong>Reddit (r/SideProject, r/SaaS, r/Entrepreneur):</strong> Share <em>"I built a tool stack recommender that saves founders $500 in software discounts"</em>.<br />
                3. <strong>YouTube / TikTok Tech Stacks:</strong> Show quick 30-second reviews and put your link in bio.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-6 text-center text-xs text-slate-500">
        Google AI Studio Build &bull; High-Yield Software Directory & Click-To-Earn Monetization Architecture
      </footer>
    </div>
  );
}
