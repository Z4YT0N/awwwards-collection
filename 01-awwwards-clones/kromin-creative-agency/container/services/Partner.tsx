import Image from "next/image";
import { fuoricitta, idib, luther, sweeweb } from "@public";

export default function Partner() {
	return (
		<div className="w-full padding-y -mt-32 bg-white">
			<div className="w-[70%] mx-auto flex flex-col gap-20 padding-x">
				<div className="flex flex-col gap-6">
					<p className="text-[16px] text-[#b84ff8] leading-none font-semibold">
						OUR PARTNERS
					</p>
					<h1 className="text-[60px] leading-none font-extrabold">
						Every time at our side
					</h1>
					<div className="w-[100px] h-[3px] rounded-full bg-[#b84ff8]" />
				</div>
				<div className="w-full flex gap-8 justify-between items-center">
					<Image
						src={idib}
						alt="idib-img"
					/>
					<Image
						src={fuoricitta}
						alt="idib-img"
					/>
					<Image
						src={luther}
						alt="idib-img"
					/>
					<Image
						src={sweeweb}
						alt="idib-img"
					/>
				</div>
			</div>
		</div>
	);
}
