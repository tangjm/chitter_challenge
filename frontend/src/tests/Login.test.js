import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../Components/UserValidation/Login';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock(`../Components/UserValidation/ErrorModal.jsx`, () => {
	return () => {
		return <span>Mock ErrorModal Component</span>
	}
})


// const loginSuccess = jest.spyOn(axios, `post`)
// 	.mockImplementation(() => {
// 		return <p>Post request success</p>;
// 	});

// const loginFailure = jest.spyOn(axios, `post`)
// 	.mockImplementation(() => {
// 		return <span>Mock ErrorModal Component</span>;
// 	});

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
	});

	describe(`Form manipulation tests`, () => {
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

	});

	describe(`Form submission tests`, () => {
		test(`it should render an ErrorModal if email is not registered`, () => {
			const badEmail = "badEmail@mail.com";
			const password = "password";

			const testElement = screen.getByPlaceholderText(/email/i);
			const testElement2 = screen.getByPlaceholderText(/password/i);

			userEvent.type(testElement, badEmail);
			userEvent.type(testElement2, password);

			const mockErrorModal = screen.getByText(/mock errormodal component/i);
			expect(mockErrorModal).toBeInTheDocument();
		})

		xtest(`it should render an ErrorModal if email is registered but password is incorrect`, () => {
			const badEmail = "goodEmail@mail.com";
			const password = "badPass";
		})

		xtest(`it should call setUser with the correct details if login is successful`, () => {

		})

		xtest(`it should call setUserIsLoggedIn with true if login is successful`, () => {

		})
	})
})