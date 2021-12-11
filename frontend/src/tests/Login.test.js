import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../Components/UserValidation/Login';
import { BrowserRouter as Router } from 'react-router-dom';

describe(`Test suite for Login component`, () => {
	beforeEach(() => {
		render(
			<Router>
				<Login />
			</Router>
		)
	})

	describe(`Render tests`, () => {
		test(`it should display a h2 title 'Login'`, () => {
			const actual = screen.getByRole("heading");
			expect(actual).toBeInTheDocument();
		})

		test(`it should display an email input`, () => {
			const email = "Email address";
			const actual = screen.getByLabelText(email);
			expect(actual).toBeInTheDocument();
		})

		test(`it should display a password input field`, () => {
			const actual = screen.getByLabelText(/password/i);
			expect(actual).toBeInTheDocument();
		})
	})

	xdescribe(`Form manipulation tests`, () => {
		test(`it should track changes to name input field`, () => {
			const testName = "tester";
			const placeholder = "Name";

			const testElement = screen.getByPlaceholderText(placeholder);

			userEvent.type(testElement, testName);

			expect(testElement).toHaveValue(testName);
		})
		test(`it should track changes to username input field`, () => {
			const testUsername = "tester";
			const placeholder = "Username";

			const testElement = screen.getByPlaceholderText(placeholder);

			userEvent.type(testElement, testUsername);

			expect(testElement).toHaveValue(testUsername);
		})

		test(`it should track changes to email input field`, () => {
			const testEmail = "tester@mail.com";
			const placeholder = "Email";

			const testElement = screen.getByPlaceholderText(placeholder);

			userEvent.type(testElement, testEmail);

			expect(testElement).toHaveValue(testEmail);
		})

		test(`it should track changes to password input field`, () => {
			const testPassword = "testPass";
			const placeholder = "Password";

			const testElement = screen.getByPlaceholderText(placeholder);

			userEvent.type(testElement, testPassword);

			expect(testElement).toHaveValue(testPassword);
		})
	})

	xdescribe(`Form submission tests`, () => {

	})
})