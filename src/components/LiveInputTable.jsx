// src/components/LiveInputTable.jsx

import { Edit, Trash2 } from "lucide-react";

function LiveInputTable({ tasks, onEdit, onDelete, onClearAll }) {
  if (!tasks || tasks.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "2rem",
          border: "2px dashed #d1d5db",
          borderRadius: "0.5rem",
        }}
      >
        <h3 style={{ fontSize: "1.125rem", fontWeight: 500, color: "#374151" }}>
          No tasks added yet.
        </h3>
        <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
          Use the form to add your first task.
        </p>
      </div>
    );
  }

  const tableHeaders = [
    "PID",
    "Arrival",
    "Burst",
    "Priority",
    "Queue",
    "Actions",
  ];

  return (
    <>
      {" "}
      {/* Use a Fragment to avoid an extra div */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
          flexShrink: 0,
        }}
      >
        <h2 className="card-title">Current Task Queue</h2>
        <button onClick={onClearAll} className="btn btn-danger">
          <Trash2 size={16} /> Clear All
        </button>
      </div>
      {/* The table-wrapper class makes this div scrollable */}
      <div className="table-container table-wrapper">
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
                <td>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button
                      onClick={() => onEdit(task)}
                      className="action-btn edit"
                      title="Edit Task"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(task.id)}
                      className="action-btn delete"
                      title="Delete Task"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default LiveInputTable;
