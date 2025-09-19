// FCFS
// fcfs(tasks) takes an array of tasks and returns a new array with computed scheduling info
export function fcfs(tasks) {
  // Sort tasks by arrival time
  const sortedTasks = [...tasks].sort((a, b) => a.arrivalTime - b.arrivalTime);

  let currentTime = 0;
  return sortedTasks.map((task) => {
    // Start time is max of current time or arrival time
    const startTime = Math.max(currentTime, task.arrivalTime);
    const completionTime = startTime + task.burstTime;
    const turnaroundTime = completionTime - task.arrivalTime;
    const waitingTime = turnaroundTime - task.burstTime;
    const responseTime = startTime - task.arrivalTime;

    currentTime = completionTime;

    return {
      ...task,
      startTime,
      endTime: completionTime,
      completionTime,
      turnaroundTime,
      waitingTime,
      responseTime,
    };
  });
}

// SJF
// Non-preemptive Shortest Job First (SJF)
export function sjf(tasks) {
  // Copy and sort by arrival time initially
  const tasksCopy = [...tasks].sort((a, b) => a.arrivalTime - b.arrivalTime);
  const n = tasksCopy.length;

  let completed = 0;
  let currentTime = 0;
  const result = [];
  const isCompleted = new Array(n).fill(false);

  while (completed < n) {
    // Find task with shortest burst time among arrived and not completed
    let idx = -1;
    let minBurst = Infinity;
    for (let i = 0; i < n; i++) {
      if (
        tasksCopy[i].arrivalTime <= currentTime &&
        !isCompleted[i] &&
        tasksCopy[i].burstTime < minBurst
      ) {
        minBurst = tasksCopy[i].burstTime;
        idx = i;
      }
    }

    if (idx === -1) {
      // No task has arrived yet, jump to next arrival time
      currentTime = tasksCopy.find((t, i) => !isCompleted[i]).arrivalTime;
      continue;
    }

    const task = tasksCopy[idx];
    const startTime = currentTime;
    const completionTime = startTime + task.burstTime;
    const turnaroundTime = completionTime - task.arrivalTime;
    const waitingTime = turnaroundTime - task.burstTime;
    const responseTime = startTime - task.arrivalTime;

    currentTime = completionTime;
    isCompleted[idx] = true;
    completed++;

    result.push({
      ...task,
      startTime,
      endTime: completionTime,
      completionTime,
      turnaroundTime,
      waitingTime,
      responseTime,
    });
  }

  // Return result sorted by original process ID to keep consistent order in UI
  return result.sort((a, b) => a.id - b.id);
}

// ROUND ROBIN
// Round Robin Scheduling (RRS)
export function rrs(tasks, quantum) {
  if (!tasks.length || !quantum || quantum <= 0) return [];

  const remaining = [...tasks]
    .sort((a, b) => a.arrivalTime - b.arrivalTime)
    .map((task) => ({
      ...task,
      remainingTime: task.burstTime,
    }));

  const result = [];
  const queue = [];
  let time = 0;
  let i = 0;

  // Enqueue initially arrived tasks
  while (i < remaining.length && remaining[i].arrivalTime <= time) {
    queue.push(remaining[i]);
    i++;
  }

  while (queue.length > 0) {
    const current = queue.shift();

    const execTime = Math.min(current.remainingTime, quantum);

    result.push({
      id: current.id,
      arrivalTime: current.arrivalTime,
      burstTime: current.burstTime,
      priority: current.priority ?? null,
      startTime: time,
      endTime: time + execTime,
    });

    time += execTime;
    current.remainingTime -= execTime;

    // Enqueue new arrivals during execution
    while (i < remaining.length && remaining[i].arrivalTime <= time) {
      queue.push(remaining[i]);
      i++;
    }

    // Re-queue the task if it's not done
    if (current.remainingTime > 0) {
      queue.push(current);
    }
  }

  return result;
}

