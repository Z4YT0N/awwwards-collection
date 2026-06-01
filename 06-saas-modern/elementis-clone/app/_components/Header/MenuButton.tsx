

type Props = {
    showMenu: boolean;
    toggleMenu: () => void;
    reverse?: boolean;
}

export default function MenuButton({ showMenu, reverse, toggleMenu }: Props) {

    return (
        <button onClick={toggleMenu} className="relative z-[10] p-1 h-8 lg:h-10 aspect-square block">
            <span className="group relative md:z-10 flex flex-col gap-2 items-center justify-center w-full h-full">
                <span className="grid grid-cols-[repeat(2,_100%)] gap-6 min-h-[1px] w-full h-[1px] overflow-hidden">
                    <span className={`w-full h-full block ${reverse ? 'bg-[var(--main-color)]' : 'bg-[var(--text)]'} ${!showMenu ? 'delay-300 md:group-hover:delay-0 md:group-hover:-translate-x-full' : 'delay-0 translate-x-full'} transition-[transform] ease-expo duration-500`} />
                    <span className={`w-full h-full block ${reverse ? 'bg-[var(--main-color)]' : 'bg-[var(--text)]'} ${!showMenu ? 'delay-300 md:group-hover:delay-0 md:group-hover:translate-x-[calc(-100%-24px)]' : 'delay-0 translate-x-full'} transition-[transform] ease-expo duration-500`} />
                </span>
                <span className="grid grid-cols-[repeat(2,_100%)] gap-6 min-h-[1px] w-full h-[1px] overflow-hidden">
                    <span className={`w-full h-full block ${reverse ? 'bg-[var(--main-color)]' : 'bg-[var(--text)]'} ${!showMenu ? 'delay-300 md:group-hover:delay-100 group-hover:-translate-x-full' : 'delay-100 translate-x-full'} transition-[transform] ease-expo duration-500`} />
                    <span className={`w-full h-full block ${reverse ? 'bg-[var(--main-color)]' : 'bg-[var(--text)]'} ${!showMenu ? 'delay-300 md:group-hover:delay-100 group-hover:translate-x-[calc(-100%-24px)]' : 'delay-0 translate-x-full'} transition-[transform] ease-expo duration-500`} />
                </span>
                <span className="grid grid-cols-[repeat(2,_100%)] gap-6 min-h-[1px] w-full h-[1px] overflow-hidden">
                    <span className={`w-full h-full block ${reverse ? 'bg-[var(--main-color)]' : 'bg-[var(--text)]'} ${!showMenu ? 'delay-300 md:group-hover:delay-[.2s] md:group-hover:-translate-x-full' : 'delay-200 translate-x-full'} transition-[transform] ease-expo duration-500`} />
                    <span className={`w-full h-full block ${reverse ? 'bg-[var(--main-color)]' : 'bg-[var(--text)]'} ${!showMenu ? 'delay-300 md:group-hover:delay-[.2s] md:group-hover:translate-x-[calc(-100%-24px)]' : 'delay-0 translate-x-full'} transition-[transform] ease-expo duration-500`} />
                </span>

                <span className="absolute top-0 left-0 w-full h-full block">
                    <span className="grid grid-cols-[repeat(2,_100%)] gap-6 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 rotate-45 w-full h-[1px] overflow-hidden">
                        <span className={`w-full h-full block ${reverse ? 'bg-[var(--main-color)]' : 'bg-[var(--text)]'} ${showMenu ? 'md:group-hover:translate-x-[calc(-100%_-_24px)] md:group-hover:delay-0 delay-500' : 'translate-x-full'} transition-[transform] ease-expo duration-500`} />
                        <span className={`w-full h-full block ${reverse ? 'bg-[var(--main-color)]' : 'bg-[var(--text)]'} ${showMenu ? 'md:group-hover:translate-x-[calc(-100%_-_24px)] md:group-hover:delay-0 delay-500' : 'translate-x-full'} transition-[transform] ease-expo duration-500`} />
                    </span>
                    <span className="grid grid-cols-[repeat(2,_100%)] gap-6 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 -rotate-45 w-full h-[1px] overflow-hidden">
                        <span className={`w-full h-full block ${reverse ? 'bg-[var(--main-color)]' : 'bg-[var(--text)]'} ${showMenu ? 'md:group-hover:translate-x-[calc(-100%_-_24px)] md:group-hover:delay-100 delay-500' : 'translate-x-full'} transition-[transform] ease-expo duration-500`} />
                        <span className={`w-full h-full block ${reverse ? 'bg-[var(--main-color)]' : 'bg-[var(--text)]'} ${showMenu ? 'md:group-hover:translate-x-[calc(-100%_-_24px)] md:group-hover:delay-100 delay-500' : 'translate-x-full'} transition-[transform] ease-expo duration-500`} />
                    </span>
                </span>
            </span>
        </button>
    )
}