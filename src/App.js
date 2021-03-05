import './App.css';
import NavBar from './components/navbar';
import { useState } from 'react';



function App() {
  const [model, setModel] = useState(null);
  const [models, setModels] = useState([{name: "tmp", key: "tmpkey"}]);

  return (
    <div className="App">
      <NavBar models={models} setModel={setModel} model={model}/>
    </div>
  );
}

export default App;
