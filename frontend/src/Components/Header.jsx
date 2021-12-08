import Navbar from 'react-bootstrap/NavBar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

const Header = () => {
	return (
		<header>
			<Navbar bg="primary" variant="dark">
				<Container style={{ width: '70rem' }}>
					<Navbar.Brand href="#home">Chitter</Navbar.Brand>
					<Nav className="me-auto">
						<Nav.Link href="#home">Home</Nav.Link>
						<Nav.Link href="#features">Login</Nav.Link>
						<Nav.Link href="#pricing">Register</Nav.Link>
					</Nav>
				</Container>
			</Navbar>
		</header >
	)
}

export default Header;
