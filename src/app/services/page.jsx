'use client'

import React from 'react';
import { ArrowRight, Check, Play, Phone, MessageCircle, FileText, ChevronRight, User, TrendingUp, Scale, Home, ChevronDown, CheckCircle2, ChevronUp, Award, Bitcoin } from 'lucide-react';
import Link from 'next/link';
import ContactDropdown from '@/components/ContactDropdown';
import AnimatedSection from '@/components/AnimatedSection';
import AnimatedContainer from '@/components/AnimatedContainer';
import AnimatedItem from '@/components/AnimatedItem';
import { useScrollAnimations } from '@/utils/useScrollAnimation';

const ServiceBlock = ({ iconLabel, label, title, titleHighlight, desc, primaryBtn, secondaryBtn, rightHeading, points, guidelines }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <AnimatedSection className="flex flex-col lg:flex-row gap-8 lg:gap-20 items-start py-20 lg:py-32 border-b border-gray-100 last:border-0 border-t">
            {/* Left Content */}
            <div className="flex-1 flex flex-col sticky top-32">
                <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 bg-[#F9F7F2] rounded flex items-center justify-center text-[#C5A365]">
                        {iconLabel}
                    </div>
                    <span className="text-[#C5A365] text-xs font-bold uppercase tracking-[0.2em]">{label}</span>
                </div>

                <h2 className="text-4xl md:text-5xl font-display text-secondary mb-8 leading-tight">
                    {title} <span className="text-[#C5A365]">{titleHighlight}</span>
                </h2>

                <p className="text-gray-500 mb-10 leading-relaxed text-lg max-w-xl">
                    {desc}
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <a href="/#contact" className="bg-[#1A1A1A] text-white hover:bg-[#C5A365] px-8 py-4 rounded text-sm font-medium transition-all flex items-center justify-center gap-2 min-w-[200px]">
                        {primaryBtn} <ArrowRight size={16} />
                    </a>
                    {typeof secondaryBtn === 'string' || (secondaryBtn && secondaryBtn.type === 'span') ? (
                        <a href="/#contact" className="border border-gray-200 text-gray-700 bg-white hover:border-[#1A1A1A] px-8 py-4 rounded text-sm font-medium transition-all flex items-center justify-center gap-2 min-w-[200px]">
                            {secondaryBtn}
                        </a>
                    ) : (
                        secondaryBtn
                    )}
                </div>
            </div>

            {/* Right Content */}
            <div className="flex-1 w-full relative">
                <div className="bg-[#F9F7F2] h-full flex flex-col justify-between">
                    <div className="p-8 md:p-12">
                        <div className="mb-8 pb-4 border-b border-[#E5E5E5]">
                            <h4 className="text-secondary font-display text-xl">{rightHeading}</h4>
                        </div>
                        <ul className="space-y-6">
                            {points.map((point, i) => (
                                <li key={i} className="flex items-start gap-4">
                                    <div className="w-5 h-5 rounded-full border border-[#C5A365] flex items-center justify-center mt-1 shrink-0">
                                        <Check size={10} className="text-[#C5A365]" />
                                    </div>
                                    <span className="text-gray-600 text-[15px]">{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Bottom Accordion Trigger */}
                    <div>
                        <div
                            onClick={() => setIsOpen(!isOpen)}
                            className="px-8 md:px-12 py-6 border-t border-[#EAEAE5] flex justify-between items-center cursor-pointer hover:bg-[#F0EFE9] transition-colors group"
                        >
                            <span className="text-sm font-medium text-gray-700">Essential Guidelines</span>
                            {isOpen ? (
                                <ChevronUp size={18} className="text-[#C5A365]" />
                            ) : (
                                <ChevronDown size={18} className="text-[#C5A365] group-hover:translate-y-1 transition-transform" />
                            )}
                        </div>

                        {isOpen && (
                            <div className="px-8 md:px-12 pb-8 border-t border-[#EAEAE5] bg-[#F9F7F2] animate-in fade-in slide-in-from-top-2">
                                <div className="space-y-6 pt-6">
                                    {guidelines && guidelines.map((item, idx) => (
                                        <div key={idx}>
                                            <h5 className="font-bold text-secondary text-sm mb-1">{idx + 1}. {item.title}</h5>
                                            <p className="text-gray-500 text-sm leading-relaxed whitespace-pre-line">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
};

const Services = () => {
    useScrollAnimations();

    return (
        <div className="font-sans">
            {/* 1. Hero Section */}
            <section className="relative h-screen min-h-[800px] flex items-center justify-center bg-black overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/assets/services-bg.jpg"
                        alt="Dubai Skyline Night"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/40" />
                </div>
                <div className="container mx-auto px-4 max-w-7xl relative z-10 text-center pt-32">
                    <div className="flex items-center justify-center gap-4 mb-6 animate-fade-in-up">
                        <div className="h-[1px] w-8 bg-gray-400"></div>
                        <span className="text-gray-300 text-xs font-bold tracking-[0.3em] uppercase">Est. 2021</span>
                        <div className="h-[1px] w-8 bg-gray-400"></div>
                    </div>

                    <h1
                        className="text-5xl md:text-7xl font-display text-white mb-6 leading-tight animate-fade-in-up"
                        style={{ animationDelay: '0.1s' }}
                    >
                        End-to-End Real Estate <br />
                        <span className="text-[#C5A365]">Support in Dubai</span>
                    </h1>

                    <p
                        className="text-gray-300 max-w-3xl mx-auto mb-10 text-lg leading-relaxed font-light animate-fade-in-up"
                        style={{ animationDelay: '0.2s' }}
                    >
                        At Credence Realtor, we offer comprehensive real estate services designed to support you at every stage — whether buying, selling, leasing, financing, or investing through Golden Visa or Crypto payments.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4 mb-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <Link href="/properties" className="bg-white text-black px-8 py-4 rounded-full font-bold text-sm hover:bg-[#C5A365] hover:text-white transition-all flex items-center gap-2">
                            Get Property Options <ArrowRight size={16} />
                        </Link>
                        <a href="https://wa.me/971588919223" target="_blank" rel="noreferrer" className="bg-white/10 hover:bg-green-600 hover:border-green-600 border border-white/30 backdrop-blur text-white font-bold py-4 px-8 rounded-full transition-all duration-300 flex items-center justify-center gap-2">
                            <MessageCircle size={20} />
                            WhatsApp Now
                        </a>
                    </div>
                </div>
            </section>

            {/* 2. Free Consultation Intro */}
            <AnimatedSection className="py-24 bg-white">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
                        <div className="flex-1 animate-on-scroll fade-in-up">
                            <span className="text-[#C5A365] text-xs font-bold uppercase tracking-[0.2em] mb-4 block">Free Consultation</span>
                            <h2 className="text-5xl font-display text-secondary mb-6 leading-[1.15]">
                                Free Dubai Property <br />
                                <span className="text-[#C5A365]">Consultation & Expert</span> <br />
                                <span className="text-[#C5A365]">Guidance</span>
                            </h2>
                            <p className="text-gray-500 mb-10 leading-relaxed text-lg max-w-xl">
                                Get personalized, no-cost advice from experienced Dubai real estate professionals. Whether you're a first-time buyer, seasoned investor, or just exploring opportunities, we help you make confident, informed decisions.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <a href="/#contact" className="bg-white border border-gray-200 text-secondary hover:border-black px-8 py-4 rounded-full text-sm font-bold transition-all shadow-sm flex items-center gap-2">
                                    Schedule Now <ArrowRight size={16} />
                                </a>
                                <a href="https://wa.me/971588919223" target="_blank" rel="noreferrer" className="bg-[#2D2D2D] text-white px-8 py-4 rounded-full text-sm font-bold hover:bg-black transition-colors flex items-center gap-2">
                                    <MessageCircle size={18} /> WhatsApp Now
                                </a>
                            </div>
                        </div>

                        <div className="flex-1 w-full animate-on-scroll fade-in-up">
                            <div className="bg-white p-10 md:p-14 border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.03)]">
                                <h4 className="font-display text-xl mb-6 pb-6 border-b border-gray-100">What You Get</h4>
                                <AnimatedContainer className="space-y-6">
                                    {[
                                        { icon: User, text: "One-on-one expert consultation" },
                                        { icon: TrendingUp, text: "Market insights & investment guidance" },
                                        { icon: Scale, text: "Legal & ownership clarity" },
                                        { icon: Home, text: "Tailored property recommendations" }
                                    ].map((item, i) => (
                                        <AnimatedItem
                                            key={i}
                                            className="flex items-center gap-5"
                                        >
                                            <div className="w-10 h-10 bg-[#F9F7F2] flex items-center justify-center text-[#C5A365] rounded">
                                                <item.icon size={18} />
                                            </div>
                                            <span className="text-gray-700 font-medium">{item.text}</span>
                                        </AnimatedItem>
                                    ))}
                                </AnimatedContainer>
                                <div className="mt-10 flex items-center gap-2 text-xs text-[#C5A365] font-medium">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#C5A365]" />
                                    Start your Dubai property journey with confidence
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AnimatedSection>



            {/* 4. Services List */}
            <AnimatedSection className="bg-white overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">

                    <div id="selling">
                        <ServiceBlock
                            iconLabel={<FileText size={16} />}
                            label="Selling Services"
                            title="Sell Your Dubai Property"
                            titleHighlight="with Confidence"
                            desc="We simplify the selling process with professional valuation, strategic marketing, and access to serious buyers—ensuring maximum returns and smooth transfers."
                            primaryBtn="Get a Free Property Valuation"
                            secondaryBtn={<ContactDropdown label="Speak to a Selling Expert" className="w-full border border-gray-200 text-gray-700 bg-white hover:border-[#1A1A1A] px-8 py-4 rounded text-sm font-medium transition-all flex items-center justify-center gap-2 min-w-[200px]" />}
                            rightHeading="Our Selling Services"
                            points={[
                                "Accurate property valuation",
                                "Strategic pricing & positioning",
                                "RERA-compliant documentation",
                                "Premium marketing & buyer outreach",
                                "Full support until ownership transfer"
                            ]}
                            guidelines={[
                                { title: "Know When to Sell", desc: "Timing is key—monitor market trends, buyer demand, and price growth in your area for maximum ROI." },
                                { title: "Obtain a Property Valuation", desc: "Get a professional valuation to set a competitive and realistic asking price aligned with current market data." },
                                { title: "Clear All Outstanding Payments", desc: "Ensure service charges, mortgage dues, and any developer fees are cleared before initiating the resale process." },
                                { title: "List with a RERA-Certified Broker", desc: "Work with licensed agents who can list your property legally and reach qualified buyers through verified channels." },
                                { title: "Prepare Your Property for Viewings", desc: "Well-presented units sell faster—consider minor touch-ups, cleaning, and staging to attract better offers." },
                                { title: "Understand the NOC Process", desc: "Obtain a No Objection Certificate (NOC) from the developer before the transfer can proceed at the DLD." },
                                { title: "Check Buyer Eligibility (Off-plan)", desc: "For off-plan resales, ensure the buyer meets the developer’s minimum payment percentage and assignment terms." },
                                { title: "Market Strategically", desc: "Use high-quality images, video tours, and premium listings on major property portals to gain exposure." },
                                { title: "Calculate Net Proceeds Accurately", desc: "Factor in all costs: agency fees (typically 2%), NOC charges, trustee fees, and DLD transfer fees (if applicable)." },
                                { title: "Close with Full Compliance", desc: "Complete the resale at an approved Dubai Land Department Trustee office to ensure secure and legal transfer of ownership." }
                            ]}
                        />
                    </div>

                    <div id="leasing">
                        <ServiceBlock
                            iconLabel={<Check size={16} />}
                            label="Leasing Services"
                            title="Hassle-Free Leasing &"
                            titleHighlight="Reliable Rental Income"
                            desc="From tenant sourcing to legal contracts, we manage the entire leasing process so you can enjoy steady returns without stress."
                            primaryBtn="List Your Property Now"
                            secondaryBtn={<ContactDropdown label="Speak to a Leasing Expert" className="w-full border border-gray-200 text-gray-700 bg-white hover:border-[#1A1A1A] px-8 py-4 rounded text-sm font-medium transition-all flex items-center justify-center gap-2 min-w-[200px]" />}
                            rightHeading="Leasing Support Includes"
                            points={[
                                "Rental valuation & pricing strategy",
                                "Professional marketing & listings",
                                "Tenant screening & verification",
                                "Ejari & RERA-compliant contracts",
                                "Ongoing support & coordination"
                            ]}
                            guidelines={[
                                { title: "Get an Accurate Rental Valuation", desc: "Price your property according to current market rates using RERA’s Rental Index and expert consultation." },
                                { title: "Use a RERA-Licensed Broker", desc: "Always lease through a certified agent to ensure compliance, proper marketing, and vetted tenants." },
                                { title: "Sign a RERA-Compliant Tenancy Contract", desc: "Use the standard Ejari-registered lease agreement to protect your legal rights and avoid disputes." },
                                { title: "Register the Tenancy with Ejari", desc: "Mandatory for all leases—Ejari registration legalizes the contract and is required for utility connections." },
                                { title: "Verify Tenant Credentials", desc: "Always perform background checks, verify employment and residency status before signing any agreement." },
                                { title: "Collect a Security Deposit", desc: "Typically 5% of the annual rent (unfurnished) or 10% (furnished); refundable upon lease end if no damages." },
                                { title: "Understand Maintenance Responsibilities", desc: "Landlords handle major maintenance; tenants manage minor repairs unless otherwise agreed in writing." },
                                { title: "Market the Property Professionally", desc: "High-quality photos, online listings, and staging help attract quality tenants faster." },
                                { title: "Define Payment Terms Clearly", desc: "Specify rent amounts, payment schedules (typically 1–4 cheques), and any late fee policies in the lease." },
                                { title: "Stay Informed on Legal Updates", desc: "Leasing laws can evolve—stay updated with RERA regulations to remain fully compliant and protected." }
                            ]}
                        />
                    </div>

                    <div id="mortgage">
                        <ServiceBlock
                            iconLabel={<Home size={16} />}
                            label="Mortgage Assistance"
                            title="Easy & Reliable Property"
                            titleHighlight="Financing in Dubai"
                            desc="We help you secure the best mortgage deals from leading UAE banks—tailored to residents and international buyers."
                            primaryBtn="Get Pre-Approved"
                            secondaryBtn={<ContactDropdown label="Speak to a Mortgage Advisor" className="w-full border border-gray-200 text-gray-700 bg-white hover:border-[#1A1A1A] px-8 py-4 rounded text-sm font-medium transition-all flex items-center justify-center gap-2 min-w-[200px]" />}
                            rightHeading="Mortgage Support Includes"
                            points={[
                                "Eligibility & pre-approval assistance",
                                "Resident & non-resident financing options",
                                "Fixed & variable rate comparisons",
                                "Bank coordination & documentation",
                                "DLD mortgage registration support"
                            ]}
                            guidelines={[
                                { title: "Check Mortgage Eligibility Early", desc: "Get pre-approved to know your borrowing limit and streamline your property search." },
                                { title: "Residents vs. Non-Residents", desc: "UAE residents can borrow up to 80% of the property value; non-residents typically up to 50–60%." },
                                { title: "Minimum Down Payment Required", desc: "For residents: 20% for properties under AED 5M, 30% for properties over AED 5M (plus fees).\nFor non-residents: minimum 40–50% down payment." },
                                { title: "Choose Between Fixed or Variable Rates", desc: "Fixed rates offer stability; variable rates may offer better deals based on EIBOR movement." },
                                { title: "Loan Tenure Flexibility", desc: "Mortgage terms range up to 25 years, depending on borrower age and bank policy." },
                                { title: "Prepare the Required Documents", desc: "Valid ID, proof of income, bank statements, credit report, and property details are essential." },
                                { title: "Work with a Mortgage Broker", desc: "Professional mortgage advisors help compare offers, negotiate better rates, and handle paperwork." },
                                { title: "Understand All Costs", desc: "Expect bank processing fees (0.5–1%), valuation fee (~AED 2,500), DLD mortgage registration fee (0.25%), and insurance costs." },
                                { title: "Mortgage for Off-Plan Possible", desc: "Some banks finance approved off-plan projects with 50–60% LTV—developer and bank approval required." },
                                { title: "Mortgage Can Support Golden Visa", desc: "Properties financed by a mortgage are eligible for the 10-year Golden Visa, if total value exceeds AED 2M." }
                            ]}
                        />
                    </div>

                    <div id="golden-visa">
                        <ServiceBlock
                            iconLabel={<Award size={16} />}
                            label="Golden Visa Assistance"
                            title="Secure a 10-Year UAE Golden Visa"
                            titleHighlight="Through Property Investment"
                            desc="Invest in Dubai real estate and enjoy long-term residency, family sponsorship, and complete independence."
                            primaryBtn="Check Your Eligibility"
                            secondaryBtn={<ContactDropdown label="Apply Now" className="w-full border border-gray-200 text-gray-700 bg-white hover:border-[#1A1A1A] px-8 py-4 rounded text-sm font-medium transition-all flex items-center justify-center gap-2 min-w-[200px]" />}
                            rightHeading="Golden Visa Highlights"
                            points={[
                                "Minimum investment: AED 2 Million",
                                "Ready & approved off-plan properties eligible",
                                "Mortgage-financed properties accepted",
                                "Valid for 10 years, renewable",
                                "Sponsor family & domestic staff"
                            ]}
                            guidelines={[
                                { title: "Minimum Investment Value", desc: "Invest in property worth above AED 2 million or more to qualify for the 10-year Golden Visa." },
                                { title: "Applicable to Ready & Off-Plan", desc: "Both completed and select off-plan properties from approved developers are eligible." },
                                { title: "Mortgaged Properties Are Accepted", desc: "You can still apply if your property is financed— above AED 2M must be paid/in equity at the time of application." },
                                { title: "Valid for Individuals & Families", desc: "Golden Visa holders can sponsor their spouse, children, and domestic staff under the same residency." },
                                { title: "No Employer or National Sponsor Required", desc: "The visa is fully independent, giving you full residency rights and business flexibility in the UAE." },
                                { title: "Renewable Every 10 Years", desc: "As long as you retain property ownership and meet the requirements, the visa can be renewed indefinitely." },
                                { title: "Multiple Properties Can Be Combined", desc: "Own several properties totalling AED 2 million+ (under your name) to qualify for the visa." },
                                { title: "Freehold Zones Only", desc: "The property must be in a freehold area where foreign ownership is permitted." },
                                { title: "No Minimum Stay Requirement", desc: "You are not required to live in the UAE full-time to maintain your Golden Visa status." },
                                { title: "Full Government Support & Processing", desc: "Applications are handled through Dubai Land Department with official channels—Credence can manage the full process for you." }
                            ]}
                        />
                    </div>

                    <div id="crypto">
                        <ServiceBlock
                            iconLabel={<Bitcoin size={16} />}
                            label="Crypto Payment Assistance"
                            title="Buy Dubai Property with Cryptocurrency"
                            titleHighlight="100% Legal & Secure"
                            desc="We enable seamless crypto property purchases through licensed partners—ensuring compliance, transparency, and security."
                            primaryBtn="Free Crypto Consultation"
                            secondaryBtn={<ContactDropdown label="Inquire Now" className="w-full border border-gray-200 text-gray-700 bg-white hover:border-[#1A1A1A] px-8 py-4 rounded text-sm font-medium transition-all flex items-center justify-center gap-2 min-w-[200px]" />}
                            rightHeading="Crypto Purchase Support Includes"
                            points={[
                                "Bitcoin, Ethereum, USDT & major stablecoins",
                                "Legal crypto-to-AED conversion",
                                "Ready & off-plan property options",
                                "Escrow-based secure transactions",
                                "End-to-end expert guidance"
                            ]}
                            guidelines={[
                                { title: "Use Licensed Channel Partners", desc: "Crypto payments must go through authorized exchanges or partners for legal compliance and security." },
                                { title: "Accepted Cryptocurrencies", desc: "Commonly accepted coins include Bitcoin (BTC), Ethereum (ETH), and stablecoins like USDT." },
                                { title: "Conversion to AED", desc: "Crypto payments are converted to AED via licensed providers before completing the property transaction." },
                                { title: "Applicable to Ready & Off-Plan Properties", desc: "Crypto payments can be used for a wide range of approved projects from reputable developers." },
                                { title: "Full Compliance with Dubai Land Department", desc: "Transactions follow official regulations to ensure ownership transfer is secure and recognized." },
                                { title: "Transparent Fees and Exchange Rates", desc: "All currency conversion fees and rates are disclosed upfront—no hidden charges." },
                                { title: "AML and KYC Requirements", desc: "Buyers must complete anti-money laundering (AML) and know-your-customer (KYC) checks as part of the process." },
                                { title: "Secure Escrow Accounts", desc: "Funds are held in escrow until all contractual and legal conditions are met." },
                                { title: "Transaction Speed", desc: "Crypto payments can speed up the purchasing process compared to traditional wire transfers." },
                                { title: "Expert Support Throughout", desc: "Professional guidance is provided from crypto payment initiation through to property handover." }
                            ]}
                        />
                    </div>
                </div>
            </AnimatedSection>



        </div>
    );
};

export default Services;