// LJF
// Non-preemptive Longest Job First (LJF)
export function ljf(tasks) {
  const tasksCopy = [...tasks].sort((a, b) => a.arrivalTime - b.arrivalTime);
  const n = tasksCopy.length;

  let completed = 0;
  let currentTime = 0;
  const result = [];
  const isCompleted = new Array(n).fill(false);

  while (completed < n) {
    // Find task with longest burst time among arrived and not completed
    let idx = -1;
    let maxBurst = -1;
    for (let i = 0; i < n; i++) {
      if (
        tasksCopy[i].arrivalTime <= currentTime &&
        !isCompleted[i] &&
        tasksCopy[i].burstTime > maxBurst
      ) {
        maxBurst = tasksCopy[i].burstTime;
        idx = i;
      }
    }

    if (idx === -1) {
      // No task has arrived yet, jump to next arrival time
      currentTime = tasksCopy.find((t, i) => !isCompleted[i]).arrivalTime;
      continue;
    }

    const task = tasksCopy[idx];
    const startTime = currentTime;
    const completionTime = startTime + task.burstTime;
    const turnaroundTime = completionTime - task.arrivalTime;
    const waitingTime = turnaroundTime - task.burstTime;
    const responseTime = startTime - task.arrivalTime;

    currentTime = completionTime;
    isCompleted[idx] = true;
    completed++;

    result.push({
      ...task,
      startTime,
      endTime: completionTime,
      completionTime,
      turnaroundTime,
      waitingTime,
      responseTime,
    });
  }

  return result.sort((a, b) => a.id - b.id);
}

// PRIORITY SCHEDULING
// Non-preemptive Priority Scheduling
// Lower numeric value means higher priority (e.g., priority 1 > priority 3)
export function priorityScheduling(tasks) {
  const tasksCopy = [...tasks].sort((a, b) => a.arrivalTime - b.arrivalTime);
  const n = tasksCopy.length;

  let completed = 0;
  let currentTime = 0;
  const result = [];
  const isCompleted = new Array(n).fill(false);

  while (completed < n) {
    // Find the task with highest priority (lowest priority number) among arrived and not completed
    let idx = -1;
    let highestPriority = Infinity;
    for (let i = 0; i < n; i++) {
      if (
        tasksCopy[i].arrivalTime <= currentTime &&
        !isCompleted[i] &&
        tasksCopy[i].priority !== null &&
        tasksCopy[i].priority < highestPriority
      ) {
        highestPriority = tasksCopy[i].priority;
        idx = i;
      }
    }

    if (idx === -1) {
      // No task has arrived yet or no task with priority, jump to next arrival
      const nextTask = tasksCopy.find((t, i) => !isCompleted[i]);
      currentTime = nextTask ? nextTask.arrivalTime : currentTime;
      continue;
    }

    const task = tasksCopy[idx];
    const startTime = currentTime;
    const completionTime = startTime + task.burstTime;
    const turnaroundTime = completionTime - task.arrivalTime;
    const waitingTime = turnaroundTime - task.burstTime;
    const responseTime = startTime - task.arrivalTime;

    currentTime = completionTime;
    isCompleted[idx] = true;
    completed++;

    result.push({
      ...task,
      startTime,
      endTime: completionTime,
      completionTime,
      turnaroundTime,
      waitingTime,
      responseTime,
    });
  }

  // For tasks without priority, or if no priority tasks, include them at the end without scheduling?
  // (You could also assign a default priority to those tasks to avoid issues.)

  return result.sort((a, b) => a.id - b.id);
}

// LRTF
// Preemptive Longest Remaining Time First (LRTF)
export function lrtf(tasks) {
  if (tasks.length === 0) return [];

  const n = tasks.length;
  const remaining = tasks.map((task) => ({
    ...task,
    remainingTime: task.burstTime,
  }));

  const result = [];
  let time = 0;
  let completed = 0;

  let currentProcess = null;

  while (completed < n) {
    // Find process with longest remaining time that has arrived
    let idx = -1;
    let maxRemaining = -1;
    for (let i = 0; i < n; i++) {
      if (
        remaining[i].arrivalTime <= time &&
        remaining[i].remainingTime > 0 &&
        remaining[i].remainingTime > maxRemaining
      ) {
        maxRemaining = remaining[i].remainingTime;
        idx = i;
      }
    }

    if (idx === -1) {
      // No process available, idle CPU
      time++;
      continue;
    }

    if (currentProcess !== idx) {
      if (currentProcess !== null) {
        result[result.length - 1].endTime = time;
      }
      currentProcess = idx;
      result.push({
        id: remaining[idx].id,
        startTime: time,
        endTime: null, // to be filled later
      });
    }

    remaining[idx].remainingTime--;
    time++;

    if (remaining[idx].remainingTime === 0) {
      completed++;
      result[result.length - 1].endTime = time;
      currentProcess = null;
    }
  }

  return result;
}

