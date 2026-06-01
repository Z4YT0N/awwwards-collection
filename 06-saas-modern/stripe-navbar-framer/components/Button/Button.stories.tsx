import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Button, { Props } from './index';

export default {
  component: Button,
  title: 'Button',
} as Meta;

const Template: Story<Props> = (args) => <Button {...args}>Sign In</Button>;

export const Blue = Template.bind({});
Blue.args = {
  color: 'blue',
  showChevron: true,
};

export const Transparent = Template.bind({});
Transparent.args = {
  color: 'gray',
  showChevron: true,
};

export const WithoutChevron = Template.bind({});
Transparent.args = {
  color: 'gray',
  showChevron: false,
};
