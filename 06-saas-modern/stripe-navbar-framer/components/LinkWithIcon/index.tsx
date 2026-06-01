import Link from 'next/link';
import { MdArrowForward } from 'react-icons/md';

export interface Props {
  icon: React.ReactElement<any>;
  title: string;
  link?: string;
  description?: string;
  arrow?: boolean;
}

const LinkWithIcon: React.FC<Props> = ({
  icon,
  title,
  link = '/',
  description,
  arrow = true,
}) => {
  return (
    <Link href={link}>
      <a>
        <div>
          <div className='inline-flex hover:text-black group'>
            <div className='mr-2 fill-current text-white fill-current text-gray-400 group-hover:text-black transition-colors duration-200'>
              {icon}
            </div>
            <div className='text-sm'>
              <div className='flex items-center'>
                <p className='font-medium'>{title}</p>
                {arrow && (
                  <div className='ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
                    <MdArrowForward />
                  </div>
                )}
              </div>
              <p className='text-gray-400 group-hover:text-black transition-colors duration-200'>
                {description}
              </p>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default LinkWithIcon;
