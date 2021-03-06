import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import { Navbar, Button, FormControl, Form } from "react-bootstrap";

export const NavBar = ({openAddModelModal, setFilterString}) => {
	return (
		<Navbar sticky="top" bg="dark" variant="dark" className="navbar">
			<Navbar.Brand>Scalr.io</Navbar.Brand>
			<Form	
				inline
				className="ml-auto"
      >
				<FormControl
				  className="mr-2"
					placeholder="Filter models"
					onChange={({ target: { value }}) => setFilterString(value)}
				/>
				<Button 
          onClick={openAddModelModal}
          variant="outline-light"
        >
          Add Model
        </Button>
			</Form>
		</Navbar>
	);
}