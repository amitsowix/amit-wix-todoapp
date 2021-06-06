import React from 'react';
import renderer, {ReactTestRenderer, ReactTestRendererJSON} from 'react-test-renderer';
import {render, screen} from '@testing-library/react';
import Button from './Button';


describe('Test Render', () => {
    test('Component Rendered Correctly', () => {
        const component: ReactTestRenderer = renderer.create(
            <Button onClick={()=>{}}/>
        )
        let tree: ReactTestRendererJSON | ReactTestRendererJSON[] | null = component.toJSON();
        expect(tree).toMatchSnapshot();
    })

    test('Button type', () => {
        const component: ReactTestRenderer = renderer.create(
            <Button onClick={()=>{}}/>
        );
        let tree: ReactTestRendererJSON | ReactTestRendererJSON[] | null = component.toJSON();
        if (tree && !Array.isArray(tree)){
            expect(tree.type).toMatch('div');
        }
    })

    test('Button text', () => {
        render(<Button onClick={()=>{}}/>);
        expect(screen.getByText('New Item')).toBeInTheDocument();
    })

    test('Component class', () => {
        const component: ReactTestRenderer = renderer.create(
            <Button onClick={()=>{}}/>
        );
        let tree: ReactTestRendererJSON | ReactTestRendererJSON[] | null = component.toJSON();
        if (tree && !Array.isArray(tree)){
            expect(tree.props.className).toMatch('newItemButton-0-2-1');
        }
    })
})


describe('Button functionality test', () => {
    test('Button click', () => {
        const mockCallBack = jest.fn();
        const component: ReactTestRenderer = renderer.create(
            <Button onClick={mockCallBack}/>
        );
        let tree: ReactTestRendererJSON | ReactTestRendererJSON[] | null = component.toJSON();
        expect(tree).toMatchSnapshot();
        if (tree && !Array.isArray(tree)){
            tree.props.onClick();
            expect(mockCallBack.mock.calls.length).toEqual(1);
        }
    });
})
