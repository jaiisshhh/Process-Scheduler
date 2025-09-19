// src/components/ResultsTable.jsx

import React from "react";

function ResultsTable({ tasks }) {
  if (!tasks || tasks.length === 0) {
    return null; // Don't render if there are no tasks
  }

  const tableHeaders = [
    "PID",
    "Arrival",
    "Burst",
    "Priority",
    "Queue",
    "Completion",
    "Turnaround",
    "Waiting",
    "Response",
  ];

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2 className="card-title">Scheduling Results</h2>
      {/* The "table-scroll-container" class has been removed from the line below */}
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              {tableHeaders.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td style={{ fontWeight: 500 }}>P{task.id}</td>
                <td>{task.arrivalTime}</td>
                <td>{task.burstTime}</td>
                <td>{task.priority ?? "–"}</td>
                <td>{task.queueLevel ?? "–"}</td>
                <td>{task.completionTime ?? "–"}</td>
                <td>{task.turnaroundTime ?? "–"}</td>
                <td>{task.waitingTime ?? "–"}</td>
                <td>{task.responseTime ?? "–"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ResultsTable;
