import { render, screen } from '@testing-library/react';
import AllPeeps from '../Components/AllPeeps';
import { BrowserRouter as Router } from 'react-router-dom';


describe(`Test suite for AllPeeps`, () => {
	beforeEach(() => {
		render(
			<Router>
				<AllPeeps />
			</Router>
		);
	})

	describe(`Render tests for AllPeeps`, () => {
		describe(`if there are no peeps`, () => {
			test(`it should render a span saying that no peeps have been posted if there are no peeps`, () => {
				const spanText = /no peeps have been posted yet/i;
				const actual = screen.getByText(spanText);
				expect(actual).toBeInTheDocument();
			})
		})


	})
})




