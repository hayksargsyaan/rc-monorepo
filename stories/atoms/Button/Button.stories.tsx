import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button from './example';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// eslint-disable-next-line react/function-component-definition
const Template: ComponentStory<typeof Button> = args => <Button {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  text: 'Primary Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  text: 'Secondary Button',
};

export const Large = Template.bind({});
Large.args = {
  text: 'Large Button',
};

export const Small = Template.bind({});
Small.args = {
  text: 'Small Button',
};
