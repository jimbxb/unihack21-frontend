import { Badge, Navbar } from 'react-bootstrap';
import { XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area, ResponsiveContainer } from 'recharts';

import './index.scss';

const startTime = new Date();

const Status = ({ data }) => {
  const { name: _name, ...names } = data[0] ?? {}
  const nodeNames = Object.keys(names);
  
  return (
    <Navbar fixed="bottom" className="bar">
      <div>
        <Badge variant="success">
          Server: Online
        </Badge>{' '}
        {nodeNames.map((name) => (
          <>
            <Badge variant="success" key={`badge-${name}`}>
              {`Node '${name}': Online`}
            </Badge>
            {' '}
          </>
        ))}
      </div>
      <h5>CPU Usage:</h5>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart
          data={data.map((data, index) => {
            const {name, ...rest} = data;
            return {name: new Date(startTime.getTime() + index * 5000), ...rest};
          })}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          {nodeNames.map((name) => (
            <Area 
              type="monotone" 
              dataKey={name} 
              stroke="rgb(53, 53, 53)" 
              fill="grey" 
              key={`area-${name}`} 
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </Navbar>
  )
}

export default Status;