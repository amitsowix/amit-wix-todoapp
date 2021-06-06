import React from 'react';
import renderer, {ReactTestRenderer, ReactTestRendererJSON} from 'react-test-renderer';
import {screen, render} from '@testing-library/react';
import Input from './Input';
import {mount} from 'enzyme';


describe('Test Render', () => {
    test('Component Rendered Correctly', () => {
        const component: ReactTestRenderer = renderer.create(
            <Input name={'test'} onInputSubmit={()=>{}}/>
        )
        let tree: ReactTestRendererJSON | ReactTestRendererJSON[] | null = component.toJSON();
        expect(tree).toMatchSnapshot();
    })

    test('Container type', () => {
        const component: ReactTestRenderer = renderer.create(
            <Input name={'test'} onInputSubmit={()=>{}}/>
        );
        let tree: ReactTestRendererJSON | ReactTestRendererJSON[] | null = component.toJSON();
        if (tree && !Array.isArray(tree)){
            expect(tree.type).toMatch('div');
        }
    })

    test('Submit Button text', () => {
        render(<Input name={'test'} onInputSubmit={()=>{}}/>);
        expect(screen.getByText('GO')).toBeInTheDocument();
    })

    test('Component class', () => {
        const component: ReactTestRenderer = renderer.create(
            <Input name={'test'} onInputSubmit={()=>{}}/>
        );
        let tree: ReactTestRendererJSON | ReactTestRendererJSON[] | null = component.toJSON();
        if (tree && !Array.isArray(tree)){
            expect(tree.props.className).toMatch('inputContainer-0-2-3');
        }
    })
})


describe('Submit functionality test', () => {
    test('Submit Button click with value', () => {
        const mockCallBack = jest.fn();
        const wrapper = mount(<Input name={'test'} onInputSubmit={mockCallBack} />);
        const submitButton = wrapper.find('.submitButton-0-2-2');
        const input = wrapper.find('.input-0-2-1');
        input.simulate('focus');
        input.simulate('change', { target: { value: 'Changed' } });
        submitButton.simulate('click');
        expect(mockCallBack.mock.calls.length).toEqual(1);
    });

    test('Submit Button click without value', () => {
        const mockCallBack = jest.fn();
        const wrapper = mount(<Input name={'test'} onInputSubmit={mockCallBack} />);
        const submitButton = wrapper.find('.submitButton-0-2-2');
        const input = wrapper.find('.input-0-2-1');
        submitButton.simulate('click');
        expect(mockCallBack.mock.calls.length).toEqual(0);
    });


    test('Submit via enter click', () => {
        const mockCallBack = jest.fn();
        const wrapper = mount(<Input name={'test'} onInputSubmit={mockCallBack} />);
        const input = wrapper.find('.input-0-2-1');
        input.simulate('focus');
        input.simulate('change', { target: { value: 'Changed' } });
        input.simulate('keyDown', {key: 'Enter'})
        expect(mockCallBack.mock.calls.length).toEqual(1);
    })
})
