import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Button } from "react-bootstrap";

export const NavBar = ({models, model, setModel, openAddModelModal}) => {
	return <Navbar>
		<Navbar.Brand>Scalr.io</Navbar.Brand>
		<Button onClick={openAddModelModal}>Add Model</Button>
	</Navbar>;
}