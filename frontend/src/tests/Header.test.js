import Header from '../Components/Header';
import { render } from '@testing-library/react';

test(`Header matches snapshot`, () => {
	const HeaderComponent = render(<Header />);
	expect(HeaderComponent).toMatchSnapshot();
})