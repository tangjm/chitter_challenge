import PropTypes from 'prop-types'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ErrorModal = ({ show, setShow, errorMessage, errorTitle }) => {

	const handleClose = () => setShow(false);

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header >
				<Modal.Title>{errorTitle}</Modal.Title>
			</Modal.Header>
			<Modal.Body>{errorMessage}</Modal.Body>
			<Modal.Footer>
				<Button variant="danger" onClick={handleClose}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

Modal.propTypes = {
	show: PropTypes.bool,
	setShow: PropTypes.func,
	errorTitle: PropTypes.string,
	errorMessage: PropTypes.string,
}

export default ErrorModal;
