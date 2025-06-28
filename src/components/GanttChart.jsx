import React from "react";

function GanttChart({ tasks }) {
  if (!tasks || tasks.length === 0) {
    return <div>No scheduling data to display.</div>;
  }

  const startTime = Math.min(...tasks.map((t) => t.startTime));
  const endTime = Math.max(...tasks.map((t) => t.endTime));
  const totalDuration = endTime - startTime || 1;

  // Colors per queue level
  const queueColors = [
    "#4f46e5", // Level 0 - Indigo
    "#16a34a", // Level 1 - Green
    "#f59e0b", // Level 2 - Amber
    "#dc2626", // Level 3 - Red
    "#0ea5e9", // Level 4 - Sky
    "#db2777", // Level 5 - Pink
    "#14b8a6", // Level 6 - Teal
  ];

  // Fallback color mapping per task ID
  const fallbackColors = {};
  const fallbackBase = [
    "#4f46e5", "#16a34a", "#dc2626", "#db2777", "#f59e0b", "#0ea5e9", "#14b8a6"
  ];
  let colorIndex = 0;

  const getColor = (task) => {
    if (typeof task.queueLevel === "number") {
      return queueColors[task.queueLevel % queueColors.length];
    }

    if (!fallbackColors[task.id]) {
      fallbackColors[task.id] = fallbackBase[colorIndex % fallbackBase.length];
      colorIndex++;
    }

    return fallbackColors[task.id];
  };

  const timePoints = Array.from(
    new Set(tasks.flatMap(({ startTime, endTime }) => [startTime, endTime]))
  ).sort((a, b) => a - b);

  return (
    <div
      style={{
        marginTop: 30,
        fontFamily: "Arial, sans-serif",
        width: "100%",
      }}
    >
      <h2 className="text-lg font-bold mb-2">Gantt Chart</h2>

      <div
        style={{
          border: "1px solid #ccc",
          padding: "8px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* Gantt bars */}
        <div
          style={{
            position: "relative",
            height: 50,
            border: "1px solid #ccc",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {tasks.map((task, idx) => {
            const { id, startTime: s, endTime: e } = task;
            const left = ((s - startTime) / totalDuration) * 100;
            const width = ((e - s) / totalDuration) * 100;
            const color = getColor(task);

            return (
              <div
                key={idx}
                title={`P${id}: ${s} - ${e}${task.queueLevel !== undefined ? ` | Q${task.queueLevel}` : ""}`}
                style={{
                  position: "absolute",
                  left: `${left}%`,
                  width: `${width}%`,
                  height: "100%",
                  backgroundColor: color,
                  color: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "bold",
                  fontSize: 14,
                  borderRight: "1px solid white",
                  boxSizing: "border-box",
                }}
              >
                P{id}
              </div>
            );
          })}
        </div>

        {/* Time ticks */}
        <div
          style={{
            position: "relative",
            marginTop: 6,
            height: 20,
            fontSize: 12,
            fontFamily: "monospace",
            width: "100%",
          }}
        >
          {timePoints.map((time, idx) => {
            const left = ((time - startTime) / totalDuration) * 100;

            return (
              <div
                key={idx}
                style={{
                  position: "absolute",
                  left: `${left}%`,
                  transform: "translateX(-50%)",
                }}
              >
                {time}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default GanttChart;
