import { render, screen } from '@testing-library/react';
import Register from '../Components/UserValidation/Register';

describe(`Test suite for Register component`, () => {
	beforeEach(() => {

	})

	describe(`Render tests`, () => {
		test(`it should display a h1 title 'Sign Up'`, () => {
			render(<Register />);

			const actual = screen.getByText(/sign up/i);
			expect(actual).toBeInTheDocument();
		})

		test(`it should display a name input field`, () => {
			render(<Register />);
			const nameLabelText = "Name";
			const actual = screen.getByLabelText(nameLabelText);
			expect(actual).toBeInTheDocument();
		})

		test(`it should display a username input field`, () => {
			render(<Register />);
			const username = "Username";
			const actual = screen.getByPlaceholderText(username);
			expect(actual).toBeInTheDocument();
		})

		test(`it should display an email input`, () => {
			render(<Register />);
			const email = "Email";
			const actual = screen.getByPlaceholderText(email);
			expect(actual).toBeInTheDocument();
		})

		test(`it should display a password input field`, () => {
			render(<Register />);

			const actual = screen.getByPlaceholderText(/password/i);
			expect(actual).toBeInTheDocument();
		})
	})
})