import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Accordion, Card, Button, Form } from 'react-bootstrap';
import { evalModel } from '../../utils';

const ModelForm = ({ model: { key, input_features, output_features } }) => {
  const [prediction, setPrediction] = useState({});
  const [predictionError, setPredictionError] = useState(false);
  const [input, setInput] = useState({});
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    evalModel(key, Object.entries(input).reduce((form, [name, value]) => {
      form.append(name, value);
      return form;
    }, new FormData()))
      .then((data) => {
        setPrediction(data.msg);
        setPredictionError(false);
        console.log(data.msg);
      })
      .catch((err) => {
        setPredictionError(true);
        console.log(err);
      });
  }

  const handleInputChange = ({name, type}) => ({target}) => {
    let newVal = undefined;
    switch (type) {
      case "text":
        newVal = target.value;
        break;
      case "image":
        newVal = target.files ? target.files[0] : undefined;
        break;
      default:
    }
    const {[name]: _tmp, ...newInput} = input;
    if (newVal) {
      setInput({ ...newInput, [name]: newVal});
    } else {
      setInput(newInput);
    }
  }

  useEffect(() => {
    setValidated(Object.keys(input).length === input_features.length);
  }, [input]);
  
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Data</Form.Label>
        {input_features?.map((feature) => {
          const {name, type} = feature;
          switch (type) {
            case "text":
              return (
                <Form.Control key={name}
                  placeholder={`Feature: ${name}`}
                  onChange={handleInputChange(feature)}
                />
              );
            case "image":
              return (
                <Form.File key={name}
                  label={`Feature: ${name}`}
                  accept=".png"
                  onChange={handleInputChange(feature)}
                />  
              );
            default: 
              return undefined;
          }
        })}
      </Form.Group>
      <Button 
        onClick={handleSubmit}
        disabled={!validated}
      >
        Predict
      </Button>
      <Form.Group>
        {predictionError
          ? <p>{"There was an error processing your request."}</p>
          : Object.keys(prediction).length
              ? <>
                  <p>Predicted Class</p>
                  <p>{prediction[`${output_features[0].name}_predictions`][0]}</p>
                </>
              : null
        }
      </Form.Group>
    </Form>
  );
}

export const ModelAccordion = ({models}) => {
	return (
    models && models.length > 0 
      ? <Accordion>
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
      : <>
          <p>You have no active models.</p>
          <p>You can add one by pressing the 'Add Model' button.</p>
        </>
  );
}