import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Register from '../Components/UserValidation/Register';

describe(`Test suite for Register component`, () => {
	beforeEach(() => {

	})

	describe(`Render tests`, () => {
		test(`it should display a h2 title 'Sign Up'`, () => {
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
			const actual = screen.getByLabelText(username);
			expect(actual).toBeInTheDocument();
		})

		test(`it should display an email input`, () => {
			render(<Register />);
			const email = "Email";
			const actual = screen.getByLabelText(email);
			expect(actual).toBeInTheDocument();
		})

		test(`it should display a password input field`, () => {
			render(<Register />);

			const actual = screen.getByLabelText(/password/i);
			expect(actual).toBeInTheDocument();
		})
	})

	describe(`Form manipulation tests`, () => {
		test(`it should track changes to name input field`, () => {
			const testName = "tester";
			const placeholder = "Name";

			render(<Register />);

			const testElement = screen.getByPlaceholderText(placeholder);

			userEvent.type(testElement, testName);

			expect(testElement).toHaveValue(testName);
		})
	})
})