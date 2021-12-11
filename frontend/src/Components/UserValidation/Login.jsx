import PropTypes from 'prop-types';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const Login = ({ baseUrl, setUser, setIsLoggedIn }) => {
	const [email, setEmail] = useState(``);
	const [password, setPassword] = useState(``);
	const navigate = useNavigate();

	const loginRequest = async () => {
		try {
			const res = await axios.post(`${baseUrl}/login`, { email, password });

			if (res.status === 200) {
				successHandler(res.data.user);
				return navigate(`/`);
			}
		} catch (err) {
			console.log(err);
		}
	}

	function successHandler({ name, username }) {
		setIsLoggedIn(true);
		setUser({ name, username });
	}

	const handleSubmit = event => {
		event.preventDefault();
		loginRequest();
	}

	return (
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
	)
}

Login.propTypes = {
	baseUrl: PropTypes.string,
	setUser: PropTypes.func,
	setIsLoggedIn: PropTypes.func,
}
export default Login;
