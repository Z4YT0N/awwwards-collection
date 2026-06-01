

import { CiMenuBurger } from "react-icons/ci";

import Image from "next/image";

import TranslatingImage from "./TranslatingImage";



export default function InfoSection() {

    return (
        <section className="md:min-h-screen px-0 sm:px-6 md:px-12 lg:px-20 pt-20 mt-20 flex flex-col gap-20">
            <div className="w-full my-20 max-w-[var(--max-width)] hidden md:grid grid-cols-[1fr_2fr] lg:grid-cols-[2fr_3fr] gap-4 justify-between items-start mx-auto">
                <span aria-hidden></span>
                <span className="w-full max-h-[400px] lg:max-h-[680px] h-[80vh]">
                <TranslatingImage containerClassName='w-full h-full' src="/images/floating-chair.jpg" alt="Image of a resort" />
                </span>
            </div>
            <div className="w-full max-w-[var(--max-width)] grid grid-cols-1 md:grid-cols-[1fr_2fr] lg:grid-cols-[2fr_3fr] gap-4 justify-between items-start mx-auto">
                <div className="px-4 xs:px-6 sm:px-0 mt-2 flex items-center gap-2 lg:gap-6 text-base lg:text-xl">
                    <CiMenuBurger size={20} />
                    <h2><span className="uppercase">Transira</span> Innovation Culture</h2>
                </div>
                <div className="mt-10 md:mt-0 flex-1 gap-10 sm:gap-20 flex flex-col">
                    <h3 className="px-4 xs:px-6 sm:px-0 text-2xl sm:text-4xl font-geist font-light max-w-[32ch]">
                        <span className="ml-20">We foster a culture of Innovation </span><br className="hidden md:block" />
                        <span>that <span className="text-[var(--secondary-color)]">enriches lives globally</span> through </span><br className="hidden md:block" />
                        <span>transformative eco-conscious and </span><br className="hidden md:block" />
                        <span>impactful solutions.</span>
                    </h3>
                    <div className="px-4 xs:px-6 sm:px-0 overflow-hidden flex md:hidden gap-4 overflow-x-scroll overflow-y-hidden">
                        <div className="relative min-h-[200px] xs:min-h-[320px] min-w-[280px] xs:min-w-[360px] w-[400px]">
                            <Image fill className="w-full h-full absolute top-0 left-0" alt="image of a chair" src="/images/chair.webp" />
                        </div>
                        <div className="relative min-h-[200px] xs:min-h-[320px] min-w-[280px] xs:min-w-[360px] w-[400px]">
                            <Image fill className="w-full h-full absolute top-0 left-0" alt="image of a chair" src="/images/chair2.webp" />
                        </div>
                    </div>
                    <div className="px-4 xs:px-6 sm:px-0 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <p className="text-sm leading-[1.2rem] lg:text-lg lg:leading-[1.6rem]">By using high-quality glue laminated timber, <br className="hidden md:block" />Low-E solar control glass, and innovative <br className="hidden md:block" />climate control systems, <br className="hidden md:block" />for a comfortable, luxury living environment. <br className="hidden md:block" />Our world-first solar energy system is a<br className="hidden md:block" /> testament to our dedication to finding<br className="hidden md:block" /> innovative solutions for a greener future.</p>
                        <p className="text-sm leading-[1.2rem] lg:text-lg lg:leading-[1.6rem]">Through a commitment to embracing<br className="hidden md:block" /> innovative technologies and a culture of<br className="hidden md:block" /> intellectual bravery, ELEMENTIS redefines<br className="hidden md:block" /> possibilities and elevates overall well-being of<br className="hidden md:block" /> individuals, ensuring limitless possibilities and<br className="hidden md:block" /> a healthier, more sustainable future. </p>
                    </div>
                </div>
            </div>
            <div className="w-full max-w-[var(--max-width)] h-[560px] lg:h-screen mx-auto py-10 hidden md:grid grid-cols-[1fr_2fr] lg:grid-cols-[2fr_3fr] gap-4">
                <div className="flex items-end">
                <span className="relative block h-4/5 w-full">
                    <TranslatingImage containerClassName='w-full h-full' src="/images/chair.webp" alt="Image of a resort" />
                </span>
                </div>
                <div className="flex">
                <span className="relative block w-full h-full">
                    <TranslatingImage containerClassName='w-full h-full' src="/images/chair2.webp" alt="Image of a resort" />
                </span>
                </div>
            </div>
        </section>
    )
}