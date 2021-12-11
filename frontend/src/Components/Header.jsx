import '../css/header.css';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/NavBar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

const Header = ({ isLoggedIn, setUser, defaultUser }) => {

	const logOutHandler = event => setUser(defaultUser);

	return (
		<header className="header">
			<Navbar bg="primary" variant="dark">
				<Container>
					<Navbar.Brand href="/">Chitter</Navbar.Brand>
					<Nav className="ms-auto">
						<Nav.Link href="/addPeep">New Peep</Nav.Link>
						{isLoggedIn ? <Nav.Link href="/" onClick={logOutHandler}>Log Out</Nav.Link>
							: <><Nav.Link href="/login" >Login</Nav.Link>
								<Nav.Link href="/register">Register</Nav.Link></>}
					</Nav>
				</Container>
			</Navbar>
		</header >
	)
}

Header.propTypes = {
	isLoggedIn: PropTypes.bool,
	setUser: PropTypes.func,
	defaultUser: PropTypes.exact({
		name: PropTypes.string,
		username: PropTypes.string
	})
}

export default Header;
