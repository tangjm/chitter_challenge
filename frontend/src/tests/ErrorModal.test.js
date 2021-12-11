import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ErrorModal from '../Components/UserValidation/ErrorModal';
import { BrowserRouter as Router } from 'react-router-dom';

const mockSetShow = jest.fn();

describe(`Test suite for Modal`, () => {
	describe(`Render tests`, () => {
		let testTitle;
		let testMessage;
		beforeEach(() => {
			testTitle = "testTitle";
			testMessage = "testMessage";
			render(<ErrorModal show={true} setShow={mockSetShow} errorMessage={testMessage} errorTitle={testTitle} />)
		})

		afterEach(() => {
			testTitle = null;
			testMessage = null;
		})

		test(`it should render an error title`, () => {
			const modalTitle = screen.getByText(testTitle);
			expect(modalTitle).toBeInTheDocument();
		})

		test(`it should render an error message`, () => {
			const modalBody = screen.getByText(testMessage);
			expect(modalBody).toBeInTheDocument();
		})

		test(`it should render a close button`, () => {
			const buttonText = /close/i;
			const modalButton = screen.getByText(buttonText);
			expect(modalButton).toBeInTheDocument();
		})

	})

})