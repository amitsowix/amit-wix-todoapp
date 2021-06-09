import React from 'react';
import renderer, {ReactTestRenderer, ReactTestRendererJSON} from 'react-test-renderer';
import {render, screen} from '@testing-library/react';
import Button from './Button';


describe('Button Render', () => {

    it('should render correctly', () => {
        const component = driver.when.mount(()=>{});

        const tree: ReactTestRendererJSON = component.toJSON() as ReactTestRendererJSON;
        expect(tree).toMatchSnapshot();
    })

    it('should be a div', () => {
        const component = driver.when.mount(()=>{});

        const tree: ReactTestRendererJSON = component.toJSON() as ReactTestRendererJSON;
        expect(tree.type).toMatch('div');
    })

    it('should render the text', () => {
        driver.when.render(()=>{});

        expect(driver.get.title()).toBeInTheDocument();
    })
})


describe('Button functionality test', () => {
    it('should call the callback on click', () => {

        const mockCallBack = jest.fn();
        const component: ReactTestRenderer = driver.when.mount(mockCallBack);

        const tree: ReactTestRendererJSON = component.toJSON() as ReactTestRendererJSON;
        tree.props.onClick();
        expect(mockCallBack.mock.calls.length).toEqual(1);
    });
})


const driver = {
    when: {
        mount: (callback: () => void): ReactTestRenderer => {
            const component: ReactTestRenderer = renderer.create(<Button onClick={callback}/>);
            return component;
        },
        render: (callback: () => void): void => {
            render(<Button onClick={callback}/>);
        }
    },
    get: {
      title: () => screen.getByText('New Item')
    }
}