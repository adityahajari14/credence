'use client'

import React, { useState } from 'react';
import {
    MapPin,
    ArrowRight,
    CheckCircle2,
    FileText,
    Globe,
    Key,
    TrendingUp,
    ShieldCheck,
    Landmark,
    Briefcase,
    Search,
    Handshake,
    Building2,
    Home,
    Star,
    Clock,
    Users,
    ChevronUp,
    ChevronDown,
    Calendar,
    MessageCircle
} from 'lucide-react';
import Link from 'next/link';
import AnimatedSection from '@/components/AnimatedSection';
import AnimatedContainer from '@/components/AnimatedContainer';
import AnimatedItem from '@/components/AnimatedItem';
import { useScrollAnimations } from '@/utils/useScrollAnimation';

const Guide = () => {
    useScrollAnimations();
    const [openAccordion, setOpenAccordion] = useState(null);

    const toggleAccordion = (index) => {
        setOpenAccordion(openAccordion === index ? null : index);
    };

    const buyingSteps = [
        {
            title: "Property Selection",
            desc: "Identify your investment goals and select the right property type and location.",
            icon: <MapPin size={24} />
        },
        {
            title: "Reservation",
            desc: "Sign the reservation agreement and pay the initial deposit (usually 10-20%).",
            icon: <FileText size={24} />
        },
        {
            title: "Sale & Purchase Agreement",
            desc: "Sign the SPA (Sale Purchase Agreement) which binds the buyer and developer.",
            icon: <Briefcase size={24} />
        },
        {
            title: "DLD Registration",
            desc: "Register the property with the Dubai Land Department (4% fee applies).",
            icon: <Landmark size={24} />
        },
        {
            title: "Handover & Keys",
            desc: "Receive your keys upon completion and final payment. Welcome home!",
            icon: <Key size={24} />
        }
    ];

    return (
        <div className="font-sans">
            {/* 1. Hero Section */}
            <section className="relative h-screen min-h-[800px] flex items-center justify-center bg-black overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/assets/guide-bg.jpg"
                        alt="Dubai Real Estate Guide"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/40" />
                </div>
                <div className="container mx-auto px-4 max-w-7xl relative z-10 text-center pt-32">
                    <span
                        className="text-[#C5A365] text-xs font-bold uppercase tracking-[0.3em] mb-4 block animate-fade-in-up"
                        style={{ animationDelay: '0s' }}
                    >
                        Credence Realtor
                    </span>
                    <h1
                        className="text-5xl md:text-7xl font-display text-white mb-6 leading-tight animate-fade-in-up"
                        style={{ animationDelay: '0.1s' }}
                    >
                        Dubai Property <br /> <span className="text-[#C5A365]"> Buyers Guide</span>
                    </h1>
                    <p
                        className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed font-light mb-10 animate-fade-in-up"
                        style={{ animationDelay: '0.2s' }}
                    >
                        Thinking of buying a new home in Dubai? Not sure how the
                        process works? This guide walks you through every stage of
                        buying property in Dubai, with expert insights to help you make
                        informed decisions.
                    </p>

                    <div
                        className="flex flex-col sm:flex-row gap-4 mb-4 justify-center animate-fade-in-up"
                        style={{ animationDelay: '0.3s' }}
                    >
                        <Link href="/properties" className="bg-white hover:bg-[#C5A365] text-black font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-white/25 hover:shadow-[#C5A365]/25 flex items-center gap-2">
                            Get Property Options <ArrowRight size={16} />
                        </Link>
                        <a href="https://wa.me/971588919223" target="_blank" rel="noreferrer" className="bg-white/10 hover:bg-green-600 hover:border-green-600 border border-white/30 backdrop-blur text-white font-bold py-4 px-8 rounded-full transition-all duration-300 flex items-center justify-center gap-2">
                            <MessageCircle size={20} />
                            WhatsApp Now
                        </a>
                    </div>
                </div>
            </section>
            {/* 3. Buying Process Step-by-Step (Timeline) */}
            <AnimatedSection className="py-24 bg-[#F9F9F9]" id="steps">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="mb-16">
                        <span className="text-[#C5A365] text-xs font-bold uppercase tracking-widest mb-4 block">The Process</span>
                        <h2 className="text-4xl md:text-5xl font-display text-secondary mb-6 leading-tight">
                            Buying Property in Dubai: <br /> Step-by-Step Guide
                        </h2>
                        <p className="text-gray-500 max-w-2xl leading-relaxed">
                            The process of buying property in Dubai is straightforward when broken down into clear stages. Below, we walk you through each step of a typical transaction, from initial search to receiving your title deed
                        </p>
                    </div>

                    <AnimatedContainer className="relative space-y-12">
                        {/* Seamless Line */}
                        <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gray-200 md:left-8 -z-10"></div>

                        {[
                            { num: "01", title: "Property Search & Selection", desc: "Browse available properties with your agent, attend viewings, and shortlist options that match your criteria and budget.", icon: <Search size={22} /> },
                            { num: "02", title: "Make an Offer", desc: "Once you've found your ideal property, submit a formal offer through your agent. Negotiations may follow until both parties agree.", icon: <Handshake size={22} /> },
                            { num: "03", title: "Sign the MOU (Form F)", desc: "The Memorandum of Understanding outlines terms, price, and conditions. A 10% deposit is typically required at this stage.", icon: <FileText size={22} /> },
                            { num: "04", title: "Obtain NOC from Developer", desc: "The seller requests a No Objection Certificate from the developer, confirming there are no outstanding fees on the property.", icon: <Building2 size={22} /> },
                            { num: "05", title: "Transfer at DLD", desc: "Visit the Dubai Land Department or a trustee office to complete the official ownership transfer and pay applicable fees.", icon: <Landmark size={22} /> },
                            { num: "06", title: "Receive Title Deed", desc: "Congratulations! You'll receive your title deed, and the property is officially registered under your name.", icon: <Key size={22} /> }
                        ].map((step, idx) => (
                            <AnimatedItem
                                key={idx}
                                className="flex gap-6 md:gap-10 items-start group"
                            >
                                <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center shrink-0 relative z-10 group-hover:border-[#C5A365] transition-colors">
                                    <div className="text-[#C5A365]">{step.icon}</div>
                                    <div className="absolute -top-3 -right-3 w-7 h-7 bg-[#1A1A1A] rounded-full text-white text-xs flex items-center justify-center font-bold border-2 border-[#F9F9F9]">
                                        {step.num}
                                    </div>
                                </div>
                                <div className="pt-2 bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex-1 hover:shadow-md transition-all">
                                    <h3 className="text-xl font-bold text-secondary mb-2">{step.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                                </div>
                            </AnimatedItem>
                        ))}
                    </AnimatedContainer>

                    {/* Dark Card */}
                    <div className="mt-16 bg-[#1A1A1A] rounded-2xl p-8 md:p-12 flex items-start gap-6 text-white">
                        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-[#C5A365] shrink-0">
                            <CheckCircle2 size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-3">Complete Transparency</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                The entire process typically takes 4-8 weeks for ready properties. Off-plan purchases follow a different timeline based on construction schedules. Your agent will guide you through every step.
                            </p>
                        </div>
                    </div>
                </div>
            </AnimatedSection>
            {/* 2. Preparation Section (Before You Begin) */}
            <AnimatedSection className="py-24 bg-white" id="preparation">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="flex flex-col lg:flex-row gap-16 items-start">
                        {/* Left Side: Content & Image */}
                        <div className="lg:w-1/3 sticky top-24">
                            <span className="text-[#C5A365] text-xs font-bold uppercase tracking-widest mb-4 block">Before You Begin</span>
                            <h2 className="text-4xl md:text-5xl font-display text-secondary mb-6 leading-tight">
                                What You'll Need <br /> Before You Start
                            </h2>
                            <p className="text-gray-500 mb-8 leading-relaxed">
                                Proper preparation makes the buying process smoother and faster. Here's what to have in place before you begin your property search.
                            </p>
                            <div className="rounded-2xl overflow-hidden shadow-lg relative h-[400px]">
                                <img
                                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop"
                                    alt="Real Estate Preparation"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                                    <p className="text-white text-sm font-medium italic">"Being well-prepared before your property search can save weeks of time."</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Cards List */}
                        <AnimatedContainer className="lg:w-2/3 space-y-6">
                            {[
                                {
                                    icon: <Briefcase size={24} />,
                                    title: "Set a Clear Budget",
                                    desc: "Define your total budget including the purchase price, fees (approximately 7-8%), and any renovation costs.",
                                    checks: ["Factor in 4% DLD transfer fee", "Include agent commission", "Budget for moving costs"]
                                },
                                {
                                    icon: <TrendingUp size={24} />,
                                    title: "Cash vs Finance",
                                    desc: "Decide whether you'll purchase with cash or require mortgage financing. Each path has different timelines and requirements.",
                                    checks: ["Cash purchases are faster", "Mortgages require 20-25% down", "Compare bank rates early"]
                                },
                                {
                                    icon: <FileText size={24} />,
                                    title: "Mortgage Pre-Approval",
                                    desc: "If financing, obtain pre-approval from a bank. This strengthens your position and clarifies your exact budget.",
                                    checks: ["Gather salary certificates", "Prepare bank statements", "Check credit score"]
                                },
                                {
                                    icon: <Calendar size={24} />,
                                    title: "Define Your Timeline",
                                    desc: "Are you looking to move immediately or within 6-12 months? This affects whether you consider ready or off-plan properties.",
                                    checks: ["Ready: 4-8 weeks to complete", "Off-plan: staged payments", "Consider handover dates"]
                                },
                                {
                                    icon: <CheckCircle2 size={24} />,
                                    title: "List Your Preferences",
                                    desc: "Document your must-haves and nice-to-haves: bedrooms, location, amenities, view, parking, and community type.",
                                    checks: ["Prioritize top 5 requirements", "Be flexible on secondary items", "Consider future needs"]
                                }
                            ].map((card, idx) => (
                                <AnimatedItem
                                    key={idx}
                                    className="bg-[#F9F9F9] p-8 rounded-xl border border-gray-100 flex gap-6 hover:shadow-md transition-all"
                                >
                                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-[#C5A365] shrink-0 shadow-sm">
                                        {card.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-secondary mb-2">{card.title}</h3>
                                        <p className="text-gray-500 text-sm mb-4 leading-relaxed">{card.desc}</p>
                                        <div className="space-y-2">
                                            {card.checks.map((check, i) => (
                                                <div key={i} className="flex items-center gap-2 text-sm text-gray-500">
                                                    <CheckCircle2 size={14} className="text-[#C5A365]" />
                                                    {check}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </AnimatedItem>
                            ))}
                        </AnimatedContainer>
                    </div>
                </div>
            </AnimatedSection>



            {/* 4. Property Types & Location */}
            <AnimatedSection className="py-24 bg-white" id="types">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="text-center mb-16">
                        <span className="text-[#C5A365] text-xs font-bold uppercase tracking-widest mb-4 block">Finding Your Fit</span>
                        <h2 className="text-4xl md:text-5xl font-display text-secondary leading-tight">
                            Choosing the Right <br /> Property Type & Location
                        </h2>
                    </div>

                    {/* Property Types Grid */}
                    <AnimatedContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
                        {[
                            { title: "Apartments", icon: <Building2 size={24} />, desc: "From studios to 4+ bedrooms, ideal for singles, couples, or families seeking low-maintenance living." },
                            { title: "Villas", icon: <Home size={24} />, desc: "Standalone homes with private gardens and pools, perfect for families wanting space and privacy." },
                            { title: "Townhouses", icon: <Landmark size={24} />, desc: "Multi-level homes within communities, offering a balance between apartment and villa living." },
                            { title: "Penthouses", icon: <Star size={24} />, desc: "Luxury top-floor residences with premium finishes, views, and exclusive amenities." },
                        ].map((type, idx) => (
                            <AnimatedItem
                                key={idx}
                                className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-[#C5A365]/30 transition-all group"
                            >
                                <div className="w-12 h-12 bg-[#F9F7F2] rounded-xl flex items-center justify-center text-[#C5A365] mb-6 group-hover:bg-[#C5A365] group-hover:text-white transition-colors">
                                    {type.icon}
                                </div>
                                <h3 className="text-xl font-bold text-secondary mb-3">{type.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{type.desc}</p>
                            </AnimatedItem>
                        ))}
                    </AnimatedContainer>

                    {/* Location Considerations Split */}
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
                        <div className="lg:w-1/2 relative h-[500px] rounded-2xl overflow-hidden w-full">
                            <img
                                src="/assets/guidepg-another.png"
                                alt="Dubai Location"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-8 flex flex-col justify-end items-start">
                                <span className="bg-[#C5A365] text-[#1A1A1A] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
                                    Location Matters
                                </span>
                                <p className="text-white text-xl md:text-2xl font-normal leading-snug">
                                    Your location choice impacts daily life more than any other factor. Take time to explore different areas before deciding.
                                </p>
                            </div>
                        </div>

                        <div className="lg:w-1/2 w-full">
                            <h3 className="text-3xl font-display text-secondary mb-8">Key Location Considerations</h3>
                            <AnimatedContainer className="space-y-4">
                                {[
                                    { title: "Travel Time", desc: "Consider daily commute times to work, schools, and frequent destinations.", icon: <Clock size={20} /> },
                                    { title: "Work Proximity", desc: "Being close to business districts can save hours each week and reduce stress.", icon: <Briefcase size={20} /> },
                                    { title: "Accessibility", desc: "Access to metro, major roads, airports, and essential services matters for convenience.", icon: <MapPin size={20} /> },
                                    { title: "Community Type", desc: "Family-oriented, vibrant urban, or quiet residential—choose what fits your lifestyle.", icon: <Users size={20} /> }
                                ].map((item, idx) => (
                                    <AnimatedItem
                                        key={idx}
                                        className="bg-white p-6 rounded-xl border border-gray-100 flex gap-5 hover:border-[#C5A365] transition-colors"
                                    >
                                        <div className="w-10 h-10 bg-[#F5F5F5] rounded-lg flex items-center justify-center text-gray-600 shrink-0">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-secondary mb-1">{item.title}</h4>
                                            <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                                        </div>
                                    </AnimatedItem>
                                ))}
                            </AnimatedContainer>
                        </div>
                    </div>
                </div>
            </AnimatedSection>

            {/* 5. FAQs */}
            <AnimatedSection className="py-24 bg-white border-t border-gray-100" id="faqs">
                <div className="container mx-auto px-4 max-w-3xl">
                    <div className="text-center mb-16">
                        <span className="text-[#C5A365] text-xs font-bold uppercase tracking-widest mb-4 block">Common Questions</span>
                        <h2 className="text-4xl md:text-5xl font-display text-secondary">
                            FAQs About Buying <br /> Property in Dubai
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {[
                            { q: "Can foreigners buy property in Dubai?", a: "Yes, foreigners can purchase property in designated freehold areas throughout Dubai. There are no restrictions on nationality, and you don't need to be a UAE resident to buy. Popular freehold areas include Dubai Marina, Downtown Dubai, Palm Jumeirah, JBR, and many more." },
                            { q: "What is the minimum down payment required?", a: "For properties under AED 5 million, the minimum down payment is typically 20% for expats. For off-plan properties, it varies by developer but usually starts around 10-20%." },
                            { q: "How long does the buying process take?", a: "For ready properties, the process usually takes 4 weeks from signing the MOU to transfer. Cash transactions can be faster, while mortgage financing might take slightly longer." },
                            { q: "What should first-time buyers know?", a: "Location is key. Consider total costs including fees (approx 7-8% over purchase price). Understand the difference between freehold and leasehold. Always work with a RERA-licensed agent." },
                            { q: "Can I buy property without being a UAE resident?", a: "Absolutely. Non-residents can buy freehold property and even obtain a mortgage (though LTV ratios differ, usually up to 50-60%)." },
                            { q: "What are the best areas to buy property in Dubai?", a: "It depends on your goals. For ROI: JVC, Business Bay, Marina. For Luxury Living: Palm Jumeirah, Downtown, Emirates Hills. For Families: Dubai Hills, Arabian Ranches." },
                            { q: "What taxes and fees should I expect?", a: "Dubai has no property tax. One-time fees include: 4% DLD Fee, 2% Agency Fee, AED 4,200 Trustee Fee. Ongoing costs are just Service Charges for maintenance." },
                            { q: "What are the risks of buying off-plan property?", a: "Risks include project delays or cancellation. To mitigate this, buy from reputable master developers (Emaar, Meraas, etc.) and ensure the project has an escrow account mandated by RERA." },
                            { q: "Is buying an apartment a good investment?", a: "Yes, apartments generally offer higher rental yields (6-8%+) compared to villas, are easier to rent out, and have a lower entry price point, making them great for investors." }

                        ].map((faq, idx) => (
                            <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
                                <button
                                    className="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-gray-50 transition-colors bg-white"
                                    onClick={() => toggleAccordion(idx)}
                                >
                                    <span className="font-semibold text-secondary text-sm md:text-base pr-8">{faq.q}</span>
                                    {openAccordion === idx ? <ChevronUp size={18} className="text-[#C5A365] shrink-0" /> : <ChevronDown size={18} className="text-gray-400 shrink-0" />}
                                </button>
                                {openAccordion === idx && (
                                    <div className="px-6 pb-6 pt-0 bg-white">
                                        <p className="text-gray-500 text-sm leading-relaxed border-t border-gray-100 pt-4">
                                            {faq.a}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </AnimatedSection>
        </div>
    );
};

export default Guide;
