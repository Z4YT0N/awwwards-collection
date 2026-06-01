import { FaArrowRightLong } from "react-icons/fa6";

export default function CTA() {
	return (
		<div
			className="w-full padding-y"
			style={{
				background: "linear-gradient(90deg, #A340F4 0%, #C183F6 100%)",
			}}>
			<div className="w-[70%] sm:w-full xm:w-full padding-x sm:flex-col xm:flex-col mx-auto flex items-center justify-between gap-4">
				<div className="flex flex-col gap-2">
					<h1 className="text-[32px] sm:text-center xm:text-center text-white leading-[38px] tracking-wider font-bold">
						Do you have a challenge for us?
					</h1>
					<p className="text-[16px] sm:text-center xm:text-center text-white tracking-wider font-medium">
						Let&apos;s create new opportunities together: <br /> tell us about
						your vision.
					</p>
				</div>
				<div className="w-fit flex items-center justify-between gap-6 bg-white px-6 py-3 rounded-full group">
					<p className="text-[18px] cursor-pointer text-[#1d0f41] uppercase tracking-wider font-bold">
						Contact Us
					</p>
					<FaArrowRightLong
						size={25}
						className="group-hover:translate-x-1 duration-200 ease-in-out text-[#1d0f41]"
					/>
				</div>
			</div>
		</div>
	);
}