// SRTF
// Preemptive Shortest Remaining Time First (SRTF)
export function srtf(tasks) {
  if (tasks.length === 0) return [];

  const n = tasks.length;
  const remaining = tasks.map((task) => ({
    ...task,
    remainingTime: task.burstTime,
  }));

  const result = [];
  let time = 0;
  let completed = 0;

  // Track if a process is currently running
  let currentProcess = null;

  while (completed < n) {
    // Find process with shortest remaining time that has arrived
    let idx = -1;
    let minRemaining = Infinity;
    for (let i = 0; i < n; i++) {
      if (
        remaining[i].arrivalTime <= time &&
        remaining[i].remainingTime > 0 &&
        remaining[i].remainingTime < minRemaining
      ) {
        minRemaining = remaining[i].remainingTime;
        idx = i;
      }
    }

    if (idx === -1) {
      // No process available, idle CPU
      time++;
      continue;
    }

    // If current process changes, close previous slice
    if (currentProcess !== idx) {
      if (currentProcess !== null) {
        result[result.length - 1].endTime = time;
      }
      currentProcess = idx;
      result.push({
        id: remaining[idx].id,
        startTime: time,
        endTime: null, // to be filled later
      });
    }

    // Execute current process for 1 unit of time
    remaining[idx].remainingTime--;
    time++;

    // If process finished, mark completion and close slice
    if (remaining[idx].remainingTime === 0) {
      completed++;
      result[result.length - 1].endTime = time;
      currentProcess = null;
    }
  }

  return result;
}

// MLQ : Multi Level Queue
export function multilevelQueue(tasks) {
  const q0 = tasks.filter((t) => t.queueLevel === 0);
  const q1 = tasks.filter((t) => t.queueLevel === 1);

  // Run Q0 tasks first (high priority queue)
  const q0Scheduled = rrs(q0, 2);

  // Compute the end time of the last task in Q0
  const q0EndTime = q0Scheduled.reduce((max, t) => Math.max(max, t.endTime), 0);

  // Shift Q1 tasks to start after Q0
  const shiftedQ1 = q1.map((task) => ({
    ...task,
    arrivalTime: Math.max(task.arrivalTime, q0EndTime),
  }));

  const q1Scheduled = fcfs(shiftedQ1);

  // Combine result: Q0 runs first, then Q1
  return [...q0Scheduled, ...q1Scheduled];
}

// MLFQ: Multilevel Feedback Queue
// MLFQ: Multilevel Feedback Queue
export function mlfq(tasks) {
  if (!tasks.length) return [];

  const quantum = [4, 8, Infinity]; // Q0: RR-4, Q1: RR-8, Q2: FCFS

  const readyQueue = tasks
    .map((task) => ({
      ...task,
      remainingTime: task.burstTime,
      currentQueue: 0,
    }))
    .sort((a, b) => a.arrivalTime - b.arrivalTime);

  const result = [];
  let time = 0;
  let taskIndex = 0;

  const queues = [[], [], []];

  const addNewlyArrivedTasks = () => {
    while (
      taskIndex < readyQueue.length &&
      readyQueue[taskIndex].arrivalTime <= time
    ) {
      queues[0].push(readyQueue[taskIndex]);
      taskIndex++;
    }
  };

  addNewlyArrivedTasks();

  while (queues[0].length > 0 || queues[1].length > 0 || queues[2].length > 0) {
    let currentTask = null;
    let currentQueueIndex = -1;

    for (let i = 0; i < 3; i++) {
      if (queues[i].length > 0) {
        currentTask = queues[i].shift();
        currentQueueIndex = i;
        break;
      }
    }

    if (!currentTask) {
      time++;
      addNewlyArrivedTasks();
      continue;
    }

    const execTime = Math.min(
      currentTask.remainingTime,
      quantum[currentQueueIndex]
    );

    result.push({
      id: currentTask.id,
      startTime: time,
      endTime: time + execTime,
    });

    currentTask.remainingTime -= execTime;
    time += execTime;

    addNewlyArrivedTasks();

    if (currentTask.remainingTime > 0) {
      const nextQueue = Math.min(2, currentQueueIndex + 1);
      queues[nextQueue].push(currentTask);
    }
  }
  // Final processing to add metrics
  const finalResult = tasks.map((originalTask) => {
    const taskIntervals = result.filter((r) => r.id === originalTask.id);
    if (taskIntervals.length === 0) return originalTask;

    const startTime = taskIntervals[0].startTime;
    const completionTime = taskIntervals[taskIntervals.length - 1].endTime;
    const turnaroundTime = completionTime - originalTask.arrivalTime;
    const waitingTime = turnaroundTime - originalTask.burstTime;
    const responseTime = startTime - originalTask.arrivalTime;

    return {
      ...originalTask,
      startTime,
      completionTime,
      turnaroundTime,
      waitingTime,
      responseTime,
    };
  });

  return finalResult.sort((a, b) => a.id - b.id);
}
