"use client";
import Link from "next/link";
import { useTransitionRouter } from "next-view-transitions";
import { usePathname } from "next/navigation";

const Nav = () => {
    const router = useTransitionRouter();
    const pathname = usePathname();

    function triggerPageTransition() {
        document.documentElement.animate(
            [
                { clipPath: "polygon(25% 75%, 75% 75%, 75% 75%, 25% 75%)" },
                { clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)" },
            ],
            {
                duration: 2000,
                easing: "cubic-bezier(0.9, 0, 0.1, 1)",
                pseudoElement: "::view-transition-new(root)",
            }
        );
    }

    const handleNavigation = (path) => (e) => {
        if (path === pathname) { e.preventDefault(); return; }
        router.push(path, { onTransitionReady: triggerPageTransition });
    };

    return (
        <nav className="nav">
            {/* Logo */}
            <div className="nav-col nav-col--logo">
                <Link href="/" onClick={handleNavigation("/")}>zajno°</Link>
            </div>

            {/* Tagline */}
            <div className="nav-col nav-col--tagline">
                <span>digital studio</span>
            </div>

            {/* Center dot — absolutely positioned */}
            <div className="nav-col nav-col--dot">
                <div className="nav-dot" />
            </div>

            {/* Page links */}
            <div className="nav-col nav-col--links">
                <Link href="/work"    onClick={handleNavigation("/work")}>work</Link>
                <Link href="/studio"  onClick={handleNavigation("/studio")}>studio</Link>
                <Link href="/contact" onClick={handleNavigation("/contact")}>contact</Link>
            </div>

            {/* Social */}
            <div className="nav-col nav-col--social">
                <a href="https://twitter.com"   target="_blank" rel="noopener noreferrer">twitter</a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">instagram</a>
            </div>

            {/* Location */}
            <div className="nav-col nav-col--location">
                <span>howrah, wb</span>
            </div>
        </nav>
    );
};

export default Nav;