import 'bootstrap/dist/css/bootstrap.min.css';
import './AddModelModal.scss';
import { useRef, useState } from 'react';
import { Button, Form, FormControl, Modal } from "react-bootstrap";
import { pushModel, trainModel } from '../../utils';

export const AddModelModal = ({show, closeAddModelModal, refreshModels}) => {
  const [nameRef, modelRef, ioRef, dataRef] = [useRef(), useRef(), useRef(), useRef()];
  const [validated, setValidated] = useState(false);
  const [isPreTrained, setIsPreTrained] = useState(false);

  const handleAddModel = () => {
    (isPreTrained
      ? pushModel(nameRef.value, modelRef.files[0])
      : trainModel(nameRef.value, ioRef.files[0], dataRef.files[0]))
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
      (nameRef?.value ?? "")
      && (isPreTrained 
            ? modelRef?.files?.length
            : ioRef?.files?.length && dataRef?.files?.length) 
    );
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
            onChange={checkValidation}
          />
          <Form.Check
            type="checkbox"
            label="Pre-trained Model?"
            onChange={(event) => setIsPreTrained(event.target.checked)}
            className="checkbox"
            checked={isPreTrained}
          />
          {isPreTrained
            ? <Form.File 
                label="Model file" 
                ref={inputRef => { modelRef = inputRef; }}
                onChange={checkValidation}
                accept=".zip"
              />
            : <>
                <Form.File 
                  label="I/O file" 
                  ref={inputRef => { ioRef = inputRef; }}
                  onChange={checkValidation}
                  accept=".json"
                />
                <Form.File 
                  label="Training Data File" 
                  ref={inputRef => { dataRef = inputRef; }}
                  onChange={checkValidation}
                  accept=".csv"
                />
              </>
          }
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button 
          onClick={handleAddModel} 
          disabled={!validated}
          variant="outline-secondary"
        >
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}