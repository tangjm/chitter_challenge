import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Register from '../Components/UserValidation/Register';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock(`../Components/UserValidation/ErrorModal.jsx`, () => {
	return function () {
		return <span>Mock ErrorModal Component</span>
	}
})

describe(`Test suite for Register component`, () => {
	beforeEach(() => {
		render(
			<Router>
				<Register />
			</Router>
		)
	})

	describe(`Render tests`, () => {
		test(`it should display a h2 title 'Sign Up'`, () => {
			const actual = screen.getByText(/sign up/i);
			expect(actual).toBeInTheDocument();
		})

		test(`it should display a name input field`, () => {
			const nameLabelText = "Name";
			const actual = screen.getByLabelText(nameLabelText);
			expect(actual).toBeInTheDocument();
		})

		test(`it should display a username input field`, () => {
			const username = "Username";
			const actual = screen.getByLabelText(username);
			expect(actual).toBeInTheDocument();
		})

		test(`it should display an email input`, () => {
			const email = "Email";
			const actual = screen.getByLabelText(email);
			expect(actual).toBeInTheDocument();
		})

		test(`it should display a password input field`, () => {
			const actual = screen.getByLabelText(/password/i);
			expect(actual).toBeInTheDocument();
		})
	})

	describe(`Form manipulation tests`, () => {
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

	describe(`Form submission tests`, () => {
		test(`it should render an ErrorModal if username already exists`, () => {
			const name = "testName";
			const duplicateUsername = "testUsername";
			const email = "testEmail@mail.com";
			const password = "password";

			const nameInput = screen.getByPlaceholderText("Name");
			const usernameInput = screen.getByPlaceholderText("Username");
			const emailInput = screen.getByPlaceholderText(/email/i);
			const passwordInput = screen.getByPlaceholderText(/password/i);
			const registerButton = screen.getByText(/create new account/i);

			userEvent.type(nameInput, name);
			userEvent.type(usernameInput, duplicateUsername);
			userEvent.type(emailInput, email);
			userEvent.type(passwordInput, password);
			userEvent.click(registerButton)

			const mockErrorModal = screen.getByText(/mock errormodal component/i);
			expect(mockErrorModal).toBeInTheDocument();
		})

		test(`it should render an ErrorModal if email already exists`, async () => {
			const name = "testName";
			const username = "newUsername";
			const duplicateEmail = "test@mail.com";
			const password = "password";

			const nameInput = screen.getByPlaceholderText("Name");
			const usernameInput = screen.getByPlaceholderText("Username");
			const emailInput = screen.getByPlaceholderText(/email/i);
			const passwordInput = screen.getByPlaceholderText(/password/i);
			const registerButton = screen.getByText(/create new account/i);

			userEvent.type(nameInput, name);
			userEvent.type(usernameInput, username);
			userEvent.type(emailInput, duplicateEmail);
			userEvent.type(passwordInput, password);
			userEvent.click(registerButton)

			const mockErrorModal = screen.getByText(/mock errormodal component/i);
			expect(mockErrorModal).toBeInTheDocument();
		})
	})
})