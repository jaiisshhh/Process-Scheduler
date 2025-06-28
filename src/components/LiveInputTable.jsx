import React from 'react';

function LiveInputTable({ tasks }) {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2">Input Tasks</h2>
      <table className="min-w-full border border-gray-400">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 border">PID</th>
            <th className="px-4 py-2 border">Arrival Time</th>
            <th className="px-4 py-2 border">Burst Time</th>
            <th className="px-4 py-2 border">Priority</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td className="px-4 py-2 border">P{task.id}</td>
              <td className="px-4 py-2 border">{task.arrivalTime}</td>
              <td className="px-4 py-2 border">{task.burstTime}</td>
              <td className="px-4 py-2 border">
                {task.priority !== null ? task.priority : '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LiveInputTable;
