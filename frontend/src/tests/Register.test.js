import { render, screen } from '@testing-library/react';
import Register from '../Components/UserValidation/Register';

describe(`Test suite for Register component`, () => {
	beforeEach(() => {

	})

	describe(`Render tests`, () => {
		test(`it should display a header title 'Sign Up'`, () => {
			render(<Register />);

			const actual = screen.getByText(/sign up/i);
			expect(actual).toBeInTheDocument();
		})
	})
})