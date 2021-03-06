import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Accordion, Card, Button, Form } from 'react-bootstrap';
import { evalModel } from '../../utils';

import './index.scss';

const ModelForm = ({ model: { id, io_params: { input_features, output_features } } }) => {
  const [prediction, setPrediction] = useState({});
  const [predictionError, setPredictionError] = useState(false);
  const [input, setInput] = useState({});
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    evalModel(id, Object.entries(input).reduce((form, [name, value]) => {
      form.append(name, value);
      return form;
    }, new FormData()))
      .then((data) => {
        setPrediction(data.msg);
        setPredictionError(false);
      })
      .catch((err) => {
        setPredictionError(true);
        console.log(err);
      });
  }

  const handleInputChange = ({name, type}) => ({target}) => {
    let newVal = undefined;
    switch (type) {
      case "image":
        newVal = target.files ? target.files[0] : undefined;
        break;
      default:
        newVal = target.value;
        break;
    }
    const { [name]: _tmp, ...newInput } = input;
    if (newVal) {
      setInput({ ...newInput, [name]: newVal });
    } else {
      setInput(newInput);
    }
  }

  useEffect(() => {
    setValidated(Object.keys(input).length === input_features.length);
  }, [input, input_features]);
  
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label className="input-label">Input Data</Form.Label>
        {input_features?.map((feature, idx) => {
          const {name, type} = feature;
          switch (type) {
            case "image":
              return (
                <Form.File 
                  className="form-file"
                  key={`${name}-${idx}`}
                  label={`Feature: ${name}`}
                  accept=".png"
                  onChange={handleInputChange(feature)}
                />  
              );
            default: 
              return (
                <Form.Control 
                  className="form-text"
                  key={`${name}-${idx}`}
                  placeholder={`Feature: ${name}`}
                  onChange={handleInputChange(feature)}
                />
              );
          }
        })}
      </Form.Group>
      <Button 
        onClick={handleSubmit}
        disabled={!validated}
        variant="outline-dark"
      >
        Predict
      </Button>
      <Form.Group className="prediction-group">
        {predictionError || (Object.keys(prediction).length
                             && !prediction[`${output_features[0].name}_predictions`])
          ? <p className="prediction-error">There was an error processing your request.</p>
          : Object.keys(prediction).length
              ? <>
                  <Form.Label className="prediction-label">Predicted Class</Form.Label>
                  <p className="prediction">
                    {prediction[`${output_features[0].name}_predictions`][0]}
                  </p>
                </>
              : null
        }
      </Form.Group>
    </Form>
  );
}

export const ModelAccordion = ({ models, filtered }) => {
	return (
    <div className="accordion-container">
      {models && models.length > 0 
        ? <Accordion>
            {models.map((model) => {
              const {id, name} = model;
              return (
                <Card key={`card-${id}`} className="card">
                  <Accordion.Toggle 
                    as={Card.Header} 
                    eventKey={`card-${id}`} 
                    className="card-header"
                    style={{
                      background: "linear-gradient(150deg, rgb(53, 53, 53), grey)",
                      borderRadius: '10px',
                      borderColor: 'black',
                      color: 'white',
                      fontSize: 'larger'
                    }}
                  >
                    {name}
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey={`card-${id}`}>
                    <Card.Body className="card-body">
                      <ModelForm model={model}/>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              );
            })}
          </Accordion>
        : <div className="no-models">
            {filtered
              ? <>
                  <p>You have no models that match the applied filter.</p>
                  <p>
                    You can add a new model by pressing 'Add Model' button
                    <br/>
                    or refining your search term.
                  </p>
                </>
              : <>
                  <p>You have no active models.</p>
                  <p>You can add one by pressing 'Add Model'.</p>
                </>
            }
          </div>
      }
    </div>
    
  );
}