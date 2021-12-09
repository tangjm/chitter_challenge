import axios from 'axios';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const AddPeep = ({ baseUrl, user }) => {
	const [message, setMessage] = useState(``);
	const [date, setDate] = useState(``);

	let navigate = useNavigate();
	let path = `${baseUrl}addPeep`;
	const placeholderText = "Your message..."

	const postPeep = async () => {
		try {
			const res = await axios.post(path, {
				"message": message,
				"sender": user,
				"date": date,
				"metaData": {
					"isReply": false
				}
			})
			if (res.status === 200) {
				return navigate("/");
			}
		} catch (err) {
			console.log(err);
		}
	}

	const submitHandler = event => {
		event.preventDefault();
		// ensure message is not an empty string
		if (message) {
			return postPeep();
		}
		// render something to tell the user to enter a valid message
	}

	useEffect(() => {
		const interval = setInterval(() => {
			setDate(new Date().toISOString());
		}, 100);

		return () => clearInterval(interval);
	}, [date]);

	return (
		<div>
			<Form className="singlePeep" onSubmit={submitHandler}>
				<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
					<Form.Label>Your peep:</Form.Label>
					<Form.Control
						as="textarea"
						placeholder={placeholderText} rows={3}
						onChange={event => setMessage(event.target.value)}
					// isInvalid={}
					/>
				</Form.Group>
				<Button as="input" type="submit" value="Post" />{' '}
			</Form>
		</div >
	)
}


AddPeep.propTypes = {
	baseUrl: PropTypes.string,
	user: PropTypes.exact({
		"name": PropTypes.string,
		"username": PropTypes.string
	})
}
export default AddPeep;
