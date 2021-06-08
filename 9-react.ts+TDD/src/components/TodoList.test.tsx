import React from 'react';
import renderer, {ReactTestRenderer, ReactTestRendererJSON} from 'react-test-renderer';
import {screen, render} from '@testing-library/react';
import TodoList from './TodoList';
import {mount, ReactWrapper} from 'enzyme';


const driver = {
    when: {
        mount: (): ReactTestRenderer => {
            const component: ReactTestRenderer = renderer.create(
                <TodoList/>
            )            
            return component;
        },
        enzymeMount: (): ReactWrapper => {
            const wrapper = mount(<TodoList/>);
            return wrapper;
        },
        click: (element: ReactWrapper): void => {
            element.simulate('click');
        }
    },
    get: {
      addNewItemButton: (wrapper: ReactWrapper) => wrapper.find('div').at(2),
      submitButton: (wrapper: ReactWrapper) => wrapper.find('div[data-hook="submit-button"]'),
      input: (wrapper: ReactWrapper) => wrapper.find('input').at(0),
    }
}


describe('Test Render', () => {
    it('should render correctly', () => {

        const component: ReactTestRenderer = driver.when.mount();

        const tree: ReactTestRendererJSON | ReactTestRendererJSON[] | null = component.toJSON();

        expect(tree).toMatchSnapshot();
    })

    it('should be of type div', () => {

        const component: ReactTestRenderer = driver.when.mount();

        const tree: ReactTestRendererJSON | ReactTestRendererJSON[] | null = component.toJSON();
        if (tree && !Array.isArray(tree)){
            expect(tree.type).toMatch('div');
        }
    })

    it('should not show the add new item input', () => {

        const wrapper = driver.when.enzymeMount();

        expect(driver.get.input(wrapper).exists()).toBeFalsy();
        expect(driver.get.submitButton(wrapper).exists()).toBeFalsy();
    })
})


describe('Input show/hide', () => {
    it('should Show/hide input on click', () => {

        const wrapper: ReactWrapper = driver.when.enzymeMount();

        const button: ReactWrapper = driver.get.addNewItemButton(wrapper);

        driver.when.click(button);

        const input: ReactWrapper = driver.get.input(wrapper);
        const submitButton: ReactWrapper = driver.get.submitButton(wrapper);

        expect(input.exists()).toBeTruthy();
        expect(submitButton.exists()).toBeTruthy();

        driver.when.click(button);

        expect(input).not.toBeInTheDocument;
        expect(submitButton).not.toBeInTheDocument;
    })
})

