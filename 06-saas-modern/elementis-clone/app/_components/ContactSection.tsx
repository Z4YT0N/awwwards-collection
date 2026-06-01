import { FaAngleDown } from "react-icons/fa6";
import { MdArrowOutward } from "react-icons/md";
import TranslatingImage from "./TranslatingImage";



export default function ContactSection() {

    return (
        <section className="lg:min-h-screen grid grid-cols-1 md:grid-cols-2 bg-[var(--text-color)] text-[var(--main-color)]">
            <div>
                <span className="block w-full h-full min-h-[400px] md:min-h-[320px] ">
                    <TranslatingImage src="/images/contact.jpg" alt="Contact form image" />
                </span>
            </div>
            <div className="flex items-center justify-center px-4 xs:px-6 md:px-20 py-20 lg:py-[120px]">
                <form className="w-full max-w-[440px] flex flex-col gap-10">
                    <h3 className="text-xl sm:text-2xl lg:text-4xl tracking-tight font-light">Take the First Step</h3>
                    <p className="text-sm lg:text-lg leading-[1.2rem] lg:leading-[1.6rem] md:max-w-[36ch]">Become a member of ELEMENTIS Club and take the first step towards a life filled with purpose, Wellness, and connection.</p>
                    <div className="flex flex-col gap-4 mt-2">
                        <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-black/40 text-xs lg:text-sm">Full Name</label>
                        <input type="text" placeholder="Enter your name" className="text-sm lg:text-base w-full px-4 xs:px-6 bg-[var(--text-color2)] h-12 border-b border-black/30 placeholder:text-black/50 focus:outline-none" />
                        </div>
                        <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-black/40 text-xs lg:text-sm">Email Address</label>
                        <input type="email" placeholder="Enter your email address" className="text-sm lg:text-base w-full px-4 xs:px-6 bg-[var(--text-color2)] h-12 border-b border-black/30 placeholder:text-black/50 focus:outline-none" />
                        </div>
                        <div className="flex flex-col gap-2">
                        <label htmlFor="phone" className="text-black/40 text-xs lg:text-sm">Phone Number</label>
                        <div className="flex items-center border-b border-black/30 bg-[var(--text-color2)]">
                            <span className="text-sm lg:text-base pl-4 xs:pl-6 flex items-center gap-6">
                            <span>+1</span>
                            <FaAngleDown size={12} />
                            </span>
                            <input type="number" placeholder="Enter your phone number" className="text-sm lg:text-base bg-transparent w-full px-4 xs:px-6 h-12 placeholder:text-black/30 focus:outline-none" />
                        </div>
                        </div>
                        <div className="flex flex-col gap-2">
                        <label htmlFor="phone" className="text-black/40 text-xs lg:text-sm">Country</label>
                        <div className="flex items-center border-b border-black/30 bg-[var(--text-color2)]">
                            <input type="text" placeholder="Nigeria" className="text-sm lg:text-base bg-transparent w-full px-4 xs:px-6 h-12 placeholder:text-black/40 focus:outline-none" />
                            <span className="pr-4 xs:pr-6 flex items-center justify-center">
                            <FaAngleDown size={12} />
                            </span>
                        </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <p className="text-sm leading-[1.2rem] lg:text-base lg:leading-[1.4rem]">I would like to receive information on TRANSIRA.</p>
                        <div className="flex flex-wrap gap-x-6 gap-y-2">
                        {
                            ["Resorts and Residences", "Retreats", "Wellness", "New Developments", "Building Innovation"].map((title, index) => (
                                <span key={index} className="flex items-center gap-2">
                                    <input type="checkbox" className="bg-transparent appearance-none w-4 h-4 aspect-square flex items-center justify-center border border-[var(--main-color)] checked:bg-[var(--main-color)] before:w-1 before:aspect-square before:rounded-md checked:before:bg-[var(--text-color)]" />
                                    <label className="text-sm lg:text-base">{title}</label>
                                </span>
                            ))
                        }
                        </div>
                        <div className="mt-4 flex items-center gap-2 text-sm lg:text-base">
                        <input type="checkbox" className="bg-transparent appearance-none w-4 h-4 aspect-square flex items-center justify-center border border-[var(--main-color)] checked:bg-[var(--main-color)] before:w-1 before:aspect-square before:rounded-md checked:before:bg-[var(--text-color)]" />
                        <label>I agree to the <span className="underline">Policies and Terms</span></label>
                        </div>
                    </div>
                    <button className="bg-[var(--main-color)] text-[var(--text-color)] h-14 lg:h-16 px-6 flex items-center justify-between gap-4">
                        <span className="text-base lg:text-lg">Sign Up</span>
                        <MdArrowOutward size={20} />
                    </button>
                </form>
            </div>
        </section>
    )
}