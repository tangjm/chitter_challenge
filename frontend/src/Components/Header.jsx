import '../css/header.css';
import Navbar from 'react-bootstrap/NavBar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

const Header = () => {
	return (
		<header className="header">
			<Navbar bg="primary" variant="dark">
				<Container>
					<Navbar.Brand href="/">Chitter</Navbar.Brand>
					<Nav className="ms-auto">
						<Nav.Link href="/addPeep">New Peep</Nav.Link>
						<Nav.Link href="/login">Login</Nav.Link>
						<Nav.Link href="/register">Register</Nav.Link>
					</Nav>
				</Container>
			</Navbar>
		</header >
	)
}

export default Header;
