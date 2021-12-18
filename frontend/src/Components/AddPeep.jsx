import axios from 'axios';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const AddPeep = ({ baseUrl }) => {
	const [message, setMessage] = useState(``);
	const [date, setDate] = useState(``);
	const [validated, setValidated] = useState(false);

	let navigate = useNavigate();
	let path = `${baseUrl}/addPeep`;
	const placeholderText = "What's going on?";

	const postPeep = async () => {
		const { name, username } = JSON.parse(localStorage.getItem(`user`)).user
		const token = JSON.parse(localStorage.getItem(`user`)).accessToken;
		const headers = { headers: { "x-access-token": token } };
		try {
			const res = await axios.post(path, {
				"message": message,
				"sender": { name, username },
				"date": date,
				"metaData": {
					"isReply": false
				}
			}, headers);
			if (res.status === 200) {
				return navigate("/");
			}
		} catch (err) {
			console.log(err);
		}
	}

	const submitHandler = event => {
		event.preventDefault();
		if (message) {
			return postPeep();
		}
		setValidated(true);
	}

	useEffect(() => {
		const interval = setInterval(() => {
			setDate(new Date().toISOString());
		}, 100);
		return () => clearInterval(interval);
	}, [date]);

	return (
		<div>
			<Form noValidate validated={validated} className="singlePeep" onSubmit={submitHandler}>
				<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
					<Form.Label>Your peep:</Form.Label>
					<Form.Control
						as="textarea"
						placeholder={placeholderText} rows={3}
						onChange={event => setMessage(event.target.value)}
						required
					/>
					<Form.Control.Feedback type="invalid">
						Please enter a valid message
					</Form.Control.Feedback>
				</Form.Group>
				<Button as="input" type="submit" value="Post" />{' '}
			</Form>
		</div >
	)
}


AddPeep.propTypes = {
	baseUrl: PropTypes.string,
}

export default AddPeep;
