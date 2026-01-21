'use client'

import React, { useState } from 'react';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    // Navigation Items
    const navItems = [
        { name: "Properties", path: "/properties" },
        { name: "Developers", path: "/developers" },
        { name: "Services", path: "/services" },
        { name: "Blogs", path: "/blogs" },
        { name: "Guide", path: "/guide" },
        { name: "About Us", path: "/about" }
    ];

    return (
        <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10 animate-fade-in-down">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="flex items-center">
                            <img src="/logo.png" alt="Credence Realtor" className="h-12 w-auto" />
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.path}
                                className={`text-sm uppercase tracking-wider font-medium transition-colors ${pathname === item.path
                                    ? 'text-primary'
                                    : 'text-gray-300 hover:text-primary'
                                    }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Contact / Right Side */}
                    <div className="hidden lg:flex items-center gap-6">
                        <div className="flex items-center text-white text-sm font-medium">
                            <Phone size={16} className="text-primary mr-2" />
                            +971 58 891 9223
                        </div>
                        <a
                            href="https://wa.me/971588919223"
                            target="_blank"
                            rel="noreferrer"
                            className="bg-green-600 hover:bg-green-700 text-white text-sm font-bold py-2.5 px-6 rounded-full transition-colors duration-300 flex items-center gap-2"
                        >
                            <MessageCircle size={18} />
                            WhatsApp Now
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-primary focus:outline-none">
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="lg:hidden bg-black border-t border-white/10 overflow-hidden transition-all duration-300">
                    <div className="px-4 pt-4 pb-6 space-y-2">
                        {navItems.map((item, index) => (
                            <div
                                key={item.name}
                                className="animate-fade-in-up"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <Link
                                    href={item.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${pathname === item.path
                                        ? 'text-primary bg-white/5'
                                        : 'text-gray-300 hover:text-primary hover:bg-white/5'
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            </div>
                        ))}
                        <div className="pt-4 space-y-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                            <div className="flex items-center text-white px-3 text-sm font-medium">
                                <Phone size={16} className="text-primary mr-2" />
                                +971 58 891 9223
                            </div>
                            <a href="https://wa.me/971588919223" className="block w-full text-center bg-green-600 text-white font-bold py-3 px-6 rounded-full transition-colors hover:bg-green-700">
                                WhatsApp Now
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
