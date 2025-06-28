import React from 'react';

const algorithms = [
  { value: 'FCFS', label: 'First Come First Serve (FCFS)' },
  { value: 'SJF', label: 'Shortest Job First (SJF)' },
  { value: 'RRS', label: 'Round Robin Scheduling (RRS)' },
  { value: 'LJF', label: 'Longest Job First (LJF)' },
  { value: 'PRIORITY', label: 'Priority CPU Scheduling' },
  { value: 'LRTF', label: 'Longest Remaining Time First (LRTF)' },
  { value: 'SRTF', label: 'Shortest Remaining Time First (SRTF)' },
  { value: 'MLQ', label : 'Multilevel Queue (MLQ)'},

];

function AlgorithmSelector({ selected, onChange }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <label htmlFor="algo-select" style={{ marginRight: '10px', fontWeight: 'bold' }}>
        Select Scheduling Algorithm:
      </label>
      <select
        id="algo-select"
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        style={{ padding: '5px', fontSize: '16px' }}
      >
        {algorithms.map(({ value, label }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
    </div>
  );
}

export default AlgorithmSelector;
