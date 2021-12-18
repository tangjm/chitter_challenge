import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import InputGroup from 'react-bootstrap/InputGroup';
import ErrorModal from './ErrorModal';

const Register = () => {
	const [showErrorModal, setShowErrorModal] = useState(false);
	const [validated, setValidated] = useState(false);
	const [name, setName] = useState(``);
	const [username, setUsername] = useState(``);
	const [email, setEmail] = useState(``);
	const [password, setPassword] = useState(``);
	const navigate = useNavigate();

	const errorTitle = "Sign up failed";
	const errorMessage = "Username or email might be taken";

	const registerUser = async () => {
		try {
			const res = await axios.post(`${process.env.REACT_APP_NODESERVER}/register`, {
				name: name,
				username: username,
				email: email,
				password: password
			});
			return navigate(`/login`);
		} catch (err) {
			console.log(err);
			return failureHandler();
		}
	}

	function failureHandler() {
		setShowErrorModal(true);
	}

	const handleSubmit = event => {
		event.preventDefault();
		if (name && username && email && password) {
			return registerUser();
		}
		setValidated(true);
	}

	return (
		<>
			<ErrorModal show={showErrorModal} setShow={setShowErrorModal}
				errorMessage={errorMessage} errorTitle={errorTitle} />
			<h2 className="mb-4">Sign Up!</h2>
			<Form noValidate validated={validated} onSubmit={handleSubmit}>
				<Row className="align-items-center">
					<Col xs="auto">
						<InputGroup className="mb-4">
							<FloatingLabel className="floatingLabel" controlId="floatingInputGrid" label="Name">
								<Form.Control type="text" placeholder="Name"
									onChange={event => setName(event.target.value)} required />
								<Form.Control.Feedback type="invalid">
									Please enter a valid name
								</Form.Control.Feedback>
							</FloatingLabel>
						</InputGroup>
					</Col>

					<Col xs="auto">
						<InputGroup className="mb-4">
							<InputGroup.Text>@</InputGroup.Text>
							<FloatingLabel className="floatingLabel" controlId="floatingSelectGrid" label="Username">
								<Form.Control type="text" placeholder="Username"
									onChange={event => setUsername(event.target.value)}
									required
								/>
								<Form.Control.Feedback type="invalid">
									Please enter a valid username
								</Form.Control.Feedback>
							</FloatingLabel>
						</InputGroup>
					</Col>
				</Row>

				<Row className="align-items-center">
					<Col xs="auto">
						<InputGroup className="mb-4">
							<FloatingLabel className="floatingLabel" controlId="floatingEmailLabel" label="Email">
								<Form.Control type="email" placeholder="Email"
									onChange={event => setEmail(event.target.value)}
									required />
								<Form.Control.Feedback type="invalid">
									Please enter a valid email address
								</Form.Control.Feedback>
							</FloatingLabel>
						</InputGroup>
					</Col>
					<Col xs="auto">
						<InputGroup className="mb-4">
							<FloatingLabel className="floatingLabel" controlId="floatingInputGrid" label="Password">
								<Form.Control type="password" placeholder="Password"
									onChange={event => setPassword(event.target.value)}
									required />
							</FloatingLabel>
						</InputGroup>
					</Col>
				</Row>
				<Col xs="auto">
					<Button type="submit" className="mb-4">
						Create New Account
					</Button>
				</Col>
			</Form>
		</>
	)
}

export default Register;
