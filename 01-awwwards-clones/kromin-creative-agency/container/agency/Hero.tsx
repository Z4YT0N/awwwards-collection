import { TextMask } from "@animation";
import { Partner } from "@components";

export default function Hero() {
	const phrases = ["What we believe in", "goes far beyond our projects"];
	return (
		<div className="w-full h-screen relative flex flex-col items-center justify-center">
			<div className="w-full h-full bg-[#0000003a]" />
			<div className="w-full">
				<video
					className="absolute top-0 left-0"
					loop
					autoPlay
					muted
					src={"/agency.mp4"}
				/>

				<div className="">
					<h1 className="text-white leading-none text-[80px] font-extrabold font-[ProximaNova-Black]">
						<TextMask>{phrases}</TextMask>
					</h1>
					<p className="text-[16px] text-[#b84ff8] text-center tracking-[1.3px] font-bold bg-blue-600">
						DATA. DESIGN. DEVELOPMENT. MARKETING.
					</p>
				</div>
			</div>
		</div>
	);
}
