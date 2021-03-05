import './App.css';
import { NavBar } from './components/navbar';
import { useState } from 'react';
import { ModelAccordion } from './components/accordion';
import { AddModelModal } from './components/addmodal';
import { getModels } from './utils';

function App() {
  const [model, setModel] = useState(null);
  const [models, setModels] = useState([]);
  const [showAddModelModal, setShowAddModelModal] = useState(false);

  const openAddModelModal = () => setShowAddModelModal(true);
  const closeAddModelModal = () => setShowAddModelModal(false);

  const refreshModels = () => {
    getModels()
      .then(({data}) => {
        console.log(data);
        setModels(data);
      })
      .catch(console.log)
  }

  return (
    <div className="App">
      <NavBar 
        openAddModelModal={openAddModelModal}
      />
      <ModelAccordion 
        models={models} 
        setModel={setModel} 
        model={model}
      />
      <AddModelModal 
        show={showAddModelModal}
        closeAddModelModal={closeAddModelModal}
        refreshModels={refreshModels}
      />
    </div>
  );
}

export default App;
