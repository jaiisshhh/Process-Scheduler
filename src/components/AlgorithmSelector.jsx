import React from "react";

const algorithms = [
  { value: "FCFS", label: "First Come First Serve (FCFS)" },
  { value: "SJF", label: "Shortest Job First (SJF)" },
  { value: "LJF", label: "Longest Job First (LJF)" },
  { value: "SRTF", label: "Shortest Remaining Time First (SRTF)" },
  { value: "LRTF", label: "Longest Remaining Time First (LRTF)" },
  { value: "RRS", label: "Round Robin Scheduling (RRS)" },
  { value: "PRIORITY", label: "Priority Scheduling" },
  { value: "MLQ", label: "Multilevel Queue (MLQ)" },
  { value: "MLFQ", label: "Multilevel Feedback Queue (MLFQ)" },
];

function AlgorithmSelector({ selected, onChange }) {
  return (
    <div className="form-group">
      <label htmlFor="algo-select" className="form-label">
        Scheduling Algorithm:
      </label>
      <select
        id="algo-select"
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="form-select"
      >
        {algorithms.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
export default AlgorithmSelector;
