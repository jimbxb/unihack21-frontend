import { Badge, Navbar } from 'react-bootstrap';
import { XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area, ResponsiveContainer } from 'recharts';

import './index.scss';

const startTime = new Date();

const Status = ({ text, dataKey, data, numNodes, showBadges=true }) => {
  
  console.log(data);

  return (
   
      <>
      <h5>{text}</h5>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart
          data={data}
          
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          {[...Array(numNodes).keys()].map((_, i) => (
            <Area 
              type="monotone" 
              dataKey={`${dataKey}-${i}`} 
              stroke="rgb(53, 53, 53)" 
              fill="grey" 
              key={`cpu_percent-${i}`} 
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
      </>
   
  )
}

export default Status;