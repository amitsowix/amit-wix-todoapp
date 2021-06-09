import React from 'react';
import renderer, {ReactTestRenderer, ReactTestRendererJSON} from 'react-test-renderer';
import {screen, render} from '@testing-library/react';
import TodoItem from './TodoItem';
import {mount, ReactWrapper} from 'enzyme';

describe('Test Render', () => {
    it('should render properly', () => {
        const component = driver.when.mount();

        const tree: ReactTestRendererJSON = component.toJSON() as ReactTestRendererJSON;
        expect(tree).toMatchSnapshot();
    })

    it('should be of type div', () => {
        const component: ReactTestRenderer = driver.when.mount();

        const tree: ReactTestRendererJSON = component.toJSON() as ReactTestRendererJSON;
        expect(tree.type).toMatch('div');
    })

    it('should render todoitem text', () => {
        driver.when.render();

        expect(driver.get.todoText()).toBeInTheDocument();
    })
    
    it('should mark the checkbox as unchecked', () => {
        const wrapper: ReactWrapper = driver.when.enzymeMount(undefined, undefined, false);

        const checkbox = driver.get.checkbox(wrapper);
        expect(checkbox.props().checked).toEqual(false);
    })

    it('should mark the checkbox as checeked', () => {
        const wrapper: ReactWrapper = driver.when.enzymeMount(undefined, undefined, true);

        const checkbox = driver.get.checkbox(wrapper);
        expect(checkbox.props().checked).toEqual(true);
    })

    it('input shoudn\'t show', () => {
        const wrapper: ReactWrapper = driver.when.enzymeMount();

        expect(driver.get.input(wrapper).exists()).toBeFalsy();
        expect(driver.get.submitButton(wrapper).exists()).toBeFalsy();
    })
})


describe('Input show/hide', () => {
    it('should show/hide input on click', () => {
        const wrapper: ReactWrapper = driver.when.enzymeMount();
        const editIcon: ReactWrapper = driver.get.editIcon(wrapper);
        driver.when.click(editIcon);

        const input = driver.get.input(wrapper);
        const submitButton = driver.get.submitButton(wrapper);
        expect(input.exists()).toBeTruthy();
        expect(submitButton.exists()).toBeTruthy();

        driver.when.click(editIcon);

        expect(input).not.toBeInTheDocument;
        expect(submitButton).not.toBeInTheDocument;
    })
})



describe('Todo item actions', () => {
    it('should delete the item', () => {
        const mockCallBack = jest.fn();
        const wrapper: ReactWrapper = driver.when.enzymeMount(undefined, mockCallBack);
        const deleteIcon = driver.get.deleteIcon(wrapper);
        driver.when.click(deleteIcon);

        expect(mockCallBack.mock.calls.length).toEqual(1);
    });
})


const driver = {
    when: {
        mount: (editCallback: () => void = () => {}, deleteCallback: () => void = () => {}, isChecked: boolean = false): ReactTestRenderer => {
            const component: ReactTestRenderer = renderer.create(
                <TodoItem id={'mock'} text={'mock'} isChecked={isChecked} editTodoItem={editCallback} deleteTodoItem={deleteCallback}/>
            )            
            return component;
        },
        render: (editCallback: () => void = () => {}, deleteCallback: () => void = () => {}, isChecked: boolean = false): void => {
            render(
                <TodoItem id={'mock'} text={'mock'} isChecked={isChecked} editTodoItem={editCallback} deleteTodoItem={deleteCallback}/>             
            );
        },
        enzymeMount: (editCallback: () => void = () => {}, deleteCallback: () => void = () => {}, isChecked: boolean = false): ReactWrapper => {
            const wrapper = mount(<TodoItem id={'mock'} text={'mock'} isChecked={isChecked} editTodoItem={editCallback} deleteTodoItem={deleteCallback}/>);
            return wrapper;
        },
        click: (element: ReactWrapper): void => {
            element.simulate('click');
        },
    },
    get: {
      todoText: () => screen.getByText('mock'),
      submitButton: (wrapper: ReactWrapper) => wrapper.find('div[data-hook="submit-button"]'),
      input: (wrapper: ReactWrapper) => wrapper.find('input[name="edit-input"]'),
      checkbox: (wrapper: ReactWrapper) => wrapper.find('input').at(0),
      editIcon: (wrapper: ReactWrapper) => wrapper.find('img').at(0),
      deleteIcon: (wrapper: ReactWrapper) => wrapper.find('img').at(1)
    }
}