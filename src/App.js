import React, { useState } from "react";
import AlgorithmSelector from "./components/AlgorithmSelector";
import TaskInputForm from "./components/TaskInputForm";
import TaskTable from "./components/TaskTable";
import GanttChart from "./components/GanttChart";
import MetricsSummary from "./components/MetricsSummary";
import LiveInputTable from "./components/LiveInputTable";
import {
  fcfs,
  sjf,
  rrs,
  ljf,
  priorityScheduling,
  lrtf,
  srtf,
  multilevelQueue,
} from "./utils/schedulingAlgorithms";

function App() {
  const [algorithm, setAlgorithm] = useState("FCFS");
  const [tasks, setTasks] = useState([]);
  const [quantum, setQuantum] = useState(2);
  const [run, setRun] = useState(false);
  const [scheduledTasks, setScheduledTasks] = useState([]);

  const runScheduling = () => {
    let result = [];
    switch (algorithm) {
      case "FCFS":
        result = fcfs(tasks);
        break;
      case "SJF":
        result = sjf(tasks);
        break;
      case "RRS":
        result = rrs(tasks, quantum);
        break;
      case "LJF":
        result = ljf(tasks);
        break;
      case "PRIORITY":
        result = priorityScheduling(tasks);
        break;
      case "LRTF":
        result = lrtf(tasks);
        break;
      case "SRTF":
        result = srtf(tasks);
        break;
      case "MLQ":
        result = multilevelQueue(tasks);
        break;
      default:
        result = tasks;
    }
    setScheduledTasks(result);
    setRun(true);
  };

  // Optional: clear run flag if algorithm or tasks change so user knows to run again
  React.useEffect(() => {
    setRun(false);
  }, [algorithm, tasks, quantum]);

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1 style={{ fontSize: 28, fontWeight: "bold" }}>
        OS Scheduling Visualizer
      </h1>

      <AlgorithmSelector selected={algorithm} onChange={setAlgorithm} />

      {algorithm === "RRS" && (
        <div className="my-4">
          <label className="block mb-2 font-medium">Time Quantum:</label>
          <input
            type="number"
            className="border p-2 rounded"
            min="1"
            value={quantum}
            onChange={(e) => setQuantum(Number(e.target.value))}
          />
        </div>
      )}

      <TaskInputForm tasks={tasks} setTasks={setTasks} algorithm={algorithm} />

      <LiveInputTable tasks={tasks} />

      <button
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        onClick={runScheduling}
      >
        Run Scheduling
      </button>

      {run && (
        <>
          <TaskTable tasks={scheduledTasks} />
          <GanttChart tasks={scheduledTasks} algorithm={algorithm} />
          <MetricsSummary tasks={scheduledTasks} algorithm={algorithm} />
        </>
      )}
    </div>
  );
}

export default App;
