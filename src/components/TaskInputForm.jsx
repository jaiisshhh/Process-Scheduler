import React, { useState, useEffect, useCallback } from "react";
import { Plus, Edit3, X } from "lucide-react";

function TaskInputForm({
  tasks,
  setTasks,
  algorithm,
  editingTask,
  setEditingTask,
}) {
  const [arrivalTime, setArrivalTime] = useState("");
  const [burstTime, setBurstTime] = useState("");
  const [priority, setPriority] = useState("");
  const [queueLevel, setQueueLevel] = useState("");

  const clearForm = useCallback(() => {
    setArrivalTime("");
    setBurstTime("");
    setPriority("");
    setQueueLevel("");
    setEditingTask(null);
  }, [setEditingTask]);

  useEffect(() => {
    if (editingTask) {
      setArrivalTime(editingTask.arrivalTime);
      setBurstTime(editingTask.burstTime);
      setPriority(editingTask.priority ?? "");
      setQueueLevel(editingTask.queueLevel ?? "");
    } else {
      clearForm();
    }
  }, [editingTask, clearForm]);

  const handleAddOrUpdateTask = (e) => {
    e.preventDefault();
    if (arrivalTime === "" || burstTime === "") {
      alert("Please enter Arrival Time and Burst Time.");
      return;
    }
    if (algorithm === "PRIORITY" && priority === "") {
      alert("Priority is required for Priority Scheduling.");
      return;
    }
    if ((algorithm === "MLQ" || algorithm === "MLFQ") && queueLevel === "") {
      alert("Queue Level is required for this algorithm.");
      return;
    }

    const newTask = {
      id: editingTask
        ? editingTask.id
        : tasks.length > 0
        ? Math.max(...tasks.map((t) => t.id)) + 1
        : 1,
      arrivalTime: parseInt(arrivalTime, 10),
      burstTime: parseInt(burstTime, 10),
      priority: priority !== "" ? parseInt(priority, 10) : null,
      queueLevel: queueLevel !== "" ? parseInt(queueLevel, 10) : null,
    };

    if (editingTask) {
      setTasks(tasks.map((t) => (t.id === editingTask.id ? newTask : t)));
    } else {
      setTasks([...tasks, newTask]);
    }
    clearForm();
  };

  return (
    <div>
      <h2 className="card-title">
        {editingTask ? "Edit Task" : "Add New Task"}
      </h2>
      <form
        onSubmit={handleAddOrUpdateTask}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <input
          type="number"
          placeholder="Arrival Time"
          value={arrivalTime}
          onChange={(e) => setArrivalTime(e.target.value)}
          className="form-input"
          min="0"
        />
        <input
          type="number"
          placeholder="Burst Time"
          value={burstTime}
          onChange={(e) => setBurstTime(e.target.value)}
          className="form-input"
          min="1"
        />
        {algorithm === "PRIORITY" && (
          <input
            type="number"
            placeholder="Priority (lower is higher)"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="form-input"
            min="0"
          />
        )}
        {(algorithm === "MLQ" || algorithm === "MLFQ") && (
          <input
            type="number"
            placeholder="Queue Level (0 is highest)"
            value={queueLevel}
            onChange={(e) => setQueueLevel(e.target.value)}
            className="form-input"
            min="0"
          />
        )}
        <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ flexGrow: 1 }}
          >
            {editingTask ? <Edit3 size={18} /> : <Plus size={18} />}
            {editingTask ? "Update Task" : "Add Task"}
          </button>
          {editingTask && (
            <button
              type="button"
              onClick={clearForm}
              className="btn btn-secondary"
              aria-label="Cancel edit"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
export default TaskInputForm;
