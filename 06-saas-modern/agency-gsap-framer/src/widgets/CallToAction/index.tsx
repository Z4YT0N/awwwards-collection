import { FC } from 'react';
import { useRouter } from 'next/navigation';

import Button from '@/components/ui/Button';
import SectionOpacity from '@/components/ui/SectionOpacity';

interface Props {}

const Index: FC<Props> = () => {
  const router = useRouter();

  const handleFormToggle = () => {
    router.push('/book');
  };

  return (
    <SectionOpacity classes="flex flex-col justify-center h-screen">

      <div className=" mx-auto flex w-full max-w-[60vw] md:max-w-[90%] flex-1 flex-col items-center justify-center text-center">
        <h3 className="text-[4vw] md:text-[8vw] font-medium">LET&apos;S CONNECT</h3>
        <p className="mt-[0.6vw] text-[1.7vw] md:text-[3.2vw] font-normal text-gray-300 md:leading-[1.3]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident consequatur ullam veniam omnis dolores cum.
        </p>
        <Button
          onClick={handleFormToggle}
          title="SUBMIT A REQUEST"
          classes="px-[1.8vw] py-[vw] w-[35vw] md:w-[45vw] min-h-[6vw] md:min-h-[8vw] text-[1.25vw] md:text-[2.25vw] bg-bg-1 hover:bg-bg-1/80"
          btnClasses="mt-[1.2vw]"
        />
      </div>

      <footer className="flex justify-between border-t border-t-gray-800 px-[5vw] py-[1.8vw] text-[1.6vw] md:text-[2vw] md:py-[2.4vw] md:px-[2vw] ">
        <div>© 2023. <a href="https://github.com/Shatlyk1011/agency-website" target='_blank' rel="norelopener">Source Code</a></div>
        <ul className="flex space-x-[3vw] ">
          <li>Lorem, ipsum.</li>
          <li>Lorem, ipsum.</li>
          <li>Lorem, ipsum.</li>
        </ul>
      </footer>
    </SectionOpacity>
  );
};
export default Index;
