import 'bootstrap/dist/css/bootstrap.min.css';
import { useRef, useState } from 'react';
import { Accordion, Card, Button, Form } from 'react-bootstrap';
import { evalModel } from '../../utils';

const ModelForm = ({key}) => {
  const [prediction, setPrediction] = useState("");
  const [predictionError, setPredictionError] = useState(false);
  let dataRef = useRef();

  const handleClick = () => {
    evalModel(key, dataRef.value)
      .then(({data}) => {
        setPrediction(data);
        setPredictionError(false);
      })
      .catch((err) => {
        setPredictionError(true);
        console.log(err);
      });
  }

  return <Form>
    <Form.Group>
      <Form.Label>Data</Form.Label>
      <Form.Control 
        ref={inputRef => { dataRef = inputRef; }}
        placeholder="Input data"
      />
    </Form.Group>
    <Button onClick={handleClick}>Predict</Button>
    <Form.Group>
      <Form.Label>Prediction</Form.Label>
      {predictionError
        ? <p>{"There was an error processing your request."}</p>
        : <p>{prediction}</p>
      }
    </Form.Group>
  </Form>
}

export const ModelAccordion = ({models, model, setModel}) => {
	return <Accordion defaultActiveKey={model?.key}>
      {models.map((model) => {
        const {key, name} = model;
        return <Card key={`card-${key}`}>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey={key}>
              {name}
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey={key}>
            <Card.Body>
              <ModelForm model={model}/>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      })}
  </Accordion>
}