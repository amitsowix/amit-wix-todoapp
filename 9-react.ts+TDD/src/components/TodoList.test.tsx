import React from 'react';
import renderer, {ReactTestRenderer, ReactTestRendererJSON} from 'react-test-renderer';
import {screen, render} from '@testing-library/react';
import TodoList from './TodoList';
import {mount} from 'enzyme';


describe('Test Render', () => {
    test('Component Rendered Correctly', () => {
        const component: ReactTestRenderer = renderer.create(
            <TodoList/>
        )
        let tree: ReactTestRendererJSON | ReactTestRendererJSON[] | null = component.toJSON();
        expect(tree).toMatchSnapshot();
    })

    test('Container type', () => {
        const component: ReactTestRenderer = renderer.create(
            <TodoList/>
        );
        let tree: ReactTestRendererJSON | ReactTestRendererJSON[] | null = component.toJSON();
        if (tree && !Array.isArray(tree)){
            expect(tree.type).toMatch('div');
        }
    })

    test('Component class', () => {
        const component: ReactTestRenderer = renderer.create(
            <TodoList/>
        );
        let tree: ReactTestRendererJSON | ReactTestRendererJSON[] | null = component.toJSON();
        if (tree && !Array.isArray(tree)){
            expect(tree.props.className).toMatch('appBodyContainer-0-2-1');
        }
    })

    test('Input not showing', () => {
        const wrapper = mount(<TodoList/>);
        expect(wrapper.find('.input-0-1-7').exists()).toBeFalsy();
        expect(wrapper.find('.submitButton-0-1-8').exists()).toBeFalsy();
    })
})


describe('Input show/hide', () => {
    test('Show/hide input', () => {
        const wrapper = mount(<TodoList/>);
        const button = wrapper.find('div').at(2);
        button.simulate('click');
        const input = wrapper.find('input').at(0);
        const submitButton = wrapper.find('div').at(3);
        expect(input.exists()).toBeTruthy();
        expect(submitButton.exists()).toBeTruthy();
        button.simulate('click');
        expect(input).not.toBeInTheDocument;
        expect(submitButton).not.toBeInTheDocument;
    })
})

