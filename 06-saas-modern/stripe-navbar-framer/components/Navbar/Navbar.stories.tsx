import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Navbar from './index';

export default {
  component: Navbar,
  title: 'Composites/Navbar',
} as Meta;

export const Default: Story = () => <Navbar />;
