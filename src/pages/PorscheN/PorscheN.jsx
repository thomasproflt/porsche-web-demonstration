import React from "react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavbarWhite from "../../components/NavbarWhite/NavbarWhite";
import Footer from "../../components/Footer/Footer";

const ArrowLeft = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
    </svg>
);

const ArrowRight = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
    </svg>
);

const textLeft = {
    hidden: {
        opacity: 0,
        x: -80
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut"
        }
    }
};

const textRight = {
    hidden: {
        opacity: 0,
        x: 80
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut"
        }
    }
};

const catalogContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15
        }
    }
};

const catalogItem = {
    hidden: {
        opacity: 0,
        y: 40
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    }
};

const pizzaItem = {
    hidden: {
        opacity: 0,
        y: -440
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 2.6,
            ease: "easeOut"
        }
    }
};

const PorscheN = () => {
    // Effect for Video of the Hero Section
    const videoRef = useRef(null);
    const sectionRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [showThumb, setShowThumb] = useState(true);
    const [userInteracted, setUserInteracted] = useState(false);
    const [hasAutoPlayed, setHasAutoPlayed] = useState(false);
    const [pausedByUser, setPausedByUser] = useState(false);

    const [active, setActive] = useState(null);

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!videoRef.current) return;

                if (entry.isIntersecting) {
                    // ✅ PRIMEIRA VEZ → autoplay
                    if (!hasAutoPlayed) {
                        videoRef.current.play();
                        setIsPlaying(true);
                        setHasAutoPlayed(true);
                    }

                    // ✅ SE NÃO FOI PAUSADO PELO USUÁRIO → pode voltar sozinho
                    else if (!pausedByUser) {
                        videoRef.current.play();
                        setIsPlaying(true);
                    }

                    // ❌ SE FOI O USUÁRIO → NÃO FAZ NADA
                } else {
                    // 👇 só pausa automático (não marca como user)
                    videoRef.current.pause();
                    setIsPlaying(false);
                }
            },
            { threshold: 0.6 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, [hasAutoPlayed, pausedByUser]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowThumb(false);
        }, 2000); // tempo antes do vídeo aparecer

        return () => clearTimeout(timer);
    }, []);

    const togglePlay = () => {
        if (!videoRef.current) return;

        setUserInteracted(true);

        if (isPlaying) {
            videoRef.current.pause();
            setIsPlaying(false);
            setPausedByUser(true); // 👈 usuário pausou manualmente
        } else {
            videoRef.current.play();
            setIsPlaying(true);
            setPausedByUser(false); // 👈 voltou a tocar manualmente
        }
    };

    const toggleMute = () => {
        if (!videoRef.current) return;

        videoRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
    };

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % carImages.length);
    };

    const prevImage = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? carImages.length - 1 : prev - 1
        );
    };

    const carImages = [
        "/images/models/front.png",
        "/images/models/diagonal-frontal.jpg",
        "/images/models/lateral.jpg",
        "/images/models/back.jpg",
        "/images/models/up.jpg",
        "/images/models/left-up.jpg",
    ];
    return (
        <>
            <NavbarWhite />

            <div className="min-h-screen">

                <section
                    ref={sectionRef}
                    className="flex flex-col min-h-screen w-full relative overflow-hidden"
                >
                    {/* IMAGEM */}
                    <div className="relative flex items-center justify-center">

                        <AnimatePresence mode="wait">
                            <motion.img
                                key={currentIndex}
                                src={carImages[currentIndex]}
                                alt="car"
                                className="w-full h-[50vh] md:h-auto object-contain"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                            />
                        </AnimatePresence>

                        {/* BOTÕES */}
                        <div className="absolute right-3 bottom-3 md:right-5 md:bottom-5 z-20 flex gap-3 md:gap-5">

                            <button
                                onClick={prevImage}
                                className="bg-black/10 hover:bg-black/20 text-black p-2 md:p-3 rounded-md backdrop-blur-md transition-all"
                            >
                                {ArrowLeft}
                            </button>

                            <button
                                onClick={nextImage}
                                className="bg-black/10 hover:bg-black/20 text-black p-2 md:p-3 rounded-md backdrop-blur-md transition-all"
                            >
                                {ArrowRight}
                            </button>

                        </div>

                    </div>

                    {/* THUMBNAILS */}
                    <div className="flex gap-2 md:gap-3 justify-center mt-4 md:-mt-22 mb-10 md:mb-20 px-2 overflow-x-auto md:overflow-visible">

                        {carImages.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                onClick={() => setCurrentIndex(index)}
                                className={`
                    min-w-[60px] h-[60px] md:w-20 md:h-20
                    object-cover rounded-md cursor-pointer
                    border-2 transition-all duration-300
                    ${currentIndex === index
                                        ? "border-black scale-105"
                                        : "border-transparent opacity-60"}
                `}
                            />
                        ))}

                    </div>

                    {/* CONTEÚDO */}
                    <div className="flex flex-col items-center justify-center text-center px-5 md:px-0 md:relative md:top-0 z-10">

                        <motion.h1
                            variants={textLeft}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="font-light text-2xl md:text-4xl mb-3 md:mb-3 text-black md:text-left md:max-w-xl"
                        >
                            911 Carrera
                        </motion.h1>

                        <motion.p
                            variants={textRight}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="text-sm md:text-base mb-4 md:mb-3 text-black md:text-left max-w-lg"
                        >
                            Gasolina
                        </motion.p>

                        {/* BOTÕES */}
                        <motion.div
                            variants={catalogContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="flex flex-col md:flex-row md:items-center md:justify-center gap-2 w-full max-w-xs md:max-w-none mb-10 md:mb-10"
                        >
                            <motion.button
                                variants={catalogItem}
                                className="bg-black text-white py-2 px-6 rounded-lg"
                            >
                                Alterar Modelo
                            </motion.button>

                            <motion.button
                                variants={catalogItem}
                                className="border border-black py-2 px-6 rounded-lg text-black"
                            >
                                Personalizar
                            </motion.button>
                        </motion.div>

                        {/* TEXTO FINAL */}
                        <motion.p
                            variants={catalogItem}
                            className="text-[11px] md:text-[13px] text-center md:text-left px-2 md:px-0 mb-5"
                        >
                            911 Carrera GTS (WLTP, valores preliminares): Consumo de combustível combinado: 11,0 – 10,5 l/100 km; Emissões de CO₂ combinadas: 251 – 239 g/km
                        </motion.p>

                    </div>

                </section>

                <section className="min-h-screen text-black max-w-full relative overflow-hidden py-[10.10rem]">

                    {/* HEADER */}
                    <div className="flex flex-col items-start text-left px-10 md:px-15 mb-20">

                        <motion.h1
                            variants={textRight}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="text-[20px] md:text-5xl text-black mb-5"
                        >
                            Os modelos Porsche 911 de 2025
                        </motion.h1>

                        <motion.p
                            variants={textRight}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="text-[16px] text-black mb-5 max-w-2xl"
                        >
                            28/05/2024 911 Carrera GTS: O primeiro Porsche de produção com o inovador e leve sistema T-Hybrid, equipado com um motor boxer de seis cilindros e 3,6 litros recém-desenvolvido, turbocompressor acionado eletricamente e motor elétrico integrado à transmissão.
                        </motion.p>

                        <motion.div
                            variants={catalogContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="overflow-hidden rounded-md mb-20"
                        >
                            <motion.img
                                variants={catalogItem}
                                src="/images/hero/0881_nevada_coupe_u-crane_AKOS2546_edit_V02.jpg"
                                alt="porsche-911"
                                loading="lazy"
                                decoding="async"
                                className="w-200 h-auto overflow-hidden"
                            />
                        </motion.div>

                        <motion.h1
                            variants={textRight}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="text-[20px] md:text-5xl text-black mb-5"
                        >
                            Coleção para dar mais Estilo
                        </motion.h1>

                        <motion.p
                            variants={textRight}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="text-[16px] text-black mb-5 max-w-2xl"
                        >
                            28/05/2024 911 Carrera GTS: O primeiro Porsche de produção com o inovador e leve sistema T-Hybrid, equipado com um motor boxer de seis cilindros e 3,6 litros recém-desenvolvido, turbocompressor acionado eletricamente e motor elétrico integrado à transmissão.
                        </motion.p>

                        <div className="columns-1 sm:columns-2 md:columns-3 gap-4 max-w-full mx-auto mt-10">

                            <div className="overflow-hidden rounded-xl">
                                <img
                                    src="/images/models/front.png"
                                    className="mb-4 w-full h-auto overflow-hidden rounded-xl"
                                    alt=""
                                />
                            </div>

                            <img
                                src="/images/models/diagonal-frontal.jpg"
                                className="mb-4 w-full overflow-hidden rounded-xl"
                                alt=""
                            />

                            <img
                                src="/images/models/lateral.jpg"
                                className="mb-4 w-full overflow-hidden rounded-xl"
                                alt=""
                            />

                            <img
                                src="/images/models/back.jpg"
                                className="mb-4 w-full overflow-hidden rounded-xl"
                                alt=""
                            />

                            <img
                                src="/images/models/up.jpg"
                                className="mb-4 w-full overflow-hidden rounded-xl"
                                alt=""
                            />

                            <img
                                src="/images/models/left-up.jpg"
                                className="mb-4 w-full overflow-hidden rounded-xl"
                                alt=""
                            />

                        </div>

                    </div>

                    <div className="flex flex-col items-center text-center px-10 md:px-[9.10rem] mb-20">
                        <motion.a
                            variants={catalogItem}
                            href="#"
                            className="bg-[#DC1A38] font-semibold text-white px-4 py-2 hover:bg-[#DC1A38]/90"
                        >
                            Ver mais
                        </motion.a>
                    </div>

                </section>
            </div >

            <Footer />
        </>
    );
};

export default PorscheN;