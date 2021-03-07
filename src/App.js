import './App.css';
import { NavBar } from './components/navbar';
import { Badge, Navbar } from 'react-bootstrap';
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
  const [numNodes, setNumNodes] = useState(0);


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
          setNumNodes(nodes.length);

          getNodeStats().then(data => {
            const insideData = data.data;
            const parsedData = insideData.map((entry) => JSON.parse(entry));

            let dict = {};
            parsedData.forEach((entry, i) => {             
              dict[`cpu-${i}`] = entry.cpu_percent;
              dict[`mem-${i}`] = entry.memory_percent;
            });
            dict['time'] = (new Date()).toString();

            setCpuData((old) => {
              return [...old, dict];
            })
          }).catch(() => {})
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
        <div style={{marginTop: 40}} fixed="bottom" className="bar">
          <div style={{display: "flex", justifyContent: "center"}}>
          <Badge variant="success">
            Server: Online
          </Badge>{' '}
          {[...Array(numNodes).keys()].map((_, i) => (
            <>
              <Badge variant="success" key={`badge-${i}`}>
                {`Compute node ${i}: Online`}
              </Badge>
              {' '}
            </>
          ))}
        </div>
          <Status text="CPU Usage" dataKey="cpu" data={cpuData} numNodes={numNodes} showBadges/>

          <Status text="Memory Usage" dataKey="mem" data={cpuData} numNodes={numNodes}/>
        </div>
    </>
  );
}

export default App;
