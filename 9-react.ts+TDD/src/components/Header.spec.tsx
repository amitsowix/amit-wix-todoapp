import React from 'react';
import renderer, {ReactTestRenderer} from 'react-test-renderer';
import Header from './Header';

const driver = {
    when: {
        mount: (): ReactTestRenderer => {
            const component: ReactTestRenderer = renderer.create(<Header/>)
            return component;
        }
    }
}

describe('Header', () => {
    it('should render component', () => {

        const tree: ReactTestRenderer = driver.when.mount();

        expect(tree).toMatchSnapshot();
    })
});