// src/App.js

import React, { useState, useEffect, useRef } from "react"; // <-- Import useRef
import "./App.css";
import AlgorithmSelector from "./components/AlgorithmSelector";
import TaskInputForm from "./components/TaskInputForm";
import LiveInputTable from "./components/LiveInputTable";
import GanttChart from "./components/GanttChart";
import MetricsSummary from "./components/MetricsSummary";
import ResultsTable from "./components/ResultsTable";
import LearnMore from "./components/LearnMore";
import {
  fcfs,
  sjf,
  rrs,
  ljf,
  priorityScheduling,
  lrtf,
  srtf,
  multilevelQueue,
  mlfq,
} from "./utils/schedulingAlgorithms";

function App() {
  const [algorithm, setAlgorithm] = useState("FCFS");
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [quantum, setQuantum] = useState(2);
  const [run, setRun] = useState(false);
  const [ganttTasks, setGanttTasks] = useState([]);
  const [processedTasks, setProcessedTasks] = useState([]);

  // --- Dynamic Height Logic ---
  const leftColumnRef = useRef(null); // Ref for the left column
  const taskQueueCardRef = useRef(null); // Ref for the task queue card
  const resultsRef = useRef(null); // <-- NEW: Ref for the results section

  useEffect(() => {
    // This function syncs the height of the task queue with the left column
    const syncHeights = () => {
      if (leftColumnRef.current && taskQueueCardRef.current) {
        const leftColumnHeight = leftColumnRef.current.offsetHeight;
        taskQueueCardRef.current.style.maxHeight = `${leftColumnHeight}px`;
        // Also make the card itself a flex container to manage its children's heights
        taskQueueCardRef.current.style.display = "flex";
        taskQueueCardRef.current.style.flexDirection = "column";
      }
    };

    syncHeights(); // Sync on initial render and when tasks change
    // Optional: Add a resize listener for responsive adjustments
    window.addEventListener("resize", syncHeights);
    return () => window.removeEventListener("resize", syncHeights);
  }, [tasks]); // Rerun this effect whenever the tasks list changes

  // --- Scroll to Results Logic ---
  // This effect runs when 'run' state changes
  useEffect(() => {
    if (run && resultsRef.current) {
      // If we just ran the scheduler and the results section exists
      resultsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [run]); // Dependency: only run this when 'run' changes

  // --- Scheduling Logic (unchanged) ---
  const calculateMetricsForPreemptive = (originalTasks, timeSlices) => {
    return originalTasks
      .map((task) => {
        const relevantSlices = timeSlices.filter(
          (slice) => slice.id === task.id
        );
        if (relevantSlices.length === 0) return task;
        const startTime = relevantSlices[0].startTime;
        const completionTime =
          relevantSlices[relevantSlices.length - 1].endTime;
        const turnaroundTime = completionTime - task.arrivalTime;
        const waitingTime = turnaroundTime - task.burstTime;
        const responseTime = startTime - task.arrivalTime;
        return {
          ...task,
          startTime,
          completionTime,
          turnaroundTime,
          waitingTime,
          responseTime,
        };
      })
      .sort((a, b) => a.id - b.id);
  };

  // Handler to check for "Coming Soon" algorithms
  const handleAlgorithmChange = (newAlgorithm) => {
    const comingSoonAlgos = ["PRIORITY", "MLQ", "MLFQ"];

    if (comingSoonAlgos.includes(newAlgorithm)) {
      alert(
        "Coming Soon! 🚀\n\nThis feature is under active development. We'll release it as soon as it's ready!"
      );
      // By not calling setAlgorithm, the selection in the dropdown will
      // automatically revert to the previous 'algorithm' state.
    } else {
      setAlgorithm(newAlgorithm);
    }
  };

  const runScheduling = () => {
    const tasksCopy = JSON.parse(JSON.stringify(tasks));
    let resultSlices = [];
    let finalTasks = [];
    const PREEMPTIVE_ALGORITHMS = ["RRS", "SRTF", "LRTF", "MLQ", "MLFQ"];
    switch (algorithm) {
      case "FCFS":
        resultSlices = fcfs(tasksCopy);
        break;
      case "SJF":
        resultSlices = sjf(tasksCopy);
        break;
      case "RRS":
        resultSlices = rrs(tasksCopy, quantum);
        break;
      case "LJF":
        resultSlices = ljf(tasksCopy);
        break;
      case "PRIORITY":
        resultSlices = priorityScheduling(tasksCopy);
        break;
      case "LRTF":
        resultSlices = lrtf(tasksCopy);
        break;
      case "SRTF":
        resultSlices = srtf(tasksCopy);
        break;
      case "MLQ":
        resultSlices = multilevelQueue(tasksCopy);
        break;
      case "MLFQ":
        resultSlices = mlfq(tasksCopy);
        break;
      default:
        resultSlices = tasksCopy;
    }
    if (PREEMPTIVE_ALGORITHMS.includes(algorithm)) {
      finalTasks = calculateMetricsForPreemptive(tasksCopy, resultSlices);
    } else {
      finalTasks = resultSlices;
    }
    setGanttTasks(resultSlices);
    setProcessedTasks(finalTasks);
    setRun(true);
  };

  useEffect(() => {
    setRun(false);
  }, [algorithm, tasks, quantum]);

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    if (editingTask && editingTask.id === id) setEditingTask(null);
  };

  const handleClearAll = () => {
    setTasks([]);
    setEditingTask(null);
    setGanttTasks([]);
    setProcessedTasks([]);
    setRun(false);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>OS Scheduling Visualizer</h1>
        <p>Visualize and compare CPU scheduling algorithms in real-time.</p>
      </header>

      <main className="main-grid">
        {/* Add the ref to the left column */}
        <div ref={leftColumnRef} className="grid-col-span-1 column-container">
          <div className="card">
            <AlgorithmSelector
              selected={algorithm}
              onChange={handleAlgorithmChange}
            />
            {algorithm === "RRS" && (
              <div style={{ marginTop: "1rem" }}>
                <label htmlFor="time-quantum" className="form-label">
                  Time Quantum:
                </label>
                <input
                  id="time-quantum"
                  type="number"
                  className="form-input"
                  min="1"
                  value={quantum}
                  onChange={(e) => setQuantum(Number(e.target.value))}
                />
              </div>
            )}
          </div>
          <div className="card">
            <TaskInputForm
              tasks={tasks}
              setTasks={setTasks}
              algorithm={algorithm}
              editingTask={editingTask}
              setEditingTask={setEditingTask}
            />
          </div>
          <LearnMore algorithm={algorithm} />
        </div>

        <div className="grid-col-span-2 column-container">
          {/* Add the ref to the task queue card */}
          <div ref={taskQueueCardRef} className="card">
            <LiveInputTable
              tasks={tasks}
              onEdit={setEditingTask}
              onDelete={handleDelete}
              onClearAll={handleClearAll}
            />
            {tasks.length > 0 && (
              <button
                className="btn btn-primary"
                style={{ marginTop: "1.5rem", flexShrink: 0 }}
                onClick={runScheduling}
              >
                Run Scheduling Algorithm
              </button>
            )}
          </div>
        </div>
      </main>

      {run && (
        <div ref={resultsRef} className="card" style={{ marginTop: "2rem" }}>
          <GanttChart tasks={ganttTasks} />
          <ResultsTable tasks={processedTasks} />
          <MetricsSummary tasks={processedTasks} algorithm={algorithm} />
        </div>
      )}
    </div>
  );
}
export default App;
