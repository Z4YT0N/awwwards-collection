import { FaStripe } from 'react-icons/fa';
import { MdMenu } from 'react-icons/md';
import Button from '../Button';
import SiteHeaders from '../SiteHeaders';

const Navbar: React.FC = () => {
  return (
    <>
      <header className='flex justify-center'>
        <div className='flex justify-between items-center px-4 mx-4 py-3 w-full max-w-4xl'>
          <div className='fill-current text-white cursor-pointer'>
            <FaStripe size='48' />
          </div>
          <div className='hidden md:flex'>
            <SiteHeaders />
          </div>
          <div>
            <div className='hidden md:block'>
              <Button color='gray' showChevron={true}>
                Sign in
              </Button>
            </div>
            <div className='block md:hidden'>
              <Button color='gray' showChevron={false}>
                <MdMenu size='20' />
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
