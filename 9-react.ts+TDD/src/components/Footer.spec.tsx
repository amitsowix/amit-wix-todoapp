import React from 'react';
import renderer, {ReactTestRenderer, ReactTestRendererJSON} from 'react-test-renderer';
import {render, screen} from '@testing-library/react';
import Footer from './Footer';

const driver = {
    when: {
        mount: (): ReactTestRenderer => {
            const component: ReactTestRenderer = renderer.create(<Footer/>);
            return component;
        },
        render: (): void => {
            render(<Footer/>);
        }
    },
    get: {
      title: () => screen.getByText('Created by Amit for Wix.com. All rights reserved ©')
    }
}

describe('Footer', () => {
    it('should render properly', () => {

        const component = driver.when.mount();

        let tree: ReactTestRendererJSON | ReactTestRendererJSON[] | null = component.toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('should render the correct text', () => {

        driver.when.render();
        
        expect(driver.get.title()).toBeInTheDocument();
    })

    it('should be a div', () => {

        driver.when.render();

        expect(driver.get.title()).toBeInstanceOf(HTMLDivElement);
    })
})
