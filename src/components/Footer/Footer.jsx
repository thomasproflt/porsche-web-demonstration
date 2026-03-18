import { useState } from "react";

const Footer = () => {
    return (
        <footer className="bg-[#0E0E12] text-white px-10 py-15"> {/**rounded-tr-2xl rounded-tl-2xl */}
            <p className="mb-3">
                © 2026 AT. Thomas - Porsche Demo.
            </p>

            {/* 🔥 NOVA DESCRIÇÃO */}
            <p className="text-[14px] text-zinc-400 mb-5">
                This website is an independent demonstration project created for design and development purposes only.
                It is not affiliated with, endorsed by, or officially connected to Porsche AG.
                All trademarks, images, and brand references belong to their respective owners.
            </p>

            <p className="text-[14px] text-zinc-400 mb-20">
                * If the values are given as ranges, these do not relate to a single, individual vehicle and do not constitute part of the offer. They are intended solely as a means of comparing different vehicle models and refer to the product portfolio that is available on the German market. Extra features and accessories (attachments, tyre formats etc.) can change relevant vehicle parameters such as weight, rolling resistance and aerodynamics and, in addition to weather and traffic conditions, as well as individual handling, can affect the fuel consumption, energy consumption, CO₂ emissions, range and performance values of a car.
            </p>

            <div className="flex items-center justify-center">
                <img
                src="/images/porsche-logo.svg"
                alt="logo"
                className="w-50 h-5 overflow-hidden select-none pointer-events-none"
                />
            </div>
        </footer>
    );
};

export default Footer;