
const ClipPathTitle = ({
    title,
    color,
    bg,
    className,
    borderColor
}: {
    title: string;
    color?: string;
    bg?: string;
    className?: string;
    borderColor?: string;
}) => {
    return (
        <div className="2xl:text-[8.5rem] md:text-8xl text-[40px] font-bold uppercase leading-[9vw] tracking-[-.35vw]">
            <div
                style={{ clipPath: "polygon(50% 0%, 50% 0,50% 100%, 50% 100%)", borderColor: borderColor }}
                className={`${className} border-[.5vw] text-nowrap opacity-0`}>
                <div className="pb-5 md:px-14 px-3 md:pt-0 pt-3" style={{ backgroundColor: bg }}>
                    <h2 className="" style={{ color: color }}>{title}</h2>
                </div>
            </div>
        </div>
    )
}

export default ClipPathTitle