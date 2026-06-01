import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';

interface Props extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  title: string;
  btnClasses?: string;
  classes?: string;
}

const Index: FC<Props> = ({ title, classes, btnClasses, ...props }) => {
  return (
    <button
      className={`relative inline-flex overflow-hidden rounded-full p-[0.2vw] text-[1.8vw] uppercase focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-1 focus:ring-offset-stroke ${btnClasses}`}
      {...props}
    >
      <span className="absolute inset-[-1000%] animate-[spin_2.5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#CCC2DC_0%,#4A4458_50%,#CCC2DC_100%)]" />
      <span
        className={`inline-flex h-full min-h-[3vw] cursor-pointer  items-center justify-center rounded-full font-medium text-white backdrop-blur-3xl transition  duration-300 ${classes}`}
      >
        {title}
      </span>
    </button>
  );
};
export default Index;
