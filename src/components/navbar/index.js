import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Button, FormControl } from "react-bootstrap";

export const NavBar = ({openAddModelModal, setFilterString}) => {
	return (
		<Navbar>
			<Navbar.Brand>Scalr.io</Navbar.Brand>
			<FormControl
				placeholder="Filter models"
				onChange={({ target: { value }}) => setFilterString(value)}
			/>
			<Button onClick={openAddModelModal}>Add Model</Button>
		</Navbar>
	);
}