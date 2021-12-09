import AddPeep from '../Components/AddPeep';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

describe(`Tests for AddPeep`, () => {
	test(`it should render a label`, () => {
		render(<Router>
			<AddPeep />
		</Router>);
		const labelText = /your peep:/i;
		const actual = screen.getByLabelText(labelText);
		expect(actual).toBeInTheDocument();
	})

	test(`it should render textarea`, () => {
		render(<Router>
			<AddPeep />
		</Router>);
		const placeholderText = /Your message.../i;
		const actual = screen.getByPlaceholderText(placeholderText);
		expect(actual).toBeInTheDocument();
	})

	test(`it should render an input button`, () => {
		render(<Router>
			<AddPeep />
		</Router>);

		const actual = screen.getByRole("button");
		expect(actual).toBeInTheDocument();
	})
})