import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const AddPeep = () => {

	return (
		<div>
			<Form style={{ width: '30rem' }} >
				<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
					<Form.Label>Your peep:</Form.Label>
					<Form.Control as="textarea" rows={3} />
				</Form.Group>
				<Button as="input" type="submit" value="Post" />{' '}
			</Form>
		</div >
	)
}

export default AddPeep;
