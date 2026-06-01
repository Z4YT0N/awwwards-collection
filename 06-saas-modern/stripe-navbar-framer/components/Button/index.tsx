import { MdChevronRight } from 'react-icons/md';

export interface Props {
  color: 'gray' | 'blue';
  showChevron: boolean;
}

const Button: React.FC<Props> = ({ children, color, showChevron }) => {
  const bgColor = color === 'gray' ? 'bg-white bg-opacity-25' : 'bg-indigo-500';
  return (
    <button
      className={`inline-flex items-center px-5 py-1 rounded-full text-white ${bgColor}`}
    >
      {children}
      {showChevron && <MdChevronRight />}
    </button>
  );
};

export default Button;
