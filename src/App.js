import './App.css';
import { NavBar } from './components/navbar';
import { useEffect, useState } from 'react';
import { ModelAccordion } from './components/accordion';
import { AddModelModal } from './components/modals';
import { getModels } from './utils';

function App() {
  const [models, setModels] = useState([]);
  const [filteredModels, setFilteredModels] = useState([]);
  const [showAddModelModal, setShowAddModelModal] = useState(false);
  const [filterString, setFilterString] = useState("");

  const openAddModelModal = () => setShowAddModelModal(true);
  const closeAddModelModal = () => setShowAddModelModal(false);

  const refreshModels = () => {
    getModels()
      .then(({data}) => {
        setModels(data);
      })
      .catch(console.log)
  }

  useEffect(() => {
    setFilteredModels(models.filter(({name}) => name.includes(filterString)));
  }, [filterString, models]);

  return (
    <>
      <NavBar 
        openAddModelModal={openAddModelModal}
        setFilterString={setFilterString}
      />
      <ModelAccordion 
        models={filteredModels} 
      />
      <AddModelModal 
        show={showAddModelModal}
        closeAddModelModal={closeAddModelModal}
        refreshModels={refreshModels}
      />
    </>
  );
}

export default App;
