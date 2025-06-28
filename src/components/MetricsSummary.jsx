import React from "react";

function MetricsSummary({ tasks, algorithm }) {
  if (!tasks || tasks.length === 0) return null;

  const total = {
    turnaroundTime: 0,
    waitingTime: 0,
    completionTime: 0,
    responseTime: 0,
  };

  tasks.forEach((task) => {
    total.turnaroundTime += task.turnaroundTime || 0;
    total.waitingTime += task.waitingTime || 0;
    total.completionTime += task.completionTime || 0;
    total.responseTime += task.responseTime || 0;
  });

  const count = tasks.length;

  const format = (num) => num.toFixed(2);

  return (
    <div className="mt-6 p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Metrics Summary ({algorithm})
      </h2>
      <ul className="text-gray-700 space-y-2">
        <li>
          <strong>Average Turnaround Time:</strong>{" "}
          {format(total.turnaroundTime / count)}
        </li>
        <li>
          <strong>Average Waiting Time:</strong>{" "}
          {format(total.waitingTime / count)}
        </li>
        <li>
          <strong>Average Completion Time:</strong>{" "}
          {format(total.completionTime / count)}
        </li>
        <li>
          <strong>Average Response Time:</strong>{" "}
          {format(total.responseTime / count)}
        </li>
      </ul>
    </div>
  );
}

export default MetricsSummary;
