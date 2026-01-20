'use client'

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { ArrowRight, MapPin, ChevronDown, ChevronUp, Star, Phone, MessageCircle, Percent, TrendingUp, Award, ShieldCheck, Users, Building2, Globe, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { getPaginatedProperties, formatPrice } from '@/lib/properties';
import { fadeInUp, fadeIn, scrollReveal, staggerContainer, staggerItem, hoverLift, fadeInOnScroll } from '@/utils/animations';
import Hotspots from '@/components/Hotspots';

const HomeContent = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [recentLaunches, setRecentLaunches] = useState([]);
    const [topPicks, setTopPicks] = useState([]);
    const [isLoadingProperties, setIsLoadingProperties] = useState(true);

    useEffect(() => {
        const hash = window.location.hash || searchParams?.get('hash');
        if (hash) {
            const element = document.getElementById(hash.replace('#', ''));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [searchParams]);

    // Fetch recent launches and top picks from API
    useEffect(() => {
        const loadProperties = async () => {
            setIsLoadingProperties(true);
            try {
                // Fetch recent launches - sorted by created_at desc, limit 4
                const recentResult = await getPaginatedProperties(
                    {},
                    1,
                    4
                );
                setRecentLaunches(recentResult.properties || []);

                // Fetch top picks - could be featured or top properties, limit 3
                // For now, we'll use the first 3 properties as top picks
                // You can modify this to use a specific filter or sorting criteria
                const topPicksResult = await getPaginatedProperties(
                    {},
                    1,
                    3
                );
                setTopPicks(topPicksResult.properties || []);
            } catch (error) {
                console.error('Error loading properties:', error);
                // Set empty arrays on error
                setRecentLaunches([]);
                setTopPicks([]);
            } finally {
                setIsLoadingProperties(false);
            }
        };

        loadProperties();
    }, []);
    // Stats
    const stats = [
        { value: "3000+", label: "Properties Sold" },
        { value: "15+", label: "Years Experience" },
        { value: "30+", label: "Countries Served" },
    ];

    // Benefits
    const benefits = [
        { title: "Zero Property Tax", description: "No annual property taxes or capital gains tax on your real estate investments", icon: <Percent size={24} /> },
        { title: "High Rental Yields", description: "Average rental returns of 6-10% annually, among the highest globally", icon: <TrendingUp size={24} /> },
        { title: "Golden Visa Eligibility", description: "Qualify for a 10-year UAE Golden Visa with property investment from AED 2M", icon: <Award size={24} /> },
        { title: "Regulated & Secure", description: "Escrow accounts and RERA regulations protect your investment", icon: <ShieldCheck size={24} /> },
    ];


    const categories = [
        { 
            name: "Waterfront Communities", 
            desc: "Beachfront living with stunning sea views",
            filterType: 'category',
            filterValue: 'Waterfront',
            image: "/assets/villa.png"
        },
        { 
            name: "Off-Plan Properties", 
            desc: "Early-bird prices with flexible payment plans",
            filterType: 'type',
            filterValue: 'Off-Plan',
            image: "/assets/villa.png"
        },
        { 
            name: "Affordable Communities", 
            desc: "Smart investments with high rental yields",
            filterType: 'category',
            filterValue: 'Affordable',
            image: "/assets/villa.png"
        },
        { 
            name: "Luxury Branded Residences", 
            desc: "World-class brands and premium finishes",
            filterType: 'category',
            filterValue: 'Luxury',
            image: "/assets/villa.png"
        },
    ];

    const developers = ["EMAAR", "DAMAC", "SOBHA", "MERAAS", "AZIZI", "NAKHEEL"];
    const developerLogos = [
        { name: "EMAAR", img: "/assets/Emaar.png" },
        { name: "DAMAC", img: "/assets/DAMAC.png" },
        { name: "SOBHA", img: "/assets/Sobha Realty.png" },
        { name: "MERAAS", img: "/assets/MERAAS.png" },
        { name: "AZIZI", img: "/assets/Azizi.png" }
    ];

    const filterOptions = [
        { name: "All", color: "bg-gray-400" },
        { name: "EMAAR", color: "bg-teal-500" },
        { name: "DAMAC", color: "bg-red-500" },
        { name: "SOBHA", color: "bg-blue-800" },
        { name: "MERAAS", color: "bg-gray-800" },
        { name: "AZIZI", color: "bg-yellow-600" },
        { name: "NAKHEEL", color: "bg-blue-400" }
    ];


    const faqs = [
        { q: "Can foreigners own property in Dubai?", a: " Yes, non-residents can buy freehold properties in designated areas of Dubai." },
        { q: "What is a freehold property & Leasehold property?", a: "A freehold property allows full ownership of the unit and land with the right to sell, lease, or pass it on. Leasehold property means you own the unit for a set period (usually up to 99 years), but not the land it’s built on. Ownership reverts to the landowner after the lease expires unless renewed." },
        { q: "Are there any taxes on property purchases?", a: "Dubai has no property tax, but buyers pay a one-time 4% Dubai Land Department (DLD) fee." },
        { q: "What is the minimum investment for buying property in Dubai?", a: "There’s no official minimum, but most off-plan and ready properties start from AED 600,000+." },
        { q: "Can I get residency by investing in Dubai property?", a: "Yes, property buyers can qualify for 2, 5, or 10-year residency visas based on the value of their investment." },
        { q: "What are the benefits of off-plan property investment?", a: "Lower prices, flexible payment plans, and high appreciation potential before handover." },
        { q: "How do I finance a property in Dubai?", a: "Residents and non-residents can apply for mortgages from UAE banks, with up to 80% financing." },
        { q: "How long does the property buying process take?", a: "A ready property can be purchased in 2–4 weeks; off-plan purchases are often quicker with developer contracts." },
        { q: "What documents are needed to buy property?", a: "A valid passport copy, Emirates ID copy (if resident), and Local ID copy (non-Resident) or Driving License copy (non-Resident) are required." },
        { q: "Is it safe to invest in Dubai real estate?", a: "Yes, the market is regulated by RERA and DLD, ensuring transparency, investor protection, and legal support." }
    ];

    // FAQ Component
    const FAQItem = ({ question, answer }) => {
        const [isOpen, setIsOpen] = useState(false);
        return (
            <div className="border border-gray-200 rounded-lg mb-4 overflow-hidden bg-white">
                <button
                    className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-gray-50 transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span className="font-semibold text-secondary">{question}</span>
                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {isOpen ? <ChevronUp className="text-primary" /> : <ChevronDown className="text-gray-400" />}
                    </motion.div>
                </button>
                {isOpen && (
                    <div className="px-6 py-4 bg-gray-50 text-gray-600 text-sm border-t border-gray-100">
                        {answer}
                    </div>
                )}
            </div>
        );
    };

    const [activeTestimonial, setActiveTestimonial] = useState(0);

    return (
        <div className="bg-white overflow-hidden font-sans">
            {/* 1. Hero Section */}
            <section className="relative min-h-screen flex items-center pb-20 md:pb-0">
                <div className="absolute inset-0">
                    <img src="/assets/hero-bg.png" alt="Dubai Skyline" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/40" />
                </div>

                <div className="container mx-auto px-4 md:px-6 relative z-10 pt-24 md:pt-34 max-w-7xl">
                    <motion.div 
                        className="max-w-3xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
                            <span className="text-accent text-sm font-bold uppercase tracking-widest">Dubai's Premier Real Estate Partner</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-display text-white mb-6 leading-[1.1]">
                            Find Your Perfect <br />
                            <span className="text-primary">Property in Dubai</span>
                        </h1>

                        <p className="text-gray-300 text-lg md:text-xl mb-8 md:mb-10 max-w-2xl leading-relaxed">
                            Discover exceptional investment opportunities with <span className="text-primary">high ROI potential</span>, zero property tax, and access to world-class developments from trusted developers.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-10 md:mb-16">
                            <Link href="/properties" className="bg-white hover:bg-primary text-black hover:text-white font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-lg shadow-white/10 text-center flex items-center justify-center">
                                Get Property Options
                            </Link>
                            <a href="https://wa.me/971588919223" target="_blank" rel="noreferrer" className="bg-white/10 hover:bg-green-600 hover:border-green-600 border border-white/30 backdrop-blur text-white font-bold py-4 px-8 rounded-full transition-all duration-300 flex items-center justify-center gap-2">
                                <MessageCircle size={20} />
                                WhatsApp Now
                            </a>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-8 border-t border-white/10">
                            {stats.map((stat, i) => (
                                <div key={i}>
                                    <p className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</p>
                                    <p className="text-gray-400 text-sm uppercase tracking-wider">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 2. Why Invest */}
            <motion.section 
                className="py-24 bg-white"
                initial={scrollReveal.initial}
                whileInView={scrollReveal.whileInView}
                viewport={scrollReveal.viewport}
                transition={scrollReveal.transition}
            >
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <motion.div 
                        className="text-center mb-16"
                        {...fadeInUp}
                    >
                        <span className="text-primary font-bold uppercase tracking-widest text-xs mb-2 block">Investment Benefits</span>
                        <h2 className="text-4xl font-display font-medium text-secondary mb-6">Why Invest in Dubai</h2>
                        <p className="text-gray-text max-w-2xl mx-auto">
                            Dubai offers unparalleled opportunities for property investors with world-class infrastructure and investor-friendly policies.
                        </p>
                    </motion.div>

                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-4 gap-8"
                        {...staggerContainer}
                    >
                        {benefits.map((benefit, i) => (
                            <motion.div 
                                key={i} 
                                className="p-8 border border-gray-100 rounded-2xl bg-white hover:shadow-xl hover:border-primary/20 transition-all duration-300"
                                variants={staggerItem}
                                {...hoverLift}
                            >
                                <div className="w-12 h-12 bg-[#F9F7F2] rounded-xl mb-6 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                    {benefit.icon}
                                </div>
                                <h3 className="text-xl font-display font-semibold text-secondary mb-3">{benefit.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{benefit.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.section>

            {/* 3. Most Recent Launches */}
            <motion.section 
                className="py-24 bg-gray-50"
                initial={scrollReveal.initial}
                whileInView={scrollReveal.whileInView}
                viewport={scrollReveal.viewport}
                transition={scrollReveal.transition}
            >
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <motion.div 
                        className="text-center mb-16"
                        {...fadeInUp}
                    >
                        <span className="text-primary font-bold uppercase tracking-widest text-xs mb-2 block">New Opportunities</span>
                        <h2 className="text-4xl font-display font-medium text-secondary mb-6">Most Recent Launches</h2>
                        <p className="text-gray-text">Be among the first to access Dubai's newest developments with exclusive launch prices.</p>
                    </motion.div>

                    {isLoadingProperties ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse">
                                    <div className="h-64 bg-gray-200"></div>
                                    <div className="p-5">
                                        <div className="h-4 bg-gray-200 rounded mb-2"></div>
                                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : recentLaunches.length > 0 ? (
                        <motion.div 
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                            {...staggerContainer}
                        >
                            {recentLaunches.map((item) => (
                                <motion.div 
                                    key={item.id} 
                                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
                                    variants={staggerItem}
                                    {...hoverLift}
                                >
                                    <div className="h-64 relative overflow-hidden">
                                        <img 
                                            src={item.mainImage || "/assets/villa.png"} 
                                            alt={item.title} 
                                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        <div className="absolute bottom-4 left-4 text-white">
                                            <p className="text-xs uppercase tracking-wider mb-1 opacity-90">
                                                Developer: {item.developer || 'N/A'}
                                            </p>
                                            <h3 className="text-lg font-bold">{item.title}</h3>
                                            <div className="flex items-center text-xs opacity-80 mt-1">
                                                <MapPin size={12} className="mr-1" /> {item.location}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <div className="flex justify-between items-end mb-4 border-b border-gray-100 pb-4">
                                            <div>
                                                <p className="text-xs text-gray-400 uppercase">Delivery Date</p>
                                                <p className="text-secondary font-semibold text-sm">
                                                    {item.readyDate || 'TBA'}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs text-gray-400 uppercase">Starting From</p>
                                                <p className="text-primary font-bold text-lg">
                                                    AED {formatPrice(item.price)}
                                                </p>
                                            </div>
                                        </div>
                                        <Link 
                                            href={`/properties/${item.id}`} 
                                            className="w-full py-2.5 bg-secondary text-white rounded-lg text-sm font-medium hover:bg-black transition-colors block text-center"
                                        >
                                            Inquire
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <div className="text-center py-12 text-gray-500">
                            <p>No recent launches available at the moment.</p>
                        </div>
                    )}
                </div>
            </motion.section>

            {/* 4. Browse Properties (Collections) */}
            <motion.section 
                className="py-24 bg-white"
                initial={scrollReveal.initial}
                whileInView={scrollReveal.whileInView}
                viewport={scrollReveal.viewport}
                transition={scrollReveal.transition}
            >
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <motion.div 
                        className="text-center mb-16"
                        {...fadeInUp}
                    >
                        <span className="text-primary font-bold uppercase tracking-widest text-xs mb-2 block">Browse Properties</span>
                        <h2 className="text-4xl font-display font-medium text-secondary mb-6">Discover Your Ideal Property</h2>
                        <p className="text-gray-text">Explore our curated collections tailored to different investment goals and lifestyles.</p>
                    </motion.div>

                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                        {...staggerContainer}
                    >
                        {categories.map((cat, i) => {
                            // Build the URL with appropriate filter
                            const filterParam = cat.filterType === 'type' ? 'type' : 'category';
                            const filterUrl = `/properties?${filterParam}=${encodeURIComponent(cat.filterValue)}`;
                            
                            return (
                                <motion.div
                                    key={i}
                                    variants={staggerItem}
                                    {...hoverLift}
                                >
                                    <Link
                                        href={filterUrl}
                                        className="relative h-72 rounded-2xl overflow-hidden group cursor-pointer block"
                                    >
                                        <img 
                                            src={cat.image} 
                                            alt={cat.name}
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                                        />
                                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors" />
                                    <div className="absolute bottom-0 left-0 p-8">
                                        <h3 className="text-2xl font-bold text-white mb-2">{cat.name}</h3>
                                        <p className="text-gray-300 text-sm">{cat.desc}</p>
                                        <div className="mt-4 flex items-center gap-2 text-white/80 group-hover:text-white transition-colors">
                                            <span className="text-sm font-medium">Explore Properties</span>
                                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </motion.section>

            {/* 5. Explore by Developer */}
            <motion.section 
                className="bg-white pt-20"
                initial={scrollReveal.initial}
                whileInView={scrollReveal.whileInView}
                viewport={scrollReveal.viewport}
                transition={scrollReveal.transition}
            >
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    {/* Top Header & Logos */}
                    <motion.div 
                        className="text-center mb-12"
                        {...fadeInUp}
                    >
                        <span className="text-[#C5A365] text-xs font-bold uppercase tracking-widest mb-4 block">Explore by Developer</span>
                        <h2 className="text-3xl md:text-5xl font-display text-secondary mb-12">Explore Properties by Trusted Developers</h2>

                        <div className="flex flex-wrap justify-center gap-6 mb-16">
                            {developerLogos.map((dev, i) => (
                                <div 
                                    key={i} 
                                    className="w-48 h-20 border border-secondary/20 rounded-lg flex items-center justify-center p-4 hover:border-[#C5A365] transition-colors bg-white"
                                >
                                    <img 
                                        src={dev.img} 
                                        alt={dev.name} 
                                        className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300" 
                                    />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Map Section */}
                <div className="bg-white py-16 text-black relative overflow-hidden">
                    <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
                        <Hotspots 
                            title="Choose from Top Developers"
                            showTitle={true}
                            filterOptions={["All", "Villa", "2 BHK", "3 BHK", "1 BHK"]}
                            className="px-0 py-0"
                        />
                    </div>
                </div>
            </motion.section>

            {/* 6. Handpicked Selection (Dark) */}
            <motion.section 
                className="py-24 bg-secondary text-white"
                initial={scrollReveal.initial}
                whileInView={scrollReveal.whileInView}
                viewport={scrollReveal.viewport}
                transition={scrollReveal.transition}
            >
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <motion.div 
                        className="text-center mb-16"
                        {...fadeInUp}
                    >
                        <span className="text-primary font-bold uppercase tracking-widest text-xs mb-2 block">Handpicked Selection</span>
                        <h2 className="text-4xl font-display font-medium mb-6">Our Top Picks</h2>
                        <p className="text-gray-400">Premium developments personally curated by our experts for exceptional value and lifestyle.</p>
                    </motion.div>

                    {isLoadingProperties ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="bg-white/5 rounded-xl overflow-hidden border border-white/10 animate-pulse">
                                    <div className="h-64 bg-gray-700"></div>
                                    <div className="p-6">
                                        <div className="h-4 bg-gray-700 rounded mb-2"></div>
                                        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : topPicks.length > 0 ? (
                        <motion.div 
                            className="grid grid-cols-1 md:grid-cols-3 gap-8"
                            {...staggerContainer}
                        >
                            {topPicks.map((item) => (
                                <motion.div 
                                    key={item.id} 
                                    className="bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-primary/50 transition-colors"
                                    variants={staggerItem}
                                    {...hoverLift}
                                >
                                    <div className="h-64 relative">
                                        <img 
                                            src={item.mainImage || "/assets/villa.png"} 
                                            alt={item.title} 
                                            className="w-full h-full object-cover" 
                                        />
                                        <div className="absolute top-4 left-4 bg-primary text-black text-xs font-bold px-3 py-1 rounded">Top Pick</div>
                                    </div>
                                    <div className="p-6">
                                        <p className="text-xs text-gray-400 uppercase mb-1">
                                            Developer: {item.developer || 'N/A'}
                                        </p>
                                        <h3 className="text-xl font-bold mb-4">{item.title}</h3>

                                        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                                            <div>
                                                <span className="block text-gray-500 text-xs">Location</span>
                                                {item.location}
                                            </div>
                                            <div>
                                                <span className="block text-gray-500 text-xs">Handover</span>
                                                {item.readyDate || 'TBA'}
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                            <div>
                                                <span className="block text-gray-500 text-xs">Starting From</span>
                                                <span className="text-primary font-bold text-lg">
                                                    AED {formatPrice(item.price)}
                                                </span>
                                            </div>
                                            <Link 
                                                href={`/properties/${item.id}`} 
                                                className="px-6 py-2 bg-white text-black font-bold rounded hover:bg-primary transition-colors text-sm"
                                            >
                                                Inquire
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <div className="text-center py-12 text-gray-400">
                            <p>No top picks available at the moment.</p>
                        </div>
                    )}
                </div>
            </motion.section>

            {/* 7. Market Insights */}
            <motion.section 
                className="py-24 bg-white"
                initial={scrollReveal.initial}
                whileInView={scrollReveal.whileInView}
                viewport={scrollReveal.viewport}
                transition={scrollReveal.transition}
            >
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
                        <motion.div 
                            className="lg:w-1/2"
                            {...fadeInUp}
                        >
                            <span className="text-primary font-bold uppercase tracking-widest text-xs mb-2 block">Market Insights</span>
                            <h2 className="text-4xl lg:text-5xl font-display font-medium text-secondary mb-6 leading-tight">Dubai's Real Estate Momentum</h2>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Dubai's property market continues to set global records, driven by visionary infrastructure, world-class amenities, and investor-friendly policies that attract wealth from every continent.
                            </p>
                            <p className="text-gray-600 mb-10 leading-relaxed">
                                With transparent regulations, escrow protections, and a stable economy backed by diversification beyond oil, Dubai remains one of the safest and most lucrative real estate markets worldwide.
                            </p>

                            {/* Trusted By Section based on image */}
                            <div className="flex items-center gap-4">
                                <div className="flex -space-x-4">
                                    {[1, 2, 3, 4].map(n => (
                                        <div key={n} className="w-12 h-12 rounded-full border-2 border-white bg-gray-200" />
                                    ))}
                                </div>
                                <div>
                                    <p className="font-bold text-secondary text-sm">Trusted by 500+ investors</p>
                                    <p className="text-xs text-gray-500">From 30+ countries worldwide</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div 
                            className="lg:w-1/2 w-full"
                            {...fadeInUp}
                        >
                            <motion.div 
                                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                                {...staggerContainer}
                            >
                                <motion.div 
                                    className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
                                    variants={staggerItem}
                                    {...hoverLift}
                                >
                                    <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-primary mb-6">
                                        <TrendingUp size={20} />
                                    </div>
                                    <h4 className="text-4xl font-bold text-secondary mb-1">27%</h4>
                                    <p className="font-bold text-secondary text-sm mb-1">Property Value Growth</p>
                                    <p className="text-xs text-gray-400">Average annual appreciation</p>
                                </motion.div>
                                <motion.div 
                                    className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
                                    variants={staggerItem}
                                    {...hoverLift}
                                >
                                    <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-primary mb-6">
                                        <Users size={20} />
                                    </div>
                                    <h4 className="text-4xl font-bold text-secondary mb-1">3.5M</h4>
                                    <p className="font-bold text-secondary text-sm mb-1">Population Growth</p>
                                    <p className="text-xs text-gray-400">Expected by 2040</p>
                                </motion.div>
                                <motion.div 
                                    className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
                                    variants={staggerItem}
                                    {...hoverLift}
                                >
                                    <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-primary mb-6">
                                        <Building2 size={20} />
                                    </div>
                                    <h4 className="text-4xl font-bold text-secondary mb-1">$82B</h4>
                                    <p className="font-bold text-secondary text-sm mb-1">Transactions 2023</p>
                                    <p className="text-xs text-gray-400">Record-breaking year</p>
                                </motion.div>
                                <motion.div 
                                    className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
                                    variants={staggerItem}
                                    {...hoverLift}
                                >
                                    <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-primary mb-6">
                                        <Globe size={20} />
                                    </div>
                                    <h4 className="text-4xl font-bold text-secondary mb-1">200+</h4>
                                    <p className="font-bold text-secondary text-sm mb-1">Nationalities</p>
                                    <p className="text-xs text-gray-400">Diverse investor base</p>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* 7. Testimonials (Slider) */}
            <motion.section 
                className="py-24 bg-white"
                initial={scrollReveal.initial}
                whileInView={scrollReveal.whileInView}
                viewport={scrollReveal.viewport}
                transition={scrollReveal.transition}
            >
                <div className="container mx-auto px-4 max-w-7xl">
                    <motion.div 
                        className="text-center mb-16"
                        {...fadeInUp}
                    >
                        <span className="text-[#C5A365] text-xs font-bold uppercase tracking-widest mb-4 block">Testimonials</span>
                        <h2 className="text-4xl md:text-5xl font-display text-secondary">Happy Clients</h2>
                    </motion.div>

                    <motion.div 
                        className="max-w-4xl mx-auto relative"
                        {...fadeInOnScroll}
                    >
                        {/* Slider Content */}
                        <div 
                            className="bg-[#F9F9F9] p-8 md:p-12 rounded-2xl shadow-sm text-center relative overflow-hidden"
                        >
                            {/* Quote Icon */}
                            <div className="text-[#C5A365] text-4xl font-serif mb-6 opacity-80">“</div>

                            {/* Stars */}
                            <div className="flex justify-center mb-6 text-[#C5A365]">
                                {[1, 2, 3, 4, 5].map(n => <Star key={n} size={20} fill="currentColor" />)}
                            </div>

                            {/* Text */}
                            <div className="min-h-[120px] flex items-center justify-center">
                                <h3 className="text-xl md:text-2xl font-serif italic text-secondary leading-relaxed max-w-2xl mx-auto">
                                    "{[
                                        "The team's knowledge of the luxury market is exceptional. They found me a branded residence that exceeded my expectations.",
                                        "Professional, transparent, and incredibly helpful. They guided me through the entire Golden Visa process seamlessy.",
                                        "I was looking for a high-yield investment, and Credence delivered exactly that. Their market insights are top-notch."
                                    ][activeTestimonial]}"
                                </h3>
                            </div>

                            {/* Author */}
                            <div className="flex items-center justify-center gap-4 mt-8">
                                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xl font-bold text-gray-500">
                                    {["E", "M", "S"][activeTestimonial]}
                                </div>
                                <div className="text-left">
                                    <p className="font-bold text-secondary">
                                        {["Elena Petrova", "Michael Chen", "Sarah Johnson"][activeTestimonial]}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {["Russia • Palm Jumeirah", "UK • Downtown Dubai", "UAE • Dubai Hills"][activeTestimonial]}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Slider Controls */}
                        <div className="flex justify-center items-center gap-4 mt-8">
                            <button
                                onClick={() => setActiveTestimonial(prev => (prev === 0 ? 2 : prev - 1))}
                                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-[#C5A365] hover:text-[#C5A365] transition-colors bg-white"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <div className="flex gap-2">
                                {[0, 1, 2].map(idx => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveTestimonial(idx)}
                                        className={`w-2 h-2 rounded-full transition-all ${activeTestimonial === idx ? 'w-8 bg-[#C5A365]' : 'bg-gray-200'}`}
                                    />
                                ))}
                            </div>
                            <button
                                onClick={() => setActiveTestimonial(prev => (prev === 2 ? 0 : prev + 1))}
                                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-[#C5A365] hover:text-[#C5A365] transition-colors bg-white"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* 9. FAQ */}
            <motion.section 
                className="py-24 bg-white"
                initial={scrollReveal.initial}
                whileInView={scrollReveal.whileInView}
                viewport={scrollReveal.viewport}
                transition={scrollReveal.transition}
            >
                <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                    <motion.div 
                        className="text-center mb-16"
                        {...fadeInUp}
                    >
                        <span className="text-primary font-bold uppercase tracking-widest text-xs mb-2 block">Got Questions?</span>
                        <h2 className="text-4xl font-display font-medium text-secondary mb-6">Frequently Asked Questions</h2>
                        <p className="text-gray-text">Everything you need to know about investing in Dubai real estate</p>
                    </motion.div>

                    <div className="space-y-4">
                        {faqs.map((item, i) => (
                            <FAQItem key={i} question={item.q} answer={item.a} />
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* 10. Contact Us Form */}
            <motion.section 
                id="contact" 
                className="py-24 bg-[#F9F7F2]"
                initial={scrollReveal.initial}
                whileInView={scrollReveal.whileInView}
                viewport={scrollReveal.viewport}
                transition={scrollReveal.transition}
            >
                <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                    <motion.div 
                        className="text-center mb-12"
                        {...fadeInUp}
                    >
                        <span className="text-primary font-bold uppercase tracking-widest text-xs mb-2 block">Get in Touch</span>
                        <h2 className="text-4xl font-display font-medium text-secondary mb-6">Contact Our Experts</h2>
                        <p className="text-gray-text max-w-2xl mx-auto">
                            Ready to start your Dubai real estate journey? Fill out the form below and our team will get back to you shortly.
                        </p>
                    </motion.div>

                    <motion.div 
                        className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100"
                        {...fadeInUp}
                    >
                        <form className="space-y-6">
                            {/* Hidden Access Key Input for Web3Forms (To be uncommented/added later) */}
                            {/* <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" /> */}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-secondary mb-2">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Your Name"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C5A365] transition-colors"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-secondary mb-2">Phone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Your Phone Number"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C5A365] transition-colors"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-secondary mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email Address"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C5A365] transition-colors"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-secondary mb-2">Request Appointment Date/Time</label>
                                <input
                                    type="datetime-local"
                                    name="appointment"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C5A365] transition-colors text-gray-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-secondary mb-2">Message</label>
                                <textarea
                                    name="message"
                                    rows="4"
                                    placeholder="How can we help you?"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C5A365] transition-colors resize-none"
                                    required
                                ></textarea>
                            </div>

                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="bg-[#1A1A1A] text-white px-10 py-4 rounded-full font-bold hover:bg-[#C5A365] transition-all min-w-[200px]"
                                >
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </motion.section>



        </div>
    );
};

const Home = () => {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="text-black text-lg md:text-xl font-semibold">Loading...</div>
                </div>
            </div>
        }>
            <HomeContent />
        </Suspense>
    );
};

export default Home;
