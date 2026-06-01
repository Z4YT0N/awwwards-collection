import React, { useState, useEffect } from "react";
import gsap from "gsap";
import menu1 from "../assets/menu-img/menu1.png";
import menu2 from "../assets/menu-img/menu2.png";
import menu3 from "../assets/menu-img/menu3.png";
import menu4 from "../assets/menu-img/menu4.png";
import menu5 from "../assets/menu-img/menu5.png";
import menu6 from "../assets/menu-img/menu6.png";
import menu7 from "../assets/menu-img/menu7.webp";

interface MenuItem {
    name: string;
    img: string;
}

interface NavMenuProps {
    isOpen: boolean;
}

const NavMenu: React.FC<NavMenuProps> = ({ isOpen = false }) => {

    const menuItems: MenuItem[] = [
        { name: "Shop", img: menu1 },
        { name: "Find in stores", img: menu2 },
        { name: "About Us", img: menu3 },
        { name: "Tasty Talks", img: menu4 },
        { name: "Programs", img: menu5 },
        { name: "Contacts", img: menu6 },
    ];

    const [hovered, setHovered] = useState<string | null>(null);
    const [currentImg, setCurrentImg] = useState<string>(menu7);

    // GSAP animation for menu open/close
    useEffect(() => {
        const menu = document.querySelector(".navmenu") as HTMLElement | null;
        if (!menu) return;

        if (isOpen) {
            // Open animation
            gsap.fromTo(
                menu,
                { yPercent: -100, opacity: 0, display: "flex" },
                { yPercent: 0, opacity: 1, duration: 1, ease: "power3.out", display: "flex" }
            );
        } else {
            // Close animation
            gsap.to(menu, {
                yPercent: -100,
                opacity: 0,
                duration: 1,
                ease: "power3.in",
                onComplete: () => { gsap.set(menu, { display: "none" }) },
            });
        }
    }, [isOpen]);

    return (
        <div className="navmenu fixed inset-0 w-full h-screen bg-[#faeade] justify-center items-center hidden z-50">
            <div className="flex w-full h-full">
                {/* Left side - Menu Links */}
                <div className="menu-links w-1/2 flex flex-col justify-center items-center text-center">
                    {menuItems.map((item) => (
                        <a
                            href="#"
                            key={item.name}
                            onMouseEnter={() => {
                                setHovered(item.name);
                                setCurrentImg(item.img);
                            }}
                            onMouseLeave={() => {
                                setHovered(null);
                                setCurrentImg(menu7);
                            }}
                            className={`uppercase text-8xl font-extrabold tracking-tighter transition-all duration-400 ${hovered === item.name ? "" : hovered ? "opacity-15" : ""
                                }`}
                        >
                            {item.name}
                        </a>
                    ))}

                    <div className="flex justify-center items-center gap-6 text-lg mt-10">
                        <a href="#">YouTube</a>
                        <a href="#">Instagram</a>
                        <a href="#">TikTok</a>
                    </div>
                </div>

                {/* Right side - Image */}
                <div className="menu-img w-1/2 flex justify-center items-center">
                    <img
                        src={currentImg}
                        alt="Menu Preview"
                        className="w-full h-full object-cover transition-all duration-300 ease-out"
                    />
                </div>
            </div>
        </div>
    );
};

export default NavMenu;