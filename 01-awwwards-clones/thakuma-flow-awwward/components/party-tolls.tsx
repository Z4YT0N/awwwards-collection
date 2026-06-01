import Image from "next/image";
import { partyItems } from "@/constants";
import { AnimatedText } from "@/components";

export default function PartyTolls() {
	return (
		<>
			<div className="w-full py-20 bg-[#FF7BCA]">
				<div className="w-full flex items-center justify-between gap-2 pt-40 pb-10 px-10">
					<AnimatedText
						text="party tools"
						className="text-[250px] text-[#1c1c1c] overflow-hidden leading-[0.85]"
					/>
					<h1 className="text-[24px] font-helveticaNeue leading-none text-[#1c1c1c] uppercase text-right">
						learn new techniques with <br />
						your{" "}
						<span className="text-[34px] font-bodoniseventytwo leading-[0.9] lowercase">
							favorite{" "}
						</span>
						creators
					</h1>
				</div>
				<div className="w-full flex flex-col">
					{partyItems.map((item) => (
						<div
							className="w-full flex items-center justify-between pt-4 hover:bg-black/10 px-10 border-b border-black cursor-pointer group"
							key={item.id}>
							<h1 className="text-[100px] font-humaneMedium leading-none text-[#1c1c1c] uppercase group-hover:translate-x-10 transition-all duration-200 ease-in-out">
								{item.title}
							</h1>
							<Image
								src={item.src}
								alt="arrowUp"
								width={100}
								height={100}
								className="w-[100px] h-[100px] object-cover group-hover:-translate-x-10 transition-all duration-200 ease-in-out"
							/>
						</div>
					))}
				</div>
			</div>
		</>
	);
}
