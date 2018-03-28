import React from 'react';
import {
  ResponsiveContainer,
  PieChart as PieRechart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from 'recharts';

const COLORS = ['#36AEB5', '#3CC7B0', '#65DDA1', '#9BF18D'];

const PieChart = props => {
  const { data = [] } = props;
  return (
    <ResponsiveContainer>
      <PieRechart>
        <Tooltip />
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={'100%'}
          fill="#8884d8"
          paddingAngle={0}
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend iconType={'circle'} iconSize={10} />
      </PieRechart>
    </ResponsiveContainer>
  );
};

export default PieChart;
