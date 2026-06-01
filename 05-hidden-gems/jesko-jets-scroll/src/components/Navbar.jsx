"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import NavItem from "./NavbarItem";
import Image from "next/image";
import skyightLogo from "@/assets/images/logo.svg";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Prevent scrolling when sidebar is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isOpen]);

    const navLinks = [
        { text: "About", href: "#" },
        { text: "Our Fleet", href: "#" },
        { text: "Advantages", href: "#" },
        { text: "Global", href: "#" },
    ];

    const contactLinks = [
        { text: "+971 54 432 5050", href: "tel:+971544325050" },
        { text: "info@jeskojets.com", href: "mailto:info@jeskojets.com" },
    ];

    return (
        <>
            <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-10 lg:px-20 py-8 text-[10px] z-[100] pointer-events-none">
                {/* Desktop Left - Hidden below LG */}
                <div className="hidden lg:flex items-center gap-4 tracking-tight pointer-events-auto">
                    {navLinks.map((link) => (
                        <NavItem key={link.text} text={link.text} />
                    ))}
                </div>

                {/* Empty space in middle for the animated logo to land */}
                <div className="w-[150px] hidden lg:block" />

                {/* Desktop Right - Hidden below LG */}
                <div className="hidden lg:flex items-center gap-4 tracking-tight pointer-events-auto">
                    {contactLinks.map((link) => (
                        <NavItem key={link.text} text={link.text} />
                    ))}
                </div>

                {/* Mobile Menu Icon - Only visible below LG at the right corner */}
                <div className="lg:hidden flex w-full justify-end pointer-events-auto">
                    <button
                        onClick={() => setIsOpen(true)}
                        className="text-white p-2 hover:bg-white/10 rounded-sm transition-all duration-300 cursor-pointer"
                    >
                        <Menu size={20} strokeWidth={1.5} />
                    </button>
                </div>
            </nav>

            {/* Sidebar Overlay */}
            <div
                className={`fixed inset-0 z-[300] transition-all duration-500 ${isOpen ? "opacity-100 pointer-events-auto backdrop-blur-sm" : "opacity-0 pointer-events-none"
                    }`}
                onClick={() => setIsOpen(false)}
            >
                {/* Black Overlay Tint */}
                <div className="absolute inset-0 bg-black/50" />

                {/* Sidebar Content */}
                <div
                    className={`absolute right-0 top-0 h-screen w-3/4 sm:w-1/2 bg-[#0a0a0a] transition-transform duration-500 ease-in-out flex flex-col px-6 pt-8 pb-10 ${isOpen ? "translate-x-0" : "translate-x-full"
                        }`}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Sidebar Header: Logo & Close Icon */}
                    <div className="flex items-center justify-between mb-20">
                        <Image
                            src={skyightLogo}
                            alt="Logo"
                            width={120}
                            className="brightness-0 invert"
                        />
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white p-2 hover:bg-white/10 transition-all duration-300 rounded-sm cursor-pointer mt-4"
                        >
                            <X size={20} strokeWidth={1.5} />
                        </button>
                    </div>

                    {/* Sidebar Menu Items */}
                    <div className="flex flex-col gap-4 items-start">
                        {[...navLinks, ...contactLinks].map((link) => (
                            <div key={link.text} className="text-base" onClick={() => setIsOpen(false)}>
                                <NavItem text={link.text} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;