import AddPeep from '../Components/AddPeep';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';


describe(`Test suite for AddPeep`, () => {
	beforeEach(() => {
		render(
			<Router>
				<AddPeep />
			</Router>
		);
	})

	describe(`Render tests for AddPeep`, () => {
		test(`it should render a label`, () => {
			const labelText = /your peep:/i;
			const actual = screen.getByLabelText(labelText);
			expect(actual).toBeInTheDocument();
		})

		test(`it should render textarea`, () => {
			const placeholderText = /What's going on?/i;
			const actual = screen.getByPlaceholderText(placeholderText);
			expect(actual).toBeInTheDocument();
		})

		test(`it should render an input button`, () => {
			const actual = screen.getByRole("button");
			expect(actual).toBeInTheDocument();
		})
	})

	describe(`Form manipulation tests`, () => {
		test(`it should register changes to the textarea`, () => {
			const testMessage = "test peep message";
			const placeholderText = /what's going on?/i;
			const textArea = screen.getByPlaceholderText(placeholderText);
			userEvent.type(textArea, testMessage);

			expect(textArea).toHaveValue(testMessage);
		})
	})

	describe(`Peep submission tests for AddPeep`, () => {
		test(`it should render an error meesage if the user tries to post an empty message`, () => {
			const buttonText = /post/i;
			const postButton = screen.getByText(buttonText);

			userEvent.click(postButton);

			const errorMessage = screen.getByText(/please enter a valid message/i);
			expect(errorMessage).toBeInTheDocument();
		})

	})
})




