# 🧠 OS Scheduling Visualizer

An interactive and educational tool to visualize and understand core **Operating System CPU Scheduling Algorithms**. This project allows users to simulate different scheduling techniques and analyze their performance using **Gantt charts** and detailed metrics.

## 🌐 Live Demo

Try it out here:  
🔗 [OS Scheduling Visualizer Live Demo](https://os-process-scheduling-vizualizer.vercel.app/)

---

## 🚀 Features

- 🎯 Supports multiple scheduling algorithms:
  - First Come First Serve (FCFS)
  - Shortest Job First (SJF)
  - Priority Scheduling
  - Round Robin (RR)

- 🧾 Add custom processes with:
  - Arrival Time  
  - Burst Time  
  - Priority (if applicable)

- 📊 Detailed Output:
  - Gantt Chart visualization
  - Process Table with all computed values
  - Performance Metrics:
    - Average Turnaround Time  
    - Average Waiting Time  
    - Completion Time  

- ⚡ Real-time simulation updates

---

## 🖥️ Demo Preview

```
Example Input:
Process   AT   BT
P1        0    5
P2        1    3
P3        2    8

Output:
Gantt Chart:
| P1 | P2 | P3 |

Metrics:
Avg Waiting Time = 3.33
Avg Turnaround Time = 7.66
```


---

## 📌 Algorithms Implemented

### 1. FCFS (First Come First Serve)
- Executes processes in order of arrival
- Simple but may cause long waiting times

### 2. SJF (Shortest Job First)
- Selects process with smallest burst time
- Optimal for minimum average waiting time

### 3. Priority Scheduling
- Executes based on priority values
- Can be preemptive or non-preemptive

### 4. Round Robin (RR)
- Time-sharing algorithm
- Uses time quantum for fair CPU allocation

---

## 📊 Output Details

After simulation, the following are displayed:

- 🟩 **Gantt Chart** – Visual timeline of execution  
- 📋 **Process Table**:
  - Arrival Time (AT)
  - Burst Time (BT)
  - Completion Time (CT)
  - Turnaround Time (TAT)
  - Waiting Time (WT)

- 📈 **Performance Metrics**:
  - Average Turnaround Time  
  - Average Waiting Time  

---

## 🛠️ Tech Stack

- Frontend: HTML, CSS, JavaScript / React  
- Logic: JavaScript / Java / Python (depending on implementation)

---

## ⚙️ How to Run

```bash
# Clone the repository
git clone https://github.com/your-username/os-scheduling-visualizer.git

# Navigate to the project folder
cd os-scheduling-visualizer

# Run the project
# (Example for React)
npm install
npm start
```

## 📚 Learning Objectives

This project helps you:
- Understand CPU scheduling concepts visually
- Compare algorithm performance
- Learn how OS handles process execution

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create a new branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

This project is licensed under the MIT License.

---

## ⭐ Support

If you found this helpful, give it a ⭐ on GitHub!
