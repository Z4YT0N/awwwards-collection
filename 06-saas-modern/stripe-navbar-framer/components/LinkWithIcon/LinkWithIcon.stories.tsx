import { Story, Meta } from '@storybook/react/types-6-0';
import LinkWithIcon, { Props } from './index';
import { MdWork } from 'react-icons/md';

export default {
  component: LinkWithIcon,
  title: 'LinkWithIcon',
  decorators: [
    (Story) => (
      <div className='bg-white p-10'>
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: Story<Props> = (args) => <LinkWithIcon {...args} />;

export const Default = Template.bind({});
Default.args = {
  icon: <MdWork className='w-5 h-5' />,
  title: 'Payments',
  link: '/',
  description: '',
};

export const NoArrow = Template.bind({});
NoArrow.args = {
  ...Default.args,
  arrow: false,
};

export const Description = Template.bind({});
Description.args = {
  ...Default.args,
  description: 'Online Payments',
};

export const LargeIconAndDescription = Template.bind({});
LargeIconAndDescription.args = {
  ...Default.args,
  icon: <MdWork className='w-10 h-10' />,
  description: 'Online Payments',
};
