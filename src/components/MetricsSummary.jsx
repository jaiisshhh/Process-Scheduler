import React from "react";

function MetricsSummary({ tasks, algorithm }) {
  if (!tasks || tasks.length === 0 || tasks[0].turnaroundTime === undefined)
    return null;

  const total = tasks.reduce(
    (acc, task) => {
      acc.turnaroundTime += task.turnaroundTime || 0;
      acc.waitingTime += task.waitingTime || 0;
      acc.responseTime += task.responseTime || 0;
      return acc;
    },
    { turnaroundTime: 0, waitingTime: 0, responseTime: 0 }
  );

  const count = tasks.length;
  const format = (num) => (num / count).toFixed(2);

  const metrics = [
    {
      label: "Avg. Turnaround Time",
      value: format(total.turnaroundTime),
      color: "#3b82f6",
    },
    {
      label: "Avg. Waiting Time",
      value: format(total.waitingTime),
      color: "#16a34a",
    },
    {
      label: "Avg. Response Time",
      value: format(total.responseTime),
      color: "#9333ea",
    },
  ];

  return (
    <div className="metrics-summary">
      <h2 className="card-title" style={{ textAlign: "center" }}>
        Performance Metrics ({algorithm})
      </h2>
      <div className="metrics-grid">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="metric-card"
            style={{ backgroundColor: `${metric.color}1A` }}
          >
            <h3 style={{ color: metric.color }}>{metric.label}</h3>
            <p style={{ color: metric.color }}>{metric.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default MetricsSummary;
