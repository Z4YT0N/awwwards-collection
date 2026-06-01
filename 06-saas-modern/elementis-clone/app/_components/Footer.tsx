import { FiFacebook, FiInstagram, FiYoutube } from "react-icons/fi";
import { SiTiktok, SiWhatsapp } from "react-icons/si";



export default function Footer() {

    return (
        <footer className="bg-[var(--main-color)] text-[var(--text-color)] px-0 sm:px-10 lg:px-20">
            <div className="lg:min-h-screen pt-[120px] flex flex-col gap-20 md:gap-[120px] lg:gap-20justify-between mx-auto max-w-[var(--max-width)]">
                <div className="px-6 sm:px-0 w-full flex flex-col md:flex-row justify-between gap-20 md:gap-10">
                    <div className="">
                        <a href="#" className="text-xl lg:text-2xl font-light uppercase tracking-[.7rem]">Transira</a>
                        <div className="mt-14 lg:mt-20 flex-1 hidden md:flex flex-col">
                            <h4 className="text-sm lg:text-base">Contact us</h4>
                            <ul className="flex flex-col items-start mt-10 gap-2 lg:gap-4">
                                <li>
                                    <a href="#" className="text-sm lg:text-base relative block before:absolute before:top-full before:left-0 before:w-full before:h-[1px] before:bg-[var(--text-color)] before:transition-transform before:duration-500 before:ease-expo before:scale-x-0 hover:before:scale-x-100 before:origin-right hover:before:origin-left">
                                        <span>info@TRANSIRA.co</span>
                                    </a>
                                </li>
                                <li>
                                <a href="#" className="text-sm lg:text-base relative block before:absolute before:top-full before:left-0 before:w-full before:h-[1px] before:bg-[var(--text-color)] before:transition-transform before:duration-500 before:ease-expo before:scale-x-0 hover:before:scale-x-100 before:origin-right hover:before:origin-left">
                                    <span>+62 823 4078 1817</span>
                                </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                <div className="flex-1 flex flex-col gap-20 md:max-w-[560px] lg:max-w-[720px]">
                    <div className="flex-1 flex flex-wrap gap-6">
                        <ul className="flex-1 flex flex-col gap-0 lg:gap-2">
                            {
                            ["Home", "Destinations", "Wellness", "Innovation", "Nature"]
                                .map((title) => (
                                    <li key={title} className="w-fit pb-2 flex items-center justify-center">
                                        <a href="#" className="block relative before:absolute before:top-full before:left-0 before:w-full before:h-[1px] before:bg-[var(--text-color)] before:transition-transform before:duration-500 before:ease-expo before:scale-x-0 hover:before:scale-x-100 before:origin-right hover:before:origin-left">
                                        <   span className="text-2xl lg:text-3xl tracking-tight font-light whitespace-nowrap">{title}</span>
                                        </a>
                                    </li>
                                ))
                            }
                        </ul>
                        <ul className="flex-1 flex flex-col gap-0 lg:gap-2">
                            {
                            ["Community", "The Story", "New Developments", "Press Rooms", "Careers"]
                                .map((title) => (
                                    <li key={title} className="w-fit pb-2 flex items-center justify-center">
                                        <a href="#" className="block relative before:absolute before:top-full before:left-0 before:w-full before:h-[1px] before:bg-[var(--text-color)] before:transition-transform before:duration-500 before:ease-expo before:scale-x-0 hover:before:scale-x-100 before:origin-right hover:before:origin-left">
                                        <   span className="text-2xl lg:text-3xl tracking-tight font-light whitespace-nowrap">{title}</span>
                                        </a>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>

                    <div className="flex md:hidden flex-col gap-6">
                        <span>Contact Us</span>
                        <div className="flex flex-wrap items-center gap-4">
                            <a href="#" className="">
                                <span>info@TRANSIRA.co</span>
                            </a>
                            <span>|</span>
                            <a href="#" className="">
                                <span>+62 823 4078 1817</span>
                            </a>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 md:gap-8 lg:gap-10">
                        <span className="text-sm lg:text-base">Stay Connected</span>
                        <div className="flex gap-8">
                            {
                                [FiInstagram, FiFacebook, SiWhatsapp, SiTiktok, FiYoutube].map((Icon, index) => (
                                    <a key={index} href="#" className="flex items-center justify-center transition-opacity duration-500 ease-expo hover:opacity-60">
                                        <Icon size={24} />
                                    </a>
                                ))
                            }
                        </div>
                    </div>
                </div>

                </div>


                <div className="px-6 sm:px-0 border-t border-white/40 flex flex-col md:flex-row justify-between md:items-center gap-6 py-6">
                    <p className="text-sm lg:text-base">© 2025 TRANSIRA. All Rights Reserved</p>
                    <div className="flex-1 md:max-w-[560px] lg:max-w-[720px] flex flex-col sm:flex-row flex-wrap justify-between gap-4">
                        <a href="#" className="text-sm lg:text-base whitespace-nowrap">Policies and Terms</a>
                        <a href="#" className="text-sm lg:text-base whitespace-nowrap"> Website by Ezema</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}