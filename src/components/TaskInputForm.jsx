import React, { useState } from "react";

function TaskInputForm({ tasks, setTasks, algorithm }) {
  const [arrivalTime, setArrivalTime] = useState("");
  const [burstTime, setBurstTime] = useState("");
  const [priority, setPriority] = useState("");
  const [queueLevel, setQueueLevel] = useState("");

  const handleAddTask = () => {
    if (arrivalTime === "" || burstTime === "") {
      alert("Please enter Arrival Time and Burst Time.");
      return;
    }

    if (algorithm === "PRIORITY" && priority === "") {
      alert("Priority is required for Priority Scheduling.");
      return;
    }

    const newTask = {
      id: tasks.length + 1,
      arrivalTime: parseInt(arrivalTime),
      burstTime: parseInt(burstTime),
      priority: priority !== "" ? parseInt(priority) : null,
      queueLevel: queueLevel !== "" ? parseInt(queueLevel) : 0,
    };

    setTasks([...tasks, newTask]);
    setArrivalTime("");
    setBurstTime("");
    setPriority("");
  };

  return (
    <div>
      <h2 className="text-xl font-semibold my-2">Add New Task</h2>
      <input
        type="number"
        placeholder="Arrival Time"
        value={arrivalTime}
        onChange={(e) => setArrivalTime(e.target.value)}
        className="border p-2 m-1"
      />
      <input
        type="number"
        placeholder="Burst Time"
        value={burstTime}
        onChange={(e) => setBurstTime(e.target.value)}
        className="border p-2 m-1"
      />
      {algorithm === "PRIORITY" && (
        <input
          type="number"
          placeholder="Priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border p-2 m-1"
        />
      )}
      {algorithm === "MLQ" && (
        <input
          type="number"
          placeholder="Queue Level (0 = High)"
          value={queueLevel}
          onChange={(e) => setQueueLevel(e.target.value)}
          className="border p-2 m-1"
        />
      )}

      <button
        onClick={handleAddTask}
        className="bg-blue-500 text-white p-2 m-1 rounded"
      >
        Add Task
      </button>
    </div>
  );
}

export default TaskInputForm;
