import { Story, Meta } from '@storybook/react/types-6-0';
import Modal from './index';

export default {
  component: Modal,
  title: 'Modal',
} as Meta;

export const Default: Story = () => <Modal>Hello World</Modal>;
