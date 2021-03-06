import './App.css';
import { NavBar } from './components/navbar';
import { useEffect, useState } from 'react';
import { ModelAccordion } from './components/accordion';
import { AddModelModal } from './components/modals';
import { getModels, getNodes, getNodeStats } from './utils';
import Status from './components/status';

function App() {
  const [models, setModels] = useState([]);
  const [filteredModels, setFilteredModels] = useState([]);
  const [showAddModelModal, setShowAddModelModal] = useState(false);
  const [filterString, setFilterString] = useState("");
  const [cpuData, setCpuData] = useState([]);

  const openAddModelModal = () => setShowAddModelModal(true);
  const closeAddModelModal = () => setShowAddModelModal(false);

  const refreshModels = () => {
    getModels()
      .then(({data}) => {
        setModels(Object.values(data));
      })
      .catch(e => console.log(e));
  }

  useEffect(() => {
    setFilteredModels(models.filter(({name}) => name.includes(filterString)));
  }, [filterString, models]);

  useEffect(() => {
    const handle = setInterval(async () => {
      refreshModels();
      document.title = "Scalr.io";
      getNodes()
        .then(({ data: nodes }) => {
          Promise.all(nodes.map(({serverId}) => (
            getNodeStats(serverId)
              .then(({data}) => ({ ok: true, data }))
              .catch(({err}) => ({ ok: false, err }))
          )))
            .then((resolutions) => {
              const name = cpuData.length ? cpuData[cpuData.length - 1].name + 1 : 0;
              const entry = resolutions.reduce((acc, {ok, data: {cpu_percent}}, idx) => {
                if (ok) {
                  acc[`compute${idx}`] = cpu_percent * 100;
                }
                return acc;
              }, {});
              setCpuData((old) => ([...old, {name, ...entry}]));
            })          
            .catch(e => console.log(e));
        })
        .catch(e => console.log(e));
    }, 5000);

    return () => {
      clearInterval(handle);
    };

  }, []);

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
        filtered={filterString}
      />
      <Status data={cpuData}/>
    </>
  );
}

export default App;
