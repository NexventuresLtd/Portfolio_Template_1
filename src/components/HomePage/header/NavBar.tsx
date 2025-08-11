import React, { useState, useEffect } from "react";
import {  Menu, X } from "lucide-react";
import { useTheme } from "../../../contexts/ThemeContext";
import { useLanguage } from "../../../contexts/LanguageContext";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import ThemeToggle from "./ThemeToggle";
import LanguageSelector from "./LanguageSelector";
import MobileMenu from "./MobileMenu";
import type { NavItem } from "../../../types/HeaderTypes";


const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
    const [windowWidth, setWindowWidth] = useState(
        typeof window !== "undefined" ? window.innerWidth : 1024
    );

    // Theme and Language hooks
    const { theme } = useTheme();
    const { t } = useLanguage();

    const navItems: NavItem[] = [
        { name: t('navbar.menu.home'), href: '/' },
        {
            name: t('navbar.menu.services'),
            href: '/services',
            hasDropdown: false,
            dropdownItems: [
                { name: t('navbar.menu.residential'), href: '#residential' },
                { name: t('navbar.menu.commercial'), href: '#commercial' },
                { name: t('navbar.menu.renovations'), href: '#renovations' },
                { name: t('navbar.menu.management'), href: '#management' }
            ]
        },
        { name: t('navbar.menu.projects'), href: '#projects' },
        { name: t('navbar.menu.about'), href: '#about' },
        { name: t('navbar.menu.testimonials'), href: '#testimonials' },
        { name: t('navbar.menu.contact'), href: '#contact' }
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            // Close dropdowns if screen size changes to desktop
            if (window.innerWidth >= 768) {
                setIsOpen(false);
                setActiveDropdown(null);
            }
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                activeDropdown &&
                !(event.target as Element).closest(".dropdown-container")
            ) {
                setActiveDropdown(null);
            }
            if (
                showLanguageDropdown &&
                !(event.target as Element).closest(".language-selector")
            ) {
                setShowLanguageDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [activeDropdown, showLanguageDropdown]);

    const handleDropdownToggle = (itemName: string | null) => {
        setActiveDropdown(itemName);
    };

    const toggleLanguageDropdown = () => {
        setShowLanguageDropdown(!showLanguageDropdown);
    };

    const closeMobileMenu = () => {
        setIsOpen(false);
    };

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${isScrolled
                ? `${theme === "dark" ? "bg-surface" : "bg-primary"
                } backdrop-blur-md shadow-lg }`
                : "bg-transparent"
                }`}
        >
            {/* Main navigation */}
            <div className="w-full md:max-w-11/12 mx-auto px-0">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Logo isScrolled={isScrolled} />

                    {/* Desktop navigation */}
                    <NavLinks
                        navItems={navItems}
                        isScrolled={isScrolled}
                        activeDropdown={activeDropdown}
                        windowWidth={windowWidth}
                        onDropdownToggle={handleDropdownToggle}
                    />

                    {/* Right side controls */}
                    <div className="flex items-center ">
                        {/* Theme Toggle */}
                        <ThemeToggle isScrolled={isScrolled} />

                        {/* Language Selector - Desktop */}
                        <LanguageSelector
                            isScrolled={isScrolled}
                            showLanguageDropdown={showLanguageDropdown}
                            onToggleDropdown={toggleLanguageDropdown}
                        />

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`lg:hidden p-2 rounded-md ${isScrolled
                                ? theme === "dark"
                                    ? "text-primary"
                                    : "text-white"
                                : "text-white"
                                }`}
                        >
                            {isOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <MobileMenu
                isOpen={isOpen}
                navItems={navItems}
                activeDropdown={activeDropdown}
                onDropdownToggle={handleDropdownToggle}
                onClose={closeMobileMenu}
            />
        </nav>
    );
};

export default Navbar;
