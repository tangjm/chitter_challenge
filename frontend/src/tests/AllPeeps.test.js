import AllPeeps from '../Components/AllPeeps';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';


describe(`Test suite for AllPeeps`, () => {
	beforeEach(() => {
		render(
			<Router>
				<AllPeeps />
			</Router>
		);
	})

	xdescribe(`Render tests for AllPeeps`, () => {
		test(`it should render a message saying there are no peeps if there are no peeps`, () => {

		})

		test(`it should render a date for each peep`, () => {

		})

		test(`it should render a message for each peep`, () => {

		})

		test(`it should render a name for each peep`, () => {

		})

		test(`it should render a username for each peep`, () => {

		})
	})

	xdescribe(`Tests for when a single peep is clicked`, () => {
		test(`it should render a single peep`, () => {

		})
	})
})




