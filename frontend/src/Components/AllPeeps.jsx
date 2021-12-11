import axios from 'axios';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

const AllPeeps = ({ baseUrl }) => {
	const jsonServer = `http://localhost:4000/allPeeps`;
	const path = `${baseUrl}/allPeeps`;
	const servers = [jsonServer, path];

	const [peeps, setPeeps] = useState([]);

	const fetchPeeps = async () => {
		try {
			const res = await axios.get(servers[1]);
			if (res.data) {
				return res.data;
			}
		} catch (err) {
			console.log(err);
			return [];
		}
	}

	useEffect(() => {
		const getData = async () => {
			setPeeps(await fetchPeeps());
		}
		getData();
	}, [])

	const formatDate = date => {
		const newDate = new Date(date);
		const neatDate = newDate.toLocaleDateString();
		const neatTime = newDate.toLocaleTimeString(
			[],
			{ hour: '2-digit', minute: '2-digit' }
		)
		return `${neatDate} (${neatTime})`;
	}

	const formatPeeps = peeps => {
		if (!peeps.length) {
			return <span>No Peeps Found</span>;
		}
		peeps.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
		return peeps.map(peep => {
			const { sender, date, message, _id } = peep;
			const { name, username } = sender;
			return (
				<Card
					bg={"light"}
					key={_id}
					text={'dark'}
					className="mb-3 allPeeps"
				>
					<Card.Header>
						{`${name} @${username} ~ ${formatDate(date)} `}
					</Card.Header>
					<Card.Body>
						<Card.Text>
							{message}
						</Card.Text>
					</Card.Body>
				</Card>
			)
		})
	}

	return (
		<div>
			{formatPeeps(peeps)}
		</div>
	)
}

AllPeeps.propTypes = {
	baseUrl: PropTypes.string
}

export default AllPeeps;
