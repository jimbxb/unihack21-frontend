import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Button, FormControl, Form } from "react-bootstrap";

export const NavBar = ({openAddModelModal, setFilterString}) => {
	return (
		<Navbar sticky="top">
			<Navbar.Brand>Scalr.io</Navbar.Brand>
			<Form	inline
				  className="ml-auto">
				<FormControl
				  className="mr-2"
					placeholder="Filter models"
					onChange={({ target: { value }}) => setFilterString(value)}
				/>
				<Button onClick={openAddModelModal}>Add Model</Button>
			</Form>
		</Navbar>
	);
}