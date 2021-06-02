import React from 'react';
import { Story, Meta } from '@storybook/react';
import { BarrelMarker, BarrelMarkerProps } from '../components/BarrelMarker';

export default {
    title: 'Marker',
    component: BarrelMarker,
    argTypes: {},
} as Meta;

const Template: Story<BarrelMarkerProps> = (args) => <BarrelMarker {...args} />;

export const Simple = Template.bind({});
Simple.args = {
    level: 0.5,
};
