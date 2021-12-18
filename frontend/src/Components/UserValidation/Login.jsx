import PropTypes from 'prop-types';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ErrorModal from './ErrorModal';

const Login = ({ baseUrl, setIsLoggedIn }) => {
	const [email, setEmail] = useState(``);
	const [password, setPassword] = useState(``);
	const [showErrorModal, setShowErrorModal] = useState(false);
	const navigate = useNavigate();
	const errorTitle = "Login failed";
	const errorMessage = "Please try again";

	const loginRequest = async () => {
		try {
			const res = await axios.post(`${baseUrl}/login`, { email, password });
			localStorage.setItem(`user`, JSON.stringify(res.data));
			return successHandler();
		} catch (err) {
			return failureHandler();
		}
	}

	function successHandler() {
		setIsLoggedIn(true);
		return navigate(`/`);
	}

	function failureHandler() {
		setShowErrorModal(true);
	}

	const handleSubmit = event => {
		event.preventDefault();
		loginRequest();
	}

	return (
		<>
			<ErrorModal show={showErrorModal} setShow={setShowErrorModal} errorMessage={errorMessage} errorTitle={errorTitle} />
			<Form onSubmit={handleSubmit}>
				<h2 className="mb-3">Login</h2>

				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control type="email" placeholder="Email" onChange={event => setEmail(event.target.value)} required />

					<Form.Text className="text-muted">
						We'll never share your email with anyone else.
					</Form.Text>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" placeholder="Password" onChange={event => setPassword(event.target.value)} required />
				</Form.Group>

				<Button variant="primary" type="submit">
					Login
				</Button>
			</Form>
		</>
	)
}

Login.propTypes = {
	baseUrl: PropTypes.string,
	setIsLoggedIn: PropTypes.func,
}
export default Login;
