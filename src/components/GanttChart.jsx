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
    "#7c3aed", // Level 0 - Violet
    "#059669", // Level 1 - Emerald
    "#ea580c", // Level 2 - Orange
    "#e11d48", // Level 3 - Rose
    "#2563eb", // Level 4 - Blue
    "#7c2d12", // Level 5 - Brown
    "#0891b2", // Level 6 - Cyan
  ];

  // Fallback color mapping per task ID
  const fallbackColors = {};
  const fallbackBase = [
    "#7c3aed",
    "#059669",
    "#ea580c",
    "#e11d48",
    "#2563eb",
    "#7c2d12",
    "#0891b2",
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
                title={`P${id}: ${s} - ${e}${
                  task.queueLevel !== undefined ? ` | Q${task.queueLevel}` : ""
                }`}
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
