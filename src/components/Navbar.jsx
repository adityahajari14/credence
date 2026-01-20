'use client'

import React, { useState } from 'react';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

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
        <motion.nav 
            className="fixed w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="flex items-center">
                            <img src="/assets/Company_Logo_1-removebg-preview.png" alt="Credence Realtor" className="h-12 w-auto" />
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
                            +971 4 591 7373
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
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        className="lg:hidden bg-black border-t border-white/10"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div 
                            className="px-4 pt-4 pb-6 space-y-2"
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={{
                                open: {
                                    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
                                },
                                closed: {
                                    transition: { staggerChildren: 0.05, staggerDirection: -1 }
                                }
                            }}
                        >
                            {navItems.map((item, index) => (
                                <motion.div
                                    key={item.name}
                                    variants={{
                                        open: { opacity: 1, x: 0 },
                                        closed: { opacity: 0, x: -20 }
                                    }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Link
                                        href={item.path}
                                        onClick={() => setIsOpen(false)}
                                        className={`block px-3 py-2 text-base font-medium rounded-md ${pathname === item.path
                                            ? 'text-primary bg-white/5'
                                            : 'text-gray-300 hover:text-primary hover:bg-white/5'
                                            }`}
                                    >
                                        {item.name}
                                    </Link>
                                </motion.div>
                            ))}
                        <div className="pt-4 space-y-4">
                            <div className="flex items-center text-white px-3 text-sm font-medium">
                                <Phone size={16} className="text-primary mr-2" />
                                +971 4 591 7373
                            </div>
                            <a href="https://wa.me/971588919223" className="block w-full text-center bg-green-600 text-white font-bold py-3 px-6 rounded-full">
                                WhatsApp Now
                            </a>
                        </div>
                    </motion.div>
                </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
