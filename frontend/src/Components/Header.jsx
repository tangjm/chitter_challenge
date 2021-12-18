import '../css/header.css';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/NavBar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';

const Header = ({ isLoggedIn, setIsLoggedIn, setUser, defaultUser }) => {

	const logOutHandler = event => {
		localStorage.removeItem(`user`);
		setIsLoggedIn(false);
		setUser(defaultUser);
	}

	return (
		<header className="header">
			<Navbar bg="primary" variant="dark">
				<Container>
					<LinkContainer to="/">
						<Navbar.Brand >Chitter</Navbar.Brand>
					</LinkContainer>
					<Nav className="ms-auto">
						<LinkContainer to="/addPeep">
							<Nav.Link>New Peep</Nav.Link>
						</LinkContainer>
						{isLoggedIn ?
							<LinkContainer to="/">
								<Nav.Link onClick={logOutHandler}>Log Out</Nav.Link>
							</LinkContainer>
							: <>
								<LinkContainer to="/login">
									<Nav.Link>Login</Nav.Link>
								</LinkContainer>
								<LinkContainer to="/register">
									<Nav.Link>Register</Nav.Link>
								</LinkContainer>
							</>}
					</Nav>
				</Container>
			</Navbar>
		</header >
	)
}

Header.propTypes = {
	isLoggedIn: PropTypes.bool,
	setIsLoggedIn: PropTypes.func,
	setUser: PropTypes.func,
	defaultUser: PropTypes.exact({
		name: PropTypes.string,
		username: PropTypes.string
	})
}

export default Header;
