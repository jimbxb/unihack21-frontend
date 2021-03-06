import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useRef, useState, createRef } from 'react';
import { Accordion, Card, Button, Form } from 'react-bootstrap';
import { evalModel } from '../../utils';

const ModelForm = ({ model: { key, input_features, output_features } }) => {
  const [prediction, setPrediction] = useState([]);
  const [predictionError, setPredictionError] = useState(false);
  const dataRefs = useRef({});

  useEffect(() => {
    dataRefs.current = input_features.reduce((refs, feature) => {
      const { name } = feature;
      refs[name] = createRef();
      return refs;
    }, {});
  }, [input_features]);

  const handleSubmit = (event) => {
    event.preventDefault();

    evalModel(key, input_features.reduce((features, {name, type}) => {
      let data;
      const dataRef = dataRefs.current[name];
      switch (type) {
        case "text":
          data = [dataRef.value];
          break;
        case "image":
          data = [dataRef.value];
          break;
        default:
      }
      return { ...features, name: data };
    }, {}))
      .then((data) => {
        setPrediction(data.msg);
        setPredictionError(false);
      })
      .catch((err) => {
        setPredictionError(true);
        console.log(err);
      });
  }
  
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Data</Form.Label>
        {input_features?.map(({name, type}) => {
          switch (type) {
            case "text":
              return (
                <Form.Control 
                  ref={dataRefs.current[name]}
                  placeholder={`Feature: ${name}`}
                />
              );
            case "image":
              return (
                <Form.File 
                  ref={dataRefs.current[name]}
                  label={`Feature: ${name}`}
                  accept=".png"
                />  
              );
            default: 
              return undefined;
          }
        })}
      </Form.Group>
      <Button onClick={handleSubmit}>Predict</Button>
      <Form.Group>
        {predictionError
          ? <p>{"There was an error processing your request."}</p>
          : prediction.length > 0 
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
              <Card.Header 
                  style={{
                    background: "linear-gradient(150deg, #81c9c5, #4600f1 100%)",
                    borderRadius : '10px',
                    border: '10px blue',
                  }}>
                <Accordion.Toggle as={Button} variant="link" eventKey={key} 
                  style={{color : "black"}}>
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