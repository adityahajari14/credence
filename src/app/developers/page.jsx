'use client'

import React from 'react';
import {
    ShieldCheck,
    Clock,
    TrendingUp,
    Home,
    ArrowRight,
    MessageCircle
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AnimatedSection from '@/components/AnimatedSection';
import AnimatedContainer from '@/components/AnimatedContainer';
import AnimatedItem from '@/components/AnimatedItem';
import { useScrollAnimations } from '@/utils/useScrollAnimation';
import Hotspots from '@/components/Hotspots';

const Developers = () => {
    const router = useRouter();
    useScrollAnimations();

    // 1. Market Leaders Data
    const marketLeaders = [
        { name: "EMAAR", image: "/assets/Emaar.png", desc: "A globally recognized developer behind some of Dubai's most iconic landmarks, master communities, retail destinations, and hospitality projects." },
        { name: "NAKHEEL", image: "/assets/Nakheel.png", desc: "A visionary developer known for world-famous waterfront and lifestyle destinations supporting residential, commercial, and tourism growth." },
        { name: "DAMAC", image: "/assets/DAMAC.png", desc: "A luxury-focused developer delivering high-end residential, branded, and lifestyle developments across prime locations." },
        { name: "DUBAI PROPERTIES", image: "/assets/Dubai Properties.png", desc: "A master developer responsible for some of Dubai's most established mixed-use and residential destinations." },
        { name: "MERAAS", image: "/assets/MERAAS.png", desc: "A lifestyle-driven developer creating vibrant urban destinations that blend leisure, culture, and modern living.", largeLogo: true }
    ];

    // 2. Premium & Established Data
    const premiumDevelopers = [
        { name: "SOBHA REALTY", image: "/assets/Sobha Realty.png", desc: "Renowned for superior construction quality, in-house engineering, and attention to detail." },
        { name: "ALDAR", image: "/assets/Aldaar real estate.png", desc: "A leading UAE developer delivering sustainable, community-centric residential and commercial developments." },
        { name: "AZIZI", image: "/assets/Azizi.png", desc: "A value-driven developer recognized for timely delivery and strategically located residential projects." },
        { name: "ELLINGTON", image: "/assets/Ellington.png", desc: "A design-led developer focused on refined aesthetics, premium finishes, and lifestyle-driven homes." },
        { name: "DEYAAR", image: "/assets/Deyaar.png", desc: "A prominent developer with a strong presence in Business Bay and key mixed-use developments." }
    ];

    // 3. Lifestyle & Community Data
    const lifestyleDevelopers = [
        { name: "MAJID AL FUTTAIM", image: "/assets/Majjid al futtaim.png", desc: "A regional leader in integrated communities, retail, leisure, and lifestyle destinations.", largeLogo: true },
        { name: "DANUBE PROPERTIES", image: "/assets/Danube.png", desc: "Known for affordable luxury developments supported by flexible and investor-friendly payment plans.", largeLogo: true },
        { name: "SAMANA", image: "/assets/Samana.png", desc: "Contemporary developments offering modern design, strong amenities, and investor appeal.", largeLogo: true },
        { name: "SELECT GROUP", image: "/assets/Select group.png", desc: "An international developer delivering premium residential, hospitality, and mixed-use projects.", largeLogo: true },
        { name: "DUBAI HOLDING", image: "/assets/Dubai Holding.png", desc: "A global investment group with diversified interests across real estate, hospitality, and business districts." }
    ];

    // 4. Boutique & Sustainable Data
    const boutiqueDevelopers = [
        { name: "AL BARARI", image: "/assets/al barari.png", desc: "A luxury eco-focused community emphasizing greenery, wellness, and low-density living.", largeLogo: true },
        { name: "IMTIAZ", image: "/assets/imtiaz.png", desc: "Focused on high-quality, design-forward residential and mixed-use projects." },
        { name: "JUMEIRAH GOLF ESTATES", image: "/assets/Jumeria.png", desc: "Exclusive golf-centered communities offering premium living surrounded by nature." },
        { name: "ARADA", image: "/assets/Arada.png", desc: "Community-driven developments centered on livability, quality, and contemporary design." },
        { name: "DIAMOND DEVELOPERS", image: "/assets/Daimond.png", desc: "A leader in sustainable urban developments and environmentally responsible communities.", largeLogo: true }
    ];

    return (
        <div className="font-sans">
            {/* 1. Hero Section */}
            <section className="relative h-screen min-h-[800px] flex items-center justify-center bg-black overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/assets/developers-bg.png"
                        alt="Dubai Developers"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/40" />
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center pt-32">
                    <span
                        className="text-[#C5A365] text-xs font-bold uppercase tracking-[0.3em] mb-4 block animate-fade-in-up"
                        style={{ animationDelay: '0s' }}
                    >
                        Credence Real Estate Advisory
                    </span>
                    <h1
                        className="text-5xl md:text-7xl font-display text-white mb-6 leading-tight animate-fade-in-up"
                        style={{ animationDelay: '0.1s' }}
                    >
                        Top Real Estate<br /> <span className="text-[#C5A365]">Developers in Dubai</span>
                    </h1>
                    <p
                        className="text-gray-200 text-lg max-w-2xl mx-auto mb-10 animate-fade-in-up"
                        style={{ animationDelay: '0.2s' }}
                    >
                        Discover Dubai's most trusted developers shaping the future of luxury living,from iconic landmarks to master-planned communities.
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

            {/* 2. Why Choose Section */}
            <AnimatedSection className="py-24 bg-white relative">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="flex flex-col lg:flex-row gap-16">
                        {/* Left Text */}
                        <div className="lg:w-1/3">
                            <span className="bg-[#F9F7F2] text-[#C5A365] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 inline-block">
                                Why It Matters
                            </span>
                            <h2 className="text-4xl md:text-5xl font-display text-secondary mb-6 leading-tight">
                                Why Choose a <br /> Reputed Developer
                            </h2>
                            <p className="text-gray-500 leading-relaxed mb-6">
                                Investing with an established developer ensures high construction standards, timely project delivery, transparent processes, and stronger resale or rental value.
                            </p>
                            <p className="text-gray-500 leading-relaxed">
                                Reputed developers focus on long-term community building, modern infrastructure, and lifestyle-focused amenities—creating properties that deliver both comfort and consistent returns.
                            </p>
                            <button className="mt-8 border border-[#C5A365] text-[#C5A365] px-8 py-3 rounded-full font-bold hover:bg-[#C5A365] hover:text-white transition-all">
                                Learn More
                            </button>
                        </div>

                        {/* Right Cards Grid */}
                        <AnimatedContainer className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <AnimatedItem className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                                <div className="w-12 h-12 bg-[#F9F7F2] rounded-xl flex items-center justify-center text-[#C5A365] mb-6">
                                    <ShieldCheck size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-secondary mb-3">Quality Assurance</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">High construction standards and premium materials ensure lasting value.</p>
                            </AnimatedItem>
                            <AnimatedItem className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                                <div className="w-12 h-12 bg-[#F9F7F2] rounded-xl flex items-center justify-center text-[#C5A365] mb-6">
                                    <Clock size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-secondary mb-3">Timely Delivery</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">Proven track record of completing projects on schedule.</p>
                            </AnimatedItem>
                            <AnimatedItem className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                                <div className="w-12 h-12 bg-[#F9F7F2] rounded-xl flex items-center justify-center text-[#C5A365] mb-6">
                                    <TrendingUp size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-secondary mb-3">Strong Returns</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">Better resale and rental value from reputed developers.</p>
                            </AnimatedItem>
                            <AnimatedItem className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                                <div className="w-12 h-12 bg-[#F9F7F2] rounded-xl flex items-center justify-center text-[#C5A365] mb-6">
                                    <Home size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-secondary mb-3">Community Focus</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">Lifestyle amenities and modern infrastructure for comfortable living.</p>
                            </AnimatedItem>
                        </AnimatedContainer>
                    </div>
                </div>
            </AnimatedSection>

            {/* 3. Developer Categories */}
            <AnimatedSection className="py-12 bg-[#FAFAFA]">
                <div className="container mx-auto px-4 max-w-7xl">

                    <DeveloperSection
                        title="Market Leaders & Iconic Developers"
                        subtitle="These developers have played a defining role in transforming Dubai into a global real estate destination. Known for landmark projects and large-scale master developments."
                        data={marketLeaders}
                        router={router}
                    />

                    <DeveloperSection
                        title="Premium & Established Developers"
                        subtitle="These developers are known for consistent quality, thoughtful planning, and strong buyer confidence. Their projects appeal to both end-users and long-term investors."
                        data={premiumDevelopers}
                        router={router}
                    />

                    <DeveloperSection
                        title="Lifestyle & Community Developers"
                        subtitle="These developers specialize in integrated communities, accessibility, and lifestyle-centric living, making them attractive to families and first-time investors."
                        data={lifestyleDevelopers}
                        router={router}
                    />

                    <DeveloperSection
                        title="Boutique, Sustainable & Emerging Developers"
                        subtitle="This category highlights niche developers focused on luxury, sustainability, design innovation, and community well-being."
                        data={boutiqueDevelopers}
                        router={router}
                    />

                    {/* 5. Government Section */}
                    <AnimatedSection className="mb-24">
                        <div className="mb-10 pl-2">
                            <span className="text-[#C5A365] text-xs font-bold uppercase tracking-widest mb-2 block">Featured</span>
                            <h2 className="text-3xl md:text-5xl font-display text-secondary mb-4">Government & Master Development Authorities</h2>
                            <p className="text-gray-500 max-w-3xl leading-relaxed">
                                Government-backed entities play a vital role in Dubai's long-term urban planning, infrastructure, and sustainable development.
                            </p>
                        </div>
                        <AnimatedContainer className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
                            {[
                                { name: "Dubai Municipality", image: "/assets/dubai muncipalty.png", desc: "Responsible for urban planning, regulations, infrastructure, and environmental sustainability across the emirate.", largeLogo: true },
                                { name: "EXPO CITY DUBAI", image: "/assets/Expo city dubai.png", desc: "A future-ready smart city built on the legacy of Expo 2020, integrating innovation, sustainability, and modern urban living." }
                            ].map((dev, idx) => (
                                <AnimatedItem
                                    key={idx}
                                    className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-[#C5A365] hover:shadow-lg transition-all group flex flex-col h-full w-full max-w-md"
                                >
                                    <div className={`h-32 flex items-center justify-center mb-6 border-b border-gray-50 ${dev.largeLogo ? 'p-0.5' : 'p-6'}`}>
                                        <img src={dev.image} alt={dev.name} className="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300" />
                                    </div>
                                    <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow">
                                        {dev.desc}
                                    </p>
                                    <button 
                                        onClick={() => {
                                            router.push(`/properties?developer=${encodeURIComponent(dev.name)}`);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                        className="flex items-center gap-2 text-[#C5A365] text-sm font-bold uppercase tracking-wider group-hover:gap-3 transition-all cursor-pointer"
                                    >
                                        View Projects <ArrowRight size={16} />
                                    </button>
                                </AnimatedItem>
                            ))}
                        </AnimatedContainer>
                    </AnimatedSection>
                </div>
            </AnimatedSection>

            {/* 4. Explore Properties Map Section */}
            <AnimatedSection className="bg-white py-24 relative overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
                    <span className="text-[#C5A365] tracking-[0.2em] text-xs uppercase mb-4 block">Explore by Developer</span>
                    <h2 className="text-4xl md:text-5xl font-display text-black mb-12">Explore Properties by Trusted Developers</h2>

                    <div className="max-w-6xl mx-auto bg-black rounded-3xl overflow-hidden relative p-8 md:p-12">
                        <Hotspots
                            title="Choose from Top Developers"
                            showTitle={true}
                            showFilters={false}
                            showDeveloperFilters={true}
                            developerFilters={["All", "EMAAR", "DAMAC", "SOBHA", "MERAAS", "AZIZI", "NAKHEEL"]}
                            filterOptions={["All", "Villa", "2 BHK", "3 BHK", "1 BHK"]}
                            className="px-0 py-0 bg-transparent"
                        />
                    </div>
                </div>
            </AnimatedSection>
        </div>
    );
};

const DeveloperSection = ({ title, subtitle, data, router }) => {
    const handleViewProjects = (developerName) => {
        if (router) {
            router.push(`/properties?developer=${encodeURIComponent(developerName)}`);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <AnimatedSection className="mb-24">
            <div className="mb-10 pl-2">
                <span className="text-[#C5A365] text-xs font-bold uppercase tracking-widest mb-2 block">Featured</span>
                <h2 className="text-3xl md:text-5xl font-display text-secondary mb-4">{title}</h2>
                <p className="text-gray-500 max-w-3xl leading-relaxed">{subtitle}</p>
            </div>
            <AnimatedContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.map((dev, idx) => (
                    <AnimatedItem
                        key={idx}
                        className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-[#C5A365] hover:shadow-lg transition-all group flex flex-col h-full w-full max-w-md mx-auto cursor-pointer"
                        onClick={() => handleViewProjects(dev.name)}
                    >
                        <div className={`h-32 flex items-center justify-center mb-6 border-b border-gray-50 ${dev.largeLogo ? 'p-0.5' : 'p-3'}`}>
                            <img src={dev.image} alt={dev.name} className="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300" />
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow">
                            {dev.desc}
                        </p>
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                handleViewProjects(dev.name);
                            }}
                            className="flex items-center gap-2 text-[#C5A365] text-sm font-bold uppercase tracking-wider group-hover:gap-3 transition-all cursor-pointer"
                        >
                            View Projects <ArrowRight size={16} />
                        </button>
                    </AnimatedItem>
                ))}
            </AnimatedContainer>
        </AnimatedSection>
    );
};

export default Developers;
