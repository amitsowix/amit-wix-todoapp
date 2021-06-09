import React from 'react';
import renderer, {ReactTestRenderer, ReactTestRendererJSON} from 'react-test-renderer';
import {screen, render} from '@testing-library/react';
import Input from './Input';
import {mount, ReactWrapper} from 'enzyme';


describe('Input render', () => {
    it('should render the component correctly', () => {
        const component: ReactTestRenderer = driver.when.mount(()=>{});

        const tree: ReactTestRendererJSON = component.toJSON() as ReactTestRendererJSON;
        expect(tree).toMatchSnapshot();
    })

    it('should be of type div', () => {
        const component: ReactTestRenderer = driver.when.mount(()=>{});

        const tree: ReactTestRendererJSON = component.toJSON() as ReactTestRendererJSON;
        expect(tree.type).toMatch('div');
    })

    it('should render the text', () => {
        driver.when.render(()=>{});

        expect(driver.get.title()).toBeInTheDocument();
    })
})


describe('Input submit functionality test', () => {
    it('should call the callback on submit', () => {
        const mockCallBack = jest.fn();
        const wrapper: ReactWrapper = driver.when.enzymeMount(mockCallBack);
        const submitButton: ReactWrapper = driver.get.submitButton(wrapper);
        const input: ReactWrapper = driver.get.input(wrapper);
        driver.when.focus(input);
        driver.when.change(input);
        driver.when.click(submitButton);

        expect(mockCallBack.mock.calls.length).toEqual(1);
    });

    it('shouldn\'t submit a new todo when the input is empty', () => {
        const mockCallBack = jest.fn();
        const wrapper = driver.when.enzymeMount(mockCallBack);
        const submitButton = driver.get.submitButton(wrapper);
        driver.when.click(submitButton);

        expect(mockCallBack.mock.calls.length).toEqual(0);
    });


    it('should call the callback on enter click', () => {
        const mockCallBack = jest.fn();
        const wrapper = driver.when.enzymeMount(mockCallBack);
        const input = driver.get.input(wrapper);
        driver.when.focus(input);
        driver.when.change(input);
        driver.when.enterPress(input);

        expect(mockCallBack.mock.calls.length).toEqual(1);
    })
})



const driver = {
    when: {
        mount: (callback: () => void): ReactTestRenderer => {
            const component: ReactTestRenderer = renderer.create(<Input name={""} onInputSubmit={callback}/>);
            return component;
        },
        render: (callback: () => void): void => {
            render(<Input name={""} onInputSubmit={callback}/>);
        },
        enzymeMount: (callback: () => void): ReactWrapper => {
            const wrapper = mount(<Input name={'test'} onInputSubmit={callback} />);
            return wrapper;
        },
        click: (element: ReactWrapper): void => {
            element.simulate('click');
        },
        focus: (element: ReactWrapper): void => {
            element.simulate('focus');
        },
        change: (element: ReactWrapper): void => {
            element.simulate('change', { target: { value: 'Changed' } })
        },
        enterPress: (element: ReactWrapper): void => {
            element.simulate('keyDown', { key: 'Enter' })
        },
    },
    get: {
      title: () => screen.getByText('GO'),
      submitButton: (wrapper: ReactWrapper) => wrapper.find('div[data-hook="submit-button"]'),
      input: (wrapper: ReactWrapper) => wrapper.find('input[name="test"]')
    }
}