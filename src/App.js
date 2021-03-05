import './App.css';
import { NavBar } from './components/navbar';
import { useState } from 'react';
import { ModelAccordion } from './components/accordion';

function App() {
  const [model, setModel] = useState(null);
  const [models, setModels] = useState([{name: "name0", key: "0"},{name: "name1", key: "1"},{name: "name2", key: "2"}]);

  return (
    <div className="App">
      <NavBar models={models} setModel={setModel} model={model}/>
      <ModelAccordion models={models} setModel={setModel} model={model}/>
    </div>
  );
}

export default App;
