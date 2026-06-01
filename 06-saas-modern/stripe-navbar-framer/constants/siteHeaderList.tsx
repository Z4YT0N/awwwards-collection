import { MdWork } from 'react-icons/md';

const iconStyles = 'w-5 h-5';

const siteHeaderList = [
  {
    title: 'Products',
    links: [
      {
        icon: <MdWork className={iconStyles} />,
        title: 'Payments',
        description: 'Online Payments',
      },
      {
        icon: <MdWork className={iconStyles} />,
        title: 'Issuing',
        description: 'Card Creation',
      },
    ],
  },
  {
    title: 'Use cases',
    links: [
      {
        icon: <MdWork className={iconStyles} />,
        title: 'Ecommerce',
        description: 'Unify online and in-person payments',
      },
      {
        icon: <MdWork className={iconStyles} />,
        title: 'SaaS',
        description: 'Manage recurring billing and subscriptions',
      },
      {
        icon: <MdWork className={iconStyles} />,
        title: 'SaaS',
        description: 'Manage recurring billing and subscriptions',
      },
    ],
  },
  {
    title: 'Developers',
    links: [
      {
        icon: <MdWork className={iconStyles} />,
        title: 'Documentation',
        description: 'Start integrating Stripe’s products and tools',
      },
      {
        icon: <MdWork className={iconStyles} />,
        title: 'Full API reference ',
        description: '',
      },
    ],
  },
  {
    title: 'Company',
    links: [
      {
        icon: <MdWork className={iconStyles} />,
        title: 'About Stripe',
        description: '',
      },
      {
        icon: <MdWork className={iconStyles} />,
        title: 'Jobs',
        description: '',
      },
      {
        icon: <MdWork className={iconStyles} />,
        title: 'Customers',
        description: '',
      },
      {
        icon: <MdWork className={iconStyles} />,
        title: 'Newsroom',
        description: '',
      },
    ],
  },
];

export default siteHeaderList;
