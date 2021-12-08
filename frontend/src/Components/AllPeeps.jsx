import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

const AllPeeps = () => {
	return (
		<div>
			<Card
				bg={"light"}
				key={1}
				text={'dark'}
				style={{ width: '70rem' }}
				className="mb-3"
			>
				<Card.Header>
					Name | Username | Date
				</Card.Header>
				<Card.Body>
					<Card.Text>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo ut quasi, perferendis obcaecati id saepe quas sequi hic, molestias tempore laborum? Voluptatem nam nisi nobis quaerat ratione, unde quis odit!
					</Card.Text>
				</Card.Body>
			</Card>
		</div>
	)
}

export default AllPeeps;
