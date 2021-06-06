import React from 'react';
import renderer, {ReactTestRenderer, ReactTestRendererJSON} from 'react-test-renderer';
import {screen, render} from '@testing-library/react';
import TodoItem from './TodoItem';
import {mount} from 'enzyme';


describe('Test Render', () => {
    test('Component Rendered Correctly', () => {
        const component: ReactTestRenderer = renderer.create(
            <TodoItem id={'mock'} text={'mock'} isChecked={false} editTodoItem={()=>{}} deleteTodoItem={()=>{}}/>
        )
        let tree: ReactTestRendererJSON | ReactTestRendererJSON[] | null = component.toJSON();
        expect(tree).toMatchSnapshot();
    })

    test('Container type', () => {
        const component: ReactTestRenderer = renderer.create(
            <TodoItem id={'mock'} text={'mock'} isChecked={false} editTodoItem={()=>{}} deleteTodoItem={()=>{}}/>
        );
        let tree: ReactTestRendererJSON | ReactTestRendererJSON[] | null = component.toJSON();
        if (tree && !Array.isArray(tree)){
            expect(tree.type).toMatch('div');
        }
    })

    test('TodoItem text', () => {
        render(<TodoItem id={'mock'} text={'mock'} isChecked={false} editTodoItem={()=>{}} deleteTodoItem={()=>{}}/>);
        expect(screen.getByText('mock')).toBeInTheDocument();
    })
    
    test('TodoItem checkbox = false', () => {
        const wrapper = mount(<TodoItem id={'mock'} text={'mock'} isChecked={false} editTodoItem={()=>{}} deleteTodoItem={()=>{}}/>);
        const checkbox = wrapper.find('input').at(0);
        expect(checkbox.props().checked).toEqual(false);
        const text = wrapper.find('div').at(1);
        expect(text.props().className).toEqual('todoItemText-0-2-3');
    })

    test('TodoItem checkbox = true', () => {
        const wrapper = mount(<TodoItem id={'mock'} text={'mock'} isChecked={true} editTodoItem={()=>{}} deleteTodoItem={()=>{}}/>);
        const checkbox = wrapper.find('input').at(0);
        expect(checkbox.props().checked).toEqual(true);
        const text = wrapper.find('div').at(1);
        expect(text.props().className).toEqual('todoItemTextChecked-0-2-4');
    })

    test('Component class', () => {
        const component: ReactTestRenderer = renderer.create(
            <TodoItem id={'mock'} text={'mock'} isChecked={false} editTodoItem={()=>{}} deleteTodoItem={()=>{}}/>
        );
        let tree: ReactTestRendererJSON | ReactTestRendererJSON[] | null = component.toJSON();
        if (tree && !Array.isArray(tree)){
            expect(tree.props.className).toMatch('todoItem-0-2-2');
        }
    })

    test('Input not showing', () => {
        const wrapper = mount(<TodoItem id={'mock'} text={'mock'} isChecked={true} editTodoItem={()=>{}} deleteTodoItem={()=>{}}/>);
        expect(wrapper.find('.input-0-1-7').exists()).toBeFalsy();
        expect(wrapper.find('.submitButton-0-1-8').exists()).toBeFalsy();
    })
})


describe('Input show/hide', () => {
    test('Show input', () => {
        const wrapper = mount(<TodoItem id={'mock'} text={'mock'} isChecked={true} editTodoItem={()=>{}} deleteTodoItem={()=>{}}/>);
        const editIcon = wrapper.find('img').at(0);
        editIcon.simulate('click');
        const input = wrapper.find('input').at(1);
        const submitButton = wrapper.find('div').at(2);
        expect(input.exists()).toBeTruthy();
        expect(submitButton.exists()).toBeTruthy();
        editIcon.simulate('click');
        expect(input).not.toBeInTheDocument;
        expect(submitButton).not.toBeInTheDocument;
    })

    test('Hide input', () => {
        const wrapper = mount(<TodoItem id={'mock'} text={'mock'} isChecked={true} editTodoItem={()=>{}} deleteTodoItem={()=>{}}/>);
        const editIcon = wrapper.find('img').at(0);
        editIcon.simulate('click');
        expect(wrapper.find('input').at(1).exists()).toBeTruthy();
        expect(wrapper.find('div').at(2).exists()).toBeTruthy();
    })
})



describe('Todo item actions', () => {

    test('Delete item', () => {
        const mockCallBack = jest.fn();
        const wrapper = mount(<TodoItem id={'mock'} text={'mock'} isChecked={true} editTodoItem={()=>{}} deleteTodoItem={mockCallBack}/>);
        const deleteIcon = wrapper.find('img').at(1);
        deleteIcon.simulate('click');
        expect(mockCallBack.mock.calls.length).toEqual(1);
    });
})
