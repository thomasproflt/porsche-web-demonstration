import ImgBrand1 from "/images/order/text-carousel.svg";
import ImgBrand2 from "/images/order/text-carousel-2.svg";

const companiesLogo = [
    { name: "Aetheris AE", logo: ImgBrand1 },
    { name: "Bolt Pharma", logo: ImgBrand2 },
    { name: "Aetheris AE", logo: ImgBrand1 },
    { name: "Bolt Pharma", logo: ImgBrand2 },
    { name: "Aetheris AE", logo: ImgBrand1 },
    { name: "Bolt Pharma", logo: ImgBrand2 },
];

const PlaceOrder = () => {
    return (
        <>
            <section className="relative z-30 w-full -mb-20 -rotate-[3.30deg]">

                {/* background da faixa */}
                <div className="absolute inset-0 bg-transparent" />

                <div className="relative py-10">

                    <div className="overflow-hidden w-[100%] relative select-none">

                        {/* gradient left */}
                        <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-[#1D1412] dark:from-[#1D1412] to-transparent" />

                        {/* logos */}
                        <div className="flex marquee-inner will-change-transform">
                            {[...companiesLogo, ...companiesLogo].map((company, index) => (
                                <img
                                    key={index}
                                    src={company.logo}
                                    alt={company.name}
                                    width={500}
                                    height={500}
                                    className="mx-11 opacity-70"
                                />
                            ))}
                        </div>

                        {/* gradient right */}
                        <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-[#1D1412] dark:from-[#1D1412] to-transparent" />

                    </div>
                </div>
            </section>
        </>
    );
};

export default PlaceOrder;