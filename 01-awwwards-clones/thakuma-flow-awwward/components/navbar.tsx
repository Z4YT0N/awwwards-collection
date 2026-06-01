import Link from "next/link";
import Image from "next/image";
import { logo } from "@/public";
import { Button, Menu } from "@/components";

export default function Navbar() {
	return (
		<div className="fixed top-0 left-0 w-full flex justify-between items-center py-5 px-10 z-50 backdrop-blur-sm">
			<div className="flex flex-col gap-2">
				<Image
					src={logo}
					alt="logo"
					width={180}
					height={180}
				/>
				<Link
					href="/"
					className="text-sm uppercase text-white font-medium tracking-tight leading-tight font-helveticaNeue">
					By Eurecah
				</Link>
			</div>
			<div>
				<Menu />
			</div>
			<div className="flex items-center gap-2">
				<Button title="join community" />
				<Button title="Enroll now" />
			</div>
		</div>
	);
}
