import React from "react";

function TaskTable({ tasks, setTasks }) {
  if (!tasks || tasks.length === 0) return null;

  const handleDelete = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

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
          <th className="border px-2">Action</th>
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
            <td className="border px-2">
              <button
                onClick={() => handleDelete(task.id)}
                className="bg-red-600 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TaskTable;
