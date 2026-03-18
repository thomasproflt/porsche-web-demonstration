import React from "react";
import { useState, useRef, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { motion } from "framer-motion";
import PlaceOrder from "../../components/PlaceOrder/PlaceOrder";
import { catalogPorsches } from "../../data/catalogPorsches.data";
import Footer from "../../components/Footer/Footer";

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

const Index = () => {
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

    const playPromiseRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!videoRef.current) return;

                if (entry.isIntersecting) {
                    if (!pausedByUser) {
                        safePlay();
                        setHasAutoPlayed(true);
                    }
                } else {
                    safePause();
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
            safePause();
            setPausedByUser(true);
        } else {
            safePlay();
            setPausedByUser(false);
        }
    };

    const toggleMute = () => {
        if (!videoRef.current) return;

        videoRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
    };


    const safePlay = async () => {
        const video = videoRef.current;
        if (!video) return;

        // evita múltiplos play simultâneos
        if (playPromiseRef.current) return;

        try {
            const promise = video.play();

            if (promise !== undefined) {
                playPromiseRef.current = promise;

                await promise;
                setIsPlaying(true);
            }
        } catch (err) {
            if (err.name !== "AbortError") {
                console.warn("Erro ao dar play:", err);
            }
        } finally {
            playPromiseRef.current = null;
        }
    };

    const safePause = () => {
        const video = videoRef.current;
        if (!video) return;

        // evita pausar enquanto play ainda está acontecendo
        if (playPromiseRef.current) return;

        if (!video.paused) {
            video.pause();
            setIsPlaying(false);
        }
    };
    return (
        <>
            <Navbar />

            <div className="min-h-screen">

                <section
                    ref={sectionRef}
                    className="flex flex-col min-h-screen max-w-full px-5 md:px-[7.10rem] relative overflow-hidden"
                >

                    {/* VIDEO */}
                    <video
                        ref={videoRef}
                        className="absolute inset-0 w-full h-full object-cover"
                        src="/images/hero/The-new-911.mp4"
                        muted
                        loop
                        playsInline
                        preload="metadata"
                    />

                    {/* THUMB */}
                    <div
                        className={`absolute inset-0 transition-all duration-1000 ${showThumb ? "opacity-100 scale-100" : "opacity-0 scale-110 pointer-events-none"
                            }`}
                    >
                        <img
                            src="/images/hero/0881_nevada_coupe_u-crane_AKOS2546_edit_V02.jpg"
                            alt="thumb"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* OVERLAY */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/0 to-black/0" />

                    {/* BOTÕES (RIGHT SIDE) */}
                    <div className="absolute right-6 bottom-10 flex flex-col gap-3 z-20">

                        {/* PLAY / PAUSE */}
                        <button
                            onClick={togglePlay}
                            className="w-12 h-12 rounded-lg bg-white/5 backdrop-blur-md flex items-center justify-center hover:bg-white/8 cursor-pointer transition"
                        >
                            {isPlaying ? (
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 6H8a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1Zm7 0h-1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1Z" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 18V6l8 6-8 6Z" />
                                </svg>
                            )}
                        </button>

                        {/* MUTE / UNMUTE */}
                        <button
                            onClick={toggleMute}
                            className="w-12 h-12 rounded-lg bg-white/5 backdrop-blur-md flex items-center justify-center hover:bg-white/8 cursor-pointer transition"
                        >
                            {isMuted ? (
                                <svg className="w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.5 8.43A4.985 4.985 0 0 1 17 12c0 1.126-.5 2.5-1.5 3.5m2.864-9.864A8.972 8.972 0 0 1 21 12c0 2.023-.5 4.5-2.5 6M7.8 7.5l2.56-2.133a1 1 0 0 1 1.64.768V12m0 4.5v1.365a1 1 0 0 1-1.64.768L6 15H4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1m1-4 14 14" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.5 8.43A4.985 4.985 0 0 1 17 12a4.984 4.984 0 0 1-1.43 3.5m2.794 2.864A8.972 8.972 0 0 0 21 12a8.972 8.972 0 0 0-2.636-6.364M12 6.135v11.73a1 1 0 0 1-1.64.768L6 15H4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h2l4.36-3.633a1 1 0 0 1 1.64.768Z" />
                                </svg>
                            )}
                        </button>

                    </div>

                    {/* CONTEÚDO ORIGINAL */}
                    <div className="relative flex flex-col top-[22.20rem] md:top-[35.20rem] z-10">

                        <motion.h1
                            variants={textLeft}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="text-left md:max-w-xl text-4xl mb-5 text-white"
                        >
                            O carro que você merece
                        </motion.h1>

                        {/**
                         * <motion.p
                            variants={textRight}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="text-left max-w-lg mb-5 text-zinc-200"
                        >
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat atque tempora vel amet nam error perferendis natus totam necessitatibus.
                        </motion.p>

                        <motion.div variants={catalogItem}>
                                <button className="bg-red-500 hover:bg-red-500/85 px-6 py-2 rounded-full cursor-pointer transition-all duration-200">
                                    Ver Cardápio
                                </button>
                            </motion.div>
                         */}

                        <motion.div
                            variants={catalogContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="flex flex-row items-center gap-2 mb-20"
                        >
                            <motion.div variants={catalogItem}>
                                <button className="bg-transparent hover:bg-white/5 border border-zinc-100/10 px-6 py-2 rounded-lg cursor-pointer transition-all duration-200 text-white">
                                    Descubra mais
                                </button>
                            </motion.div>
                        </motion.div>

                        <div className="flex relative justify-center">
                            <motion.div
                                variants={catalogContainer}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="flex relative items-center justify-center max-w-full"
                            >
                                <motion.p
                                    variants={catalogItem}
                                    className="text-zinc-300 text-left text-[13px] mb-5"
                                >
                                    911 Carrera GTS (WLTP, valores preliminares): Consumo de combustível combinado: 11,0 – 10,5 l/100 km; Emissões de CO₂ combinadas: 251 – 239 g/km
                                </motion.p>
                            </motion.div>
                        </div>

                    </div>

                </section>

                <section className="min-h-screen text-black max-w-full relative overflow-hidden py-[10.10rem]">

                    {/* HEADER */}
                    <div className="flex flex-col items-center text-center px-10 md:px-[9.10rem] mb-20">

                        <motion.h1
                            variants={textRight}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="text-[20px] md:text-5xl text-black mb-5"
                        >
                            Sua jornada precisa de um Porsche
                        </motion.h1>

                    </div>

                    <motion.div
                        variants={catalogContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="flex flex-col gap-4 w-full px-15 mb-10"
                    >
                        {Array.from({ length: Math.ceil(catalogPorsches.length / 2) }).map((_, rowIndex) => {
                            const items = catalogPorsches.slice(rowIndex * 2, rowIndex * 2 + 2);

                            return (
                                <div
                                    key={rowIndex}
                                    className="flex flex-col md:flex-row gap-4 mb-4 w-full"
                                >
                                    {items.map((item, colIndex) => {
                                        const index = rowIndex * 2 + colIndex;
                                        const isActive = active === index;
                                        const isLeft = colIndex === 0;

                                        return (
                                            <motion.div
                                                key={item.id}
                                                variants={catalogItem}
                                                onMouseEnter={() => setActive(index)}
                                                onMouseLeave={() => setActive(null)}
                                                style={{
                                                    transformOrigin: isLeft ? "right center" : "left center"
                                                }}
                                                animate={{
                                                    scale: isActive ? 1.08 : 1,
                                                }}
                                                transition={{
                                                    duration: 0.5,
                                                    ease: [0.22, 1, 0.36, 1]
                                                }}
                                                className={`
                                relative h-[300px] md:h-[500px] rounded-md overflow-hidden cursor-pointer
                                will-change-transform
                                ${isActive ? "md:flex-[2]" : "md:flex-[2]"}
                            `}
                                            >
                                                {/* VIDEO */}
                                                {isActive && (
                                                    <video
                                                        src={item.video}
                                                        muted
                                                        loop
                                                        playsInline
                                                        autoPlay
                                                        className="absolute inset-0 w-full h-full object-cover"
                                                    />
                                                )}

                                                {/* THUMB */}
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    loading="lazy"
                                                    decoding="async"
                                                    className={`
                        absolute inset-0 w-full h-full object-cover
                        transition-all duration-500
                        ${isActive ? "opacity-0 scale-110" : "opacity-100"}
                    `}
                                                />

                                                {/* OVERLAY */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                                                {/* CONTENT */}
                                                <div className="absolute bottom-0 z-10 p-6">
                                                    <h1 className={`
                                    text-white text-xl font-semibold transition-all duration-500
                                    ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}
                                `}>
                                                        {item.title}
                                                    </h1>

                                                    <p className={`
                                    text-zinc-300 transition-all duration-500 delay-100
                                    ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}
                                `}>
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </motion.div>
                </section>

                <section className="min-h-screen text-black max-w-full relative overflow-hidden">

                    <div className="relative w-full min-h-screen overflow-hidden rounded-tl-xl rounded-tr-xl">

                        {/* IMAGEM */}
                        <img
                            src="/images/hero/0936_nevada_coupe_u-crane_AKOS9626_edit_V02-(1).jpg"
                            alt="background"
                            loading="lazy"
                            decoding="async"
                            className="absolute inset-0 w-full h-full object-cover"
                        />

                        {/* OVERLAY */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E12] via-[#0E0E12]/80 to-transparent" />

                        {/* CONTEÚDO */}
                        <div className="relative z-10 flex flex-col items-center justify-center text-center px-10 md:px-[9.10rem] min-h-screen">

                            <motion.h1
                                variants={textRight}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="text-[24px] md:text-5xl text-white mb-5"
                            >
                                Sua jornada precisa de um Porsche
                            </motion.h1>

                            <motion.a
                                variants={catalogItem}
                                href="https://proflt.vercel.app/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-[#DC1A38] font-light text-white px-6 py-2 hover:bg-[#DC1A38]/80 transition-all"
                            >
                                Conhecer estúdio
                            </motion.a>

                        </div>

                    </div>

                </section>
            </div >

            <Footer />
        </>
    );
};

export default Index;