import React from 'react';
import renderer, {ReactTestRenderer} from 'react-test-renderer';
import Header from './Header';

describe('Test Render', () => {
    test('Component Rendered Correctly', () => {
        const component: ReactTestRenderer = renderer.create(
            <Header/>
        )
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })
});