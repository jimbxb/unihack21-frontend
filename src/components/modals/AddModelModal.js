import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from "react-bootstrap";

export const AddModelModal = ({show, closeAddModelModal, refreshModels}) => {
	return (
    <Modal show={show} onHide={() => { closeAddModelModal(); }}>
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-sm">
          Small Modal
        </Modal.Title>
        <Button onClick={() => { refreshModels(); closeAddModelModal(); }}>
          Add
        </Button>
      </Modal.Header>
    </Modal>
  );
}