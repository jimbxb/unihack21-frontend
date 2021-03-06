import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useRef, useState } from 'react';
import { Button, Form, FormControl, Modal } from "react-bootstrap";
import { pushModel } from '../../utils';

export const AddModelModal = ({show, closeAddModelModal, refreshModels}) => {
  let nameRef = useRef();
  let modelRef = useRef();
  const [validated, setValidated] = useState(false);

  const handleAddModel = () => {
    pushModel(nameRef.value, modelRef.files[0])
      .then(() => {
        refreshModels();
      })
      .catch((err) => {
        console.error(err);
      });
    closeAddModelModal();
  }

  const checkValidation = () => {
    setValidated(
      modelRef?.files?.length && (nameRef?.value ?? "")
    );
  }

  useEffect(() => {
    checkValidation();
  }, []);

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
            onChange={checkValidation}
          />
          <Form.File 
            label="Model file" 
            ref={inputRef => { modelRef = inputRef; }}
            onChange={checkValidation}
            accept=".zip"
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleAddModel} disabled={!validated}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}