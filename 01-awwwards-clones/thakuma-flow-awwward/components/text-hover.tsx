import { TtextHoverProps } from "@/types";

export default function TextHover({ titile1, titile2 }: TtextHoverProps) {
	return (
		<div className="w-full group overflow-hidden cursor-pointer transition-all ease-in-out duration-200">
			<div className="relative transition-all  ease-in-out duration-500">
				<div>
					<h1 className="translate-y-[0%] group-hover:translate-y-[-100%] absolute  left-0 transition-all ease-in-out duration-500 font-helveticaNeue text-[#1c1c1c] text-[17px] uppercase hover:font-bodoniseventytwo">
						<div className="translate-y-[0%] group-hover:translate-y-[-100%] transition-all ease-in-out duration-500">
							{titile1}
						</div>
					</h1>
					<h1 className="relative transition-all ease-in-out duration-500 uppercase hover:font-bodoniseventytwo font-helveticaNeue text-[#1c1c1c] text-[17px]">
						<div className="translate-y-[100%] group-hover:translate-y-[0%] transition-all ease-in-out duration-500">
							{titile2}
						</div>
					</h1>
				</div>
			</div>
		</div>
	);
}
