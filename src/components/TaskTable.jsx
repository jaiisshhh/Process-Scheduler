import React from "react";

function TaskTable({ tasks }) {
  if (!tasks || tasks.length === 0) return null;

  return (
    <table className="w-full mt-6 border">
      <thead className="bg-gray-200">
        <tr>
          <th className="border px-2">PID</th>
          <th className="border px-2">Arrival</th>
          <th className="border px-2">Burst</th>
          <th className="border px-2">Priority</th>
          <th className="border px-2">Completion</th>
          <th className="border px-2">TAT</th>
          <th className="border px-2">Waiting</th>
          <th className="border px-2">Response</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td className="border px-2">{task.id}</td>
            <td className="border px-2">{task.arrivalTime}</td>
            <td className="border px-2">{task.burstTime}</td>
            <td className="border px-2">{task.priority ?? "-"}</td>
            <td className="border px-2">{task.completionTime ?? "-"}</td>
            <td className="border px-2">{task.turnaroundTime ?? "-"}</td>
            <td className="border px-2">{task.waitingTime ?? "-"}</td>
            <td className="border px-2">{task.responseTime ?? "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TaskTable;
