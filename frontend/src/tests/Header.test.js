import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../Components/Header';
import { BrowserRouter as Router } from 'react-router-dom';

const mockSetIsLoggedIn = jest.fn();


describe(`Test suite for Header component`, () => {
	describe(`When no user is logged in`, () => {
		beforeEach(() => {
			render(
				<Router>
					<Header isLoggedIn={false} />
				</Router>
			);
		})

		test(`it should render the app name: Chitter`, () => {
			const appName = screen.getByText(/chitter/i);
			expect(appName).toBeInTheDocument();
		})

		test(`it should not render the New Peep option`, () => {
			const addPeepOption = screen.queryByText(/new peep/i);
			expect(addPeepOption).not.toBeInTheDocument();
		})

		test(`it should render the Log In option`, () => {
			const logInOption = screen.getByText(/login/i);
			expect(logInOption).toBeInTheDocument();
		})

		test(`it should not render the Log Out option`, () => {
			const logOutOption = screen.queryByText(/log out/i);
			expect(logOutOption).not.toBeInTheDocument();
		})

		test(`it should render the register option`, () => {
			const registerOption = screen.getByText(/register/i);
			expect(registerOption).toBeInTheDocument();
		})
	})

	describe(`When some User is logged in`, () => {
		describe(`Render tests`, () => {
			beforeEach(() => {
				render(
					<Router>
						<Header isLoggedIn={true} />
					</Router>
				);
			})

			test(`it should render the app name: Chitter`, () => {
				const appName = screen.getByText(/chitter/i);
				expect(appName).toBeInTheDocument();
			})

			test(`it should render the New Peep option`, () => {
				const addPeepOption = screen.getByText(/new peep/i);
				expect(addPeepOption).toBeInTheDocument();
			})

			test(`it should not render the Log In option`, () => {
				const logInOption = screen.queryByText(/log in/i);
				expect(logInOption).not.toBeInTheDocument();
			})

			test(`it should render the Log Out option`, () => {
				const logOutOption = screen.getByText(/log out/i);
				expect(logOutOption).toBeInTheDocument();
			})

			test(`it should not render the register option`, () => {
				const registerOption = screen.queryByText(/register/i);
				expect(registerOption).not.toBeInTheDocument();
			})
		})

		describe(`Log Out test`, () => {
			beforeEach(() => {
				render(
					<Router>
						<Header isLoggedIn={true} setIsLoggedIn={mockSetIsLoggedIn} />
					</Router>
				);
			})

			test(`it should set the isLoggedIn state to false`, () => {
				const logOutNavLink = screen.getByText(/Log Out/i)

				userEvent.click(logOutNavLink);

				expect(mockSetIsLoggedIn).toHaveBeenCalledTimes(1);
				expect(mockSetIsLoggedIn).toHaveBeenCalledWith(false);
			})
		})
	})

})