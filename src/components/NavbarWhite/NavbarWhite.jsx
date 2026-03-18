import { useState } from "react";
import { motion } from "framer-motion";

const navbarAnimation = {
    hidden: {
        y: -120,
        opacity: 0
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: "easeOut"
        }
    }
};

const NavbarWhite = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const links = ["Products", "Stories", "Pricing", "Docs"];

    return (
        <motion.nav
            variants={navbarAnimation}
            initial="hidden"
            animate="visible"
            className="absolute flex flex-row top-0 left-0 w-full z-50 px-8 py-4 text-black text-sm bg-white border-b border-zinc-100 pointer-events-auto"
        >

            {/* LINKS DESKTOP */}
            <div className="hidden md:flex md:flex-row md:justify-between gap-8">

                <img
                    src="/images/porsche-logo.svg"
                    alt="logo"
                    loading="lazy"
                    decoding="async"
                    className="invert w-50 h-auto overflow-hidden select-none pointer-events-none"
                />

                <div className="flex gap-5">
                    <a href="#" className="relative overflow-hidden h-6 group">
                        Carros
                    </a>

                    <a href="#" className="relative overflow-hidden h-6 group">
                        911
                    </a>
                </div>

            </div>

            {/* MOBILE BUTTON */}
            <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden text-gray-300"
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
            </button>

            {/* MOBILE MENU */}
            <div
                className={`absolute top-15 left-0 w-full backdrop-blur-xl rounded-2xl bg-white/5 flex-col items-center gap-6 py-6 text-base ${menuOpen ? "flex" : "hidden"
                    }`}
            >
                {links.map((item) => (
                    <a key={item} className="hover:text-red-500" href="#">
                        {item}
                    </a>
                ))}
            </div>

        </motion.nav>
    );
};

export default NavbarWhite;