const NavItem = ({ text }) => {
    return (
        <div className="relative h-8 lg:h-6 px-3 overflow-hidden cursor-pointer group flex items-center justify-center">

            {/* Fixed background */}
            <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-sm" />

            {/* Normal text */}
            <span className="relative z-10 text-white transition-transform duration-500 ease-out group-hover:-translate-y-[130%]">
                {text}
            </span>

            {/* Hover text */}
            <span className="absolute inset-0 z-10 flex items-center justify-center text-white transition-transform duration-500 ease-out translate-y-full group-hover:translate-y-0">
                {text}
            </span>

        </div>
    );
};

export default NavItem;
