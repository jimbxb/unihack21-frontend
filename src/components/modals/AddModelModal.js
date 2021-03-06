import 'bootstrap/dist/css/bootstrap.min.css';
import { useRef } from 'react';
import { Button, Form, FormControl, Modal } from "react-bootstrap";
import { pushModel } from '../../utils';

export const AddModelModal = ({show, closeAddModelModal, refreshModels}) => {
  let nameRef = useRef();
  let modelRef = useRef();

  const handleAddModel = () => {
    pushModel(nameRef.value, modelRef.value)
      .then(() => {
        refreshModels();
      })
      .catch();
    closeAddModelModal();
  }



	return (
    <Modal show={show} onHide={() => { closeAddModelModal(); }}>
      <Modal.Header closeButton>
        <Modal.Title>
          Add Model
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FormControl
            placeholder="Model name"
            ref={inputRef => { nameRef = inputRef; }}
          />
          <Form.File 
            label="Model file" 
            ref={inputRef => { modelRef = inputRef; }}
            accept=".zip"
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleAddModel}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}