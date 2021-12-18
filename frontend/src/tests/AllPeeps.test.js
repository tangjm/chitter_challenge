import { render, screen } from '@testing-library/react';
import AllPeeps from '../Components/AllPeeps';
import { BrowserRouter as Router } from 'react-router-dom';

describe(`Test suite for AllPeeps`, () => {
	describe(`Render tests for AllPeeps`, () => {
		describe(`if there are no peeps`, () => {
			beforeEach(() => {
				render(
					<Router>
						<AllPeeps />
					</Router>
				);
			})

			test(`it should render a span saying that no peeps have been posted if there are no peeps`, () => {
				const spanText = /no peeps have been posted yet/i;
				const actual = screen.getByText(spanText);
				expect(actual).toBeInTheDocument();
			})
		})

		xdescribe(`if some peep exists`, () => {
			test(`it should render the name and username of the peeper`, () => {
				const labelText = /your peep:/i;
				const actual = screen.getByLabelText(labelText);
				expect(actual).toBeInTheDocument();
			})

			test(`it should render peep messages`, () => {
				const placeholderText = /What's going on?/i;
				const actual = screen.getByPlaceholderText(placeholderText);
				expect(actual).toBeInTheDocument();
			})

			test(`it should render peep dates`, () => {
				const actual = screen.getByRole("button");
				expect(actual).toBeInTheDocument();
			})
		})
	})
})




