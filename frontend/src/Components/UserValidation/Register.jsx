import PropTypes from 'prop-types';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import InputGroup from 'react-bootstrap/InputGroup';

const Register = () => {
	const [name, setName] = useState(``);
	const [username, setUsername] = useState(``);
	const [email, setEmail] = useState(``);
	const [password, setPassword] = useState(``);

	return (
		<>
			<h2 className="mb-4">Sign Up!</h2>
			<Form>
				<Row className="align-items-center">
					<Col xs="auto">
						<InputGroup className="mb-4" hasValidation>
							<FloatingLabel className="floatingLabel" controlId="floatingInputGrid" label="Name">
								<Form.Control type="text" placeholder="Name" onChange={event => setName(event.target.value)} />
							</FloatingLabel>
						</InputGroup>
					</Col>

					<Col xs="auto">
						<InputGroup className="mb-4" hasValidation>
							<InputGroup.Text>@</InputGroup.Text>
							<FloatingLabel className="floatingLabel" controlId="floatingSelectGrid" label="Username">
								<Form.Control type="text" placeholder="Username"
									onChange={event => setUsername(event.target.value)}
								/>
							</FloatingLabel>
						</InputGroup>
					</Col>
				</Row>

				<Row className="align-items-center">
					<Col xs="auto">
						<InputGroup className="mb-4">
							<FloatingLabel className="floatingLabel" controlId="floatingEmailLabel" label="Email">
								<Form.Control type="email" placeholder="Email"
									onChange={event => setEmail(event.target.value)} />
							</FloatingLabel>
						</InputGroup>
					</Col>
					<Col xs="auto">
						<InputGroup className="mb-4">
							<FloatingLabel className="floatingLabel" controlId="floatingInputGrid" label="Password">
								<Form.Control type="password" placeholder="Password"
									onChange={event => setPassword(event.target.value)} />
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
