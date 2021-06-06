import React from 'react';
import renderer, {ReactTestRenderer, ReactTestRendererJSON} from 'react-test-renderer';
import {render, screen} from '@testing-library/react';
import Footer from './Footer';

describe('Test Render', () => {
    test('Component Rendered Correctly', () => {
        const component: ReactTestRenderer = renderer.create(
            <Footer/>
        )
        let tree: ReactTestRendererJSON | ReactTestRendererJSON[] | null = component.toJSON();
        expect(tree).toMatchSnapshot();
    })

    test('Component text', () => {
        render(<Footer/>);
        expect(screen.getByText('Created by Amit for Wix.com. All rights reserved ©')).toBeInTheDocument();
    })

    test('Component class', () => {
        render(<Footer/>);
        expect(screen.getByText('Created by Amit for Wix.com. All rights reserved ©')).toHaveClass('appFooter-0-2-1');
    })

    test('Component class', () => {
        render(<Footer/>);
        expect(screen.getByText('Created by Amit for Wix.com. All rights reserved ©')).toBeInstanceOf(HTMLDivElement);
    })
})
