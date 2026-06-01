import { FiFacebook, FiInstagram, FiYoutube } from "react-icons/fi";
import { HiArrowUpRight } from "react-icons/hi2";
import { SiTiktok, SiWhatsapp } from "react-icons/si";


type Props = {
    showMenu: boolean;
}

export default function MobileMenu({ showMenu }: Props) {

    return (
        <div className={`${showMenu ? 'overflow-y-auto overflow-x-hidden' : 'pointer-events-none overflow-hidden'} block md:hidden max-h-[calc(100vh_-_60px)] w-full`}>
            <div className={`${showMenu ? '' : 'translate-x-full'} transition-transform duration-500 ease-expo bg-[var(--text-color)] text-[var(--main-color)] px-2 xs:px-4 sm:px-6 flex flex-col pt-10 pb-20`}>
            <h4 className="text-sm text-[var(--main-color)] opacity-50">Discover Pages</h4>
            <ul className="mt-8 flex flex-col border-[var(--main-color)]">
                {
                    ["Home", "Destinations", "Wellness", "Innovation", "Nature", "Community", "The Story", "New Developments", "Press Room", "Careers"]
                        .map((title, index) => (
                        <li key={index}>
                            <a href="" className="h-16 flex items-center justify-between border-b border-[var(--main-color)]">
                                <span className="text-xl font-light">{title}</span>
                                <HiArrowUpRight size={18} />
                            </a>
                        </li>
                    ))
                }
            </ul>
            <button className="mt-14 flex items-center justify-between bg-[var(--main-color)] text-[var(--text-color)] h-16 min-h-16 px-4 xs:px-6 sm:px-8">
                <span className="font-light text-xl">Join Us</span>
                <HiArrowUpRight size={20} />
            </button>

            <div className="mt-20 flex flex-col gap-6">
                <h4 className="text-base text-[var(--main-color)] opacity-50">Contact Us</h4>
                <div className="flex flex-wrap items-center gap-6">
                <a href="#" className="text-base whitespace-nowrap">info@TRANSIRA.co</a>
                <span>|</span>
                <a href="#" className="text-base whitespace-nowrap">+62 823 4078 1817</a>
                </div>
            </div>

            <div className="mt-12 flex flex-col gap-6">
                <h4 className="text-base text-[var(--main-color)] opacity-50">Stay Connected</h4>
                <div className="flex gap-6">
                {
                    [FiInstagram, FiFacebook, SiWhatsapp, SiTiktok, FiYoutube].map((Icon, index) => (
                        <span key={index} className="flex items-center justify-center">
                            <Icon size={24} />
                        </span>
                    ))
                }
                </div>
            </div>
            </div>
        </div>
    )
}