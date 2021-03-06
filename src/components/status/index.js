import React from "react"
import { Badge } from 'react-bootstrap';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
  AreaChart,
  Area,
  ResponsiveContainer,
} from 'recharts'

const startTime = new Date();

function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes*60000);
}

const data = [
    {
      name: 'Page A',
      compute1: 0.3,
      compute2: 0.21,
      compute3: 0.45,
    },
    {
      name: 'Page B',
      compute1: 0.41,
      compute2: 0.16,
      compute3: 0.37,
    },
    {
      name: 'Page C',
      compute1: 0.64,
      compute2: 0.085,
      compute3: 0.35,
    },
    {
      name: 'Page D',
      compute1: 0.70,
      compute2: 0.14,
      compute3: 0.36,
    },
    {
      name: 'Page E',
      compute1: 0.73,
      compute2: 0.223,
      compute3: 0.415,
    },
    {
      name: 'Page F',
      compute1: 0.712,
      compute2: 0.35,
      compute3: 0.437,
    },
    {
      name: 'Page G',
      compute1: 0.9367,
      compute2: 0.17,
      compute3: 0.30,
    },
  ].map((data, index) => {
    const {name, ...rest} = data;

    return {name: addMinutes(startTime, index), ...rest};
  });
const Status = () => {
    return (
        <>
            <div>
                <Badge variant="success">Server 1 : Online</Badge>{' '}
                <Badge variant="success">Node 1 : Online</Badge>{' '}
                <Badge variant="success">Node 2 : Online</Badge>{' '}
                <Badge variant="success">Node 3 : Online</Badge>{' '}
            </div>
            <h4>CPU Usage: compute1</h4>

          <ResponsiveContainer width="100%" height={200}>
          <AreaChart
            width={500}
            height={200}
            data={data}
            syncId="anyId"
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
            <Area type="monotone" dataKey="compute1" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </ResponsiveContainer>
        <h4>CPU Usage: compute2</h4>

        <ResponsiveContainer width="100%" height={200}>
          <AreaChart
            width={500}
            height={200}
            data={data}
            syncId="anyId"
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
            <Area type="monotone" dataKey="compute2" stroke="#82ca9d" fill="#82ca9d" />
          </AreaChart>
        </ResponsiveContainer>
        
        <h4>CPU Usage: compute3</h4>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart
            width={500}
            height={200}
            data={data}
            syncId="anyId"
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
            <Area type="monotone" dataKey="compute3" stroke="#ffc658" fill="#ffc658" />
          </AreaChart>
        </ResponsiveContainer>
        </>
    )
}


export default Status